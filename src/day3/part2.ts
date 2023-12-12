import { eachMatrix, sum } from "../utils";

export default (input: string): string => {
	const schematics = input.split("\n").map((line) => line.split(""));
	const ratios: number[] = [];

	eachMatrix(schematics, (char, coords) => {
		if (isGear(char)) {
			const parts: number[] = [];

			eachSurrounding(schematics, coords, (adj, adjCoords) => {
				if (isDigit(adj)) {
					parts.push(extractPartNumber(schematics, adjCoords));
				}
			});

			if (parts.length === 2) {
				ratios.push((parts[0] as number) * (parts[1] as number));
			}
		}
	});

	return sum(ratios).toString();
};

const isDigit = (char: string) => /[0-9]/.test(char);
const isGear = (char: string) => char === "*";

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
