import { eachMatrix, sum } from "../utils";

export default (input: string): string => {
	const schematic = input.split("\n").map((line) => line.split(""));
	const parts: number[] = [];

	eachMatrix(schematic, (char, coords) => {
		if (isSymbol(char)) {
			eachSurrounding(schematic, coords, (adj, adjCoords) => {
				if (isDigit(adj)) {
					parts.push(extractPartNumber(schematic, adjCoords));
				}
			});
		}
	});

	return sum(parts).toString();
};

const isDigit = (char: string) => /[0-9]/.test(char);
const isSymbol = (char: string) => char !== "." && !isDigit(char);

const extractPartNumber = (
	schematics: string[][],
	[x, y]: [number, number],
) => {
	let number = "";
	let pos = x;

	while (isDigit(schematics[y]?.[pos] ?? "")) {
		pos -= 1;
	}

	// pos will end up one too small
	pos += 1;

	while (isDigit(schematics[y]?.[pos] ?? "")) {
		number += schematics[y]?.[pos] ?? "";
		(schematics[y] as string[])[pos] = "X"; // Prevent counting numbers twice
		pos += 1;
	}

	return Number(number);
};

const callAtCoords = <T>(
	matrix: T[][],
	coords: [number, number],
	callFn: (item: T, pos: [number, number], matrix: T[][]) => void,
) => {
	const [x, y] = coords;

	const value = matrix[y]?.[x];

	if (value) {
		callFn(value, coords, matrix);
	}
};

const eachSurrounding = <T>(
	matrix: T[][],
	[x, y]: [number, number],
	eachFn: (adj: T, adjCoords: [number, number]) => void,
) => {
	callAtCoords(matrix, [x, y - 1], eachFn);
	callAtCoords(matrix, [x + 1, y - 1], eachFn);
	callAtCoords(matrix, [x + 1, y], eachFn);
	callAtCoords(matrix, [x + 1, y + 1], eachFn);
	callAtCoords(matrix, [x, y + 1], eachFn);
	callAtCoords(matrix, [x - 1, y + 1], eachFn);
	callAtCoords(matrix, [x - 1, y], eachFn);
	callAtCoords(matrix, [x - 1, y - 1], eachFn);
};
