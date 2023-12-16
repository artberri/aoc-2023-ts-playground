import { sum } from "../utils";

export default (input: string): string => {
	return sum(input.replaceAll("\n", "").split(",").map(hash)).toString();
};

function hash(input: string): number {
	return input
		.split("")
		.map(getAscii)
		.reduce((acc, value) => {
			const result = ((acc + value) * 17) % 256;
			return result;
		}, 0);
}

function getAscii(input: string): number {
	return input.charCodeAt(0);
}
