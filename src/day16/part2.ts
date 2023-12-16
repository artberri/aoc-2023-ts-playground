import { Coordinate, Matrix, toMatrix } from "../utils";

type Direction = "up" | "down" | "right" | "left";

type Beam = {
	point: Coordinate;
	direction: Direction;
};

export default (input: string): string => {
	const matrix = toMatrix(input);
	const results: number[] = [];

	for (const [y, row] of matrix.entries()) {
		results.push(
			calculateEnergized(matrix, { point: [0, y], direction: "right" }),
		);
		results.push(
			calculateEnergized(matrix, {
				point: [row.length - 1, y],
				direction: "left",
			}),
		);
	}

	for (const [x] of matrix[0]?.entries() ?? []) {
		results.push(
			calculateEnergized(matrix, { point: [x, 0], direction: "down" }),
		);
		results.push(
			calculateEnergized(matrix, {
				point: [x, matrix.length - 1],
				direction: "up",
			}),
		);
	}

	return Math.max(...results).toString();
};

function calculateEnergized(matrix: Matrix, startingBeam: Beam): number {
	const beams: Beam[] = [startingBeam];

	const energized = new Set<string>(); // x,y
	const energizedNodes = new Set<string>(); // x,y,direction

	while (beams.length) {
		const beam = beams[0];
		if (!beam) {
			break;
		}

		const [x, y] = beam.point;
		const content = readCell(matrix, beam.point);
		process(content, beam, beams, energizedNodes);
		if (content) {
			energized.add(`${x},${y}`);
		}
	}

	return energized.size;
}

function readCell(matrix: Matrix, [x, y]: Coordinate): string | undefined {
	return matrix[y]?.[x];
}

function process(
	content: string | undefined,
	beam: Beam,
	beams: Beam[],
	energizedNodes: Set<string>,
) {
	const removeCurrentBeam = () => beams.shift();

	if (!content) {
		removeCurrentBeam();
		return;
	}

	if (content === ".") {
		navigate(beam, beam.direction);
		return;
	}

	const dirChangeId = `${beam.point[0]},${beam.point[1]},${beam.direction}`;
	if (energizedNodes.has(dirChangeId)) {
		removeCurrentBeam();
		return;
	}
	energizedNodes.add(dirChangeId);

	if (content === "/") {
		navigate(
			beam,
			({ up: "right", down: "left", left: "down", right: "up" } as const)[
				beam.direction
			],
		);
		return;
	}

	if (content === "\\") {
		navigate(
			beam,
			({ up: "left", down: "right", left: "up", right: "down" } as const)[
				beam.direction
			],
		);
		return;
	}

	if (content === "-") {
		if (["right", "left"].includes(beam.direction)) {
			navigate(beam, beam.direction);
			return;
		}
		removeCurrentBeam();
		beams.push({
			direction: "left",
			point: [beam.point[0] - 1, beam.point[1]],
		});
		beams.push({
			direction: "right",
			point: [beam.point[0] + 1, beam.point[1]],
		});
		return;
	}

	if (content === "|") {
		if (["up", "down"].includes(beam.direction)) {
			navigate(beam, beam.direction);
			return;
		}
		beams.push({
			direction: "up",
			point: [beam.point[0], beam.point[1] - 1],
		});
		beams.push({
			direction: "down",
			point: [beam.point[0], beam.point[1] + 1],
		});
		removeCurrentBeam();
		return;
	}
}

function navigate(beam: Beam, direction: Direction) {
	const {
		point: [x, y],
	} = beam;

	const next = {
		up: [x, y - 1],
		down: [x, y + 1],
		left: [x - 1, y],
		right: [x + 1, y],
	} as const;

	beam.direction = direction;
	beam.point = next[direction];
}
