import { Matrix, matrixToLines, sum, toMatrixes, transpose } from "../utils";

export default (input: string): string => {
	return sum(toMatrixes(input).map(summarize)).toString();
};

function summarize(pattern: Matrix): number {
	const hrl = calculateReflectionLine(pattern);
	if (hrl > 0) {
		return hrl * 100;
	}

	return calculateReflectionLine(transpose(pattern));
}

function calculateReflectionLine(pattern: Matrix): number {
	const lines = matrixToLines(pattern);
	for (let i = 1; i < lines.length; i++) {
		const first = lines.slice(0, i).reverse().join("");
		const second = lines.slice(i).join("");
		const minLength = Math.min(first.length, second.length);
		const firstSlice = first.slice(0, minLength);
		const secondSlice = second.slice(0, minLength);
		for (let j = 0; j < minLength; j++) {
			const fixedFirstSlice = fixSmudge(firstSlice, j);
			if (fixedFirstSlice === secondSlice) {
				return i;
			}
		}
	}

	return 0;
}

function fixSmudge(slice: string, smudge: number): string {
	const result = slice.split("");
	result[smudge] = result[smudge] === "." ? "#" : ".";
	return result.join("");
}
