import { Matrix, toMatrix } from "../utils";

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

export default (input: string): string => {
	const matrix = toMatrix(input);
	const tilted = tiltAll(matrix);
	return calculateLoad(tilted).toString();
};
