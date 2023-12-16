import { FixedArray, Range, sum } from "../utils";

type Box = { label: string; length: number }[];

export default (input: string): string => {
	const boxes = Array.from({ length: 256 }, (_) => [] as Box) as FixedArray<
		Box,
		256
	>;
	const steps = input.replaceAll("\n", "").split(",");
	for (const step of steps) {
		if (step.includes("=")) {
			const [label, lengthS] = step.split("=");
			const length = parseInt(lengthS ?? "", 10);
			const box = hash(label ?? "");
			const index = boxes[box].findIndex((b) => b.label === label);
			if (index !== -1) {
				// biome-ignore lint/style/noNonNullAssertion: index will exist
				boxes[box][index]!.length = length;
				continue;
			}

			boxes[box].push({ label: label ?? "", length });
			continue;
		}

		const label = step.slice(0, step.indexOf("-"));
		const box = hash(label);
		const index = boxes[box].findIndex((b) => b.label === label);
		if (index >= 0) {
			boxes[box] = boxes[box].filter((_, i) => i !== index);
		}
	}

	return sum(boxes.map((box, index) => power(box, index + 1))).toString();
};

function power(box: Box, boxNumber: number): number {
	if (box.length === 0) {
		return 0;
	}

	return sum(box.map((lens, index) => lens.length * (index + 1) * boxNumber));
}

function hash(input: string): Range<0, 255> {
	return input
		.split("")
		.map(getAscii)
		.reduce((acc, value) => {
			const result = ((acc + value) * 17) % 256;
			return result;
		}, 0) as Range<0, 255>;
}

function getAscii(input: string): number {
	return input.charCodeAt(0);
}
