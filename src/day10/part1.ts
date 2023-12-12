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
): { from: Coordinate; cell: Coordinate }[] => {
	const start = getStart(matrix);
	const getVal = getCoordinateValue(matrix);
	const startingPoints: { from: Coordinate; cell: Coordinate }[] = [];

	const north = [start[0], start[1] - 1] as const;
	const south = [start[0], start[1] + 1] as const;
	const east = [start[0] + 1, start[1]] as const;
	const west = [start[0] - 1, start[1]] as const;
	const northValue = getVal(north);
	const southValue = getVal(south);
	const eastValue = getVal(east);
	const westValue = getVal(west);

	if (northValue && northNavigables.includes(northValue)) {
		startingPoints.push({ from: start, cell: north });
	}
	if (southValue && southNavigables.includes(southValue)) {
		startingPoints.push({ from: start, cell: south });
	}
	if (eastValue && eastNavigables.includes(eastValue)) {
		startingPoints.push({ from: start, cell: east });
	}
	if (westValue && westNavigables.includes(westValue)) {
		startingPoints.push({ from: start, cell: west });
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

const farthestStepCount = (path: Coordinate[]) => {
	return Math.floor(path.length / 2);
};

export default (input: string): string => {
	const matrix = toMatrix(input);
	const startingPoints = getStartingPoints(matrix);
	for (const startingPoint of startingPoints) {
		const path = getPath(startingPoint, matrix);
		if (path) {
			return `${farthestStepCount(path)}`;
		}
	}

	throw new Error("No path found");
};
