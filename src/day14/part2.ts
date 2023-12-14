import { isNotNil } from "ramda";
import { Matrix, rotate, toMatrix } from "../utils";

function tilt(matrix: Matrix): { matrix: Matrix; movements: number } {
	const tilted = matrix;
	let movements = 0;
	for (let i = 1; i < tilted.length; i++) {
		const row = tilted[i];
		if (!row) {
			break;
		}

		for (let j = 0; j < row.length; j++) {
			if (tilted[i]?.[j] === "O" && tilted[i - 1]?.[j] === ".") {
				// biome-ignore lint/style/noNonNullAssertion: above if
				tilted[i]![j] = ".";
				// biome-ignore lint/style/noNonNullAssertion: above if
				tilted[i - 1]![j] = "O";
				movements++;
			}
		}
	}

	return {
		matrix: tilted,
		movements,
	};
}

function tiltAll(matrix: Matrix): Matrix {
	let result = matrix;
	let movs = 0;
	do {
		const { matrix: tilted, movements } = tilt(result);
		result = tilted;
		movs = movements;
	} while (movs > 0);

	return result;
}

function calculateLoad(matrix: Matrix): number {
	let index = 0;
	const length = matrix.length;
	return matrix.reduce((acc, row) => {
		return acc + row.filter((cell) => cell === "O").length * (length - index++);
	}, 0);
}

function cycle(matrix: Matrix): Matrix {
	let result = matrix;
	for (let i = 0; i < 4; i++) {
		const tilted = tiltAll(result);
		const rotated = rotate(tilted);
		result = rotated;
	}

	return result;
}

const patterns: string[] = [];
const counts: number[] = [];
const cycles = 1000000000;
let loopLength: number | undefined = undefined;

function cycle1Billion(matrix: Matrix): Matrix {
	let result = matrix;
	for (let i = 0; i < 1000000000; i++) {
		if (isNotNil(loopLength) && cycles % loopLength === i % loopLength) {
			return result;
		}

		const r = cycle(result);
		const serializedOutput = JSON.stringify(r);

		const index = patterns.indexOf(serializedOutput);
		if (index > -1) {
			loopLength = patterns.length - index;
		}

		counts.push(calculateLoad(r));
		patterns.push(serializedOutput);
		result = r;
	}

	return result;
}

export default (input: string): string => {
	const matrix = toMatrix(input);
	const result = cycle1Billion(matrix);
	return calculateLoad(result).toString();
};
