import { Coordinate, Matrix, toMatrix } from "../utils";

const getStart = (matrix: Matrix): Coordinate => {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < (matrix[0]?.length ?? 0); x++) {
			const cell = matrix[y]?.[x] ?? "";
			if (cell === "S") {
				return [x, y];
			}
		}
	}

	throw new Error("No start found");
};

const end: Coordinate = [-1, -1];

const getCoordinateValue =
	(matrix: Matrix) =>
	(coordinate: Coordinate): string | undefined => {
		const [x, y] = coordinate;
		return matrix[y]?.[x];
	};

const northNavigables = ["F", "7", "|"];
const southNavigables = ["J", "L", "|"];
const eastNavigables = ["7", "J", "-"];
const westNavigables = ["F", "L", "-"];

const getStartingPoints = (
	matrix: Matrix,
): {
	from: Coordinate;
	cell: Coordinate;
	direction: "north" | "south" | "east" | "west";
}[] => {
	const start = getStart(matrix);
	const getVal = getCoordinateValue(matrix);
	const startingPoints: {
		from: Coordinate;
		cell: Coordinate;
		direction: "north" | "south" | "east" | "west";
	}[] = [];

	const north = [start[0], start[1] - 1] as const;
	const south = [start[0], start[1] + 1] as const;
	const east = [start[0] + 1, start[1]] as const;
	const west = [start[0] - 1, start[1]] as const;
	const northValue = getVal(north);
	const southValue = getVal(south);
	const eastValue = getVal(east);
	const westValue = getVal(west);

	if (northValue && northNavigables.includes(northValue)) {
		startingPoints.push({ from: start, cell: north, direction: "north" });
	}
	if (southValue && southNavigables.includes(southValue)) {
		startingPoints.push({ from: start, cell: south, direction: "south" });
	}
	if (eastValue && eastNavigables.includes(eastValue)) {
		startingPoints.push({ from: start, cell: east, direction: "east" });
	}
	if (westValue && westNavigables.includes(westValue)) {
		startingPoints.push({ from: start, cell: west, direction: "west" });
	}

	return startingPoints;
};

const navigator =
	(matrix: Matrix) =>
	(cell: Coordinate, from?: Coordinate): Coordinate | undefined => {
		const [x, y] = cell;
		const isFrom = (c: Coordinate) => from?.[0] === c[0] && from?.[1] === c[1];
		const cellValue = matrix[y]?.[x];
		if (!cellValue) {
			return undefined;
		}

		switch (cellValue) {
			case "F":
				return isFrom([x + 1, y]) ? [x, y + 1] : [x + 1, y];
			case "-":
				return isFrom([x + 1, y]) ? [x - 1, y] : [x + 1, y];
			case "7":
				return isFrom([x, y + 1]) ? [x - 1, y] : [x, y + 1];
			case "|":
				return isFrom([x, y + 1]) ? [x, y - 1] : [x, y + 1];
			case "J":
				return isFrom([x - 1, y]) ? [x, y - 1] : [x - 1, y];
			case "L":
				return isFrom([x, y - 1]) ? [x + 1, y] : [x, y - 1];
			case "S":
				return end;
			default:
				throw undefined;
		}
	};

const isEnd = (cell: Coordinate) => cell[0] === end[0] && cell[1] === end[1];

const getPath = (
	startingPoint: {
		from: Coordinate;
		cell: Coordinate;
	},
	matrix: Matrix,
) => {
	const navigate = navigator(matrix);
	const path: Coordinate[] = [startingPoint.from, startingPoint.cell];
	let from = startingPoint.cell;
	let next = navigate(startingPoint.cell, startingPoint.from);
	let current = next;
	while (next && !isEnd(next)) {
		path.push(next);
		current = next;
		next = navigate(current, from);
		from = current;
	}
	if (next) {
		return path;
	}

	return undefined;
};

const isPath = (path: Coordinate[]) => (cell: Coordinate) => {
	return path.some((c) => c[0] === cell[0] && c[1] === cell[1]);
};

const getStartValue = (
	path: Coordinate[],
	direction: "north" | "south" | "east" | "west",
) => {
	const end = path[path.length - 1];
	const prev = path[path.length - 2];
	if (!end || !prev) {
		throw new Error("Invalid path");
	}

	const [endX, endY] = end;
	const [prevX, prevY] = prev;

	if (direction === "north") {
		if (endX === prevX) {
			return "|";
		}
		return endX > prevX ? "J" : "L";
	}

	if (direction === "south") {
		if (endX === prevX) {
			return "|";
		}
		return endX > prevX ? "7" : "F";
	}

	if (direction === "east") {
		if (endY === prevY) {
			return "-";
		}
		return endY > prevY ? "L" : "F";
	}

	if (direction === "west") {
		if (endY === prevY) {
			return "-";
		}
		return endY > prevY ? "J" : "7";
	}

	throw new Error("Invalid direction");
};

const normalizeMatrix = (
	matrix: Matrix,
	path: Coordinate[],
	direction: "north" | "south" | "east" | "west",
): Matrix => {
	const isPathCell = isPath(path);
	const startValue = getStartValue(path, direction);
	return matrix.map((row, y) =>
		row.map((cell, x) => {
			if (cell === "S") {
				return startValue;
			}

			return isPathCell([x, y]) ? cell : " ";
		}),
	);
};

const simplifyMatrix = (matrix: Matrix): Matrix => {
	return matrix
		.map((row) => {
			return row
				.join("")
				.trim() // Remove outside tiles
				.replaceAll("-", "") // make walls shorter
				.replaceAll("FJ", "|") // same direction is a wall
				.replaceAll("L7", "|") // same direction is a wall
				.replaceAll("F7", "") // different direction is not wall
				.replaceAll("LJ", "") // different direction is not wall
				.split("");
		})
		.filter((row) => row.includes(" ")); // Remove rows without empty tiles
};

const countInnerTiles = (row: string[]): number => {
	let count = 0;
	let walls = 0;
	for (let i = 0; i < row.length; i++) {
		const cell = row[i];
		if (cell === "|") {
			walls++;
		}
		if (cell === " " && walls % 2 === 1) {
			count++;
		}
	}

	return count;
};

export default (input: string): string => {
	const matrix = toMatrix(input);
	const startingPoints = getStartingPoints(matrix);
	for (const startingPoint of startingPoints) {
		const path = getPath(startingPoint, matrix);
		if (path) {
			const normalized = normalizeMatrix(matrix, path, startingPoint.direction);
			const simplified = simplifyMatrix(normalized);
			const innerTiles = simplified
				.map(countInnerTiles)
				.reduce((a, b) => a + b, 0);

			return `${innerTiles}`;
		}
	}

	throw new Error("No path found");
};
