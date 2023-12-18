import { Coordinate, Direction, Matrix, lines, navigate } from "../utils";

type Instruction = {
	direction: Direction;
	number: number;
	color: string;
};

const toDirection: Record<string, Direction> = {
	U: "up",
	D: "down",
	R: "right",
	L: "left",
} as const;

export default (input: string): string => {
	const instructions = lines(input);
	const data: Instruction[] = instructions
		.map((instruction) => {
			const [_, direction, number, color] =
				instruction.match(/^(U|D|R|L)\s(\d+)\s\(\#(\w+)\)$/) ?? [];
			return {
				direction: toDirection[direction ?? ""],
				number: Number(number),
				color,
			};
		})
		.filter(
			(instruction): instruction is Instruction =>
				!!instruction.direction && !!instruction.number && !!instruction.color,
		);

	const points = getPath(data);
	const matrix = getMatrix(points);

	const simplified = simplifyMatrix(matrix);
	const innerTiles = simplified.map(countInnerTiles).reduce((a, b) => a + b, 0);

	return `${innerTiles + points.length}`;
};

function getPath(data: Instruction[]) {
	const startingPoint: Coordinate = [0, 0];
	const points: Coordinate[] = [startingPoint];

	for (const { direction, number } of data) {
		for (let i = 0; i < number; i++) {
			const lastPoint = points[points.length - 1] ?? startingPoint;
			const newPoint = navigate(lastPoint, direction);
			points.push(newPoint);
		}
	}

	points.pop();

	return points;
}

const getMatrix = (path: Coordinate[]): Matrix => {
	//keep track of farthest coordinates
	let top = 0;
	let bottom = 0;
	let left = 0;
	let right = 0;

	for (const [x, y] of path) {
		if (x < left) left = x;
		if (x > right) right = x;
		if (y > bottom) bottom = y;
		if (y < top) top = y;
	}

	const matrix: string[][] = [];

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			if (!matrix[y - top]) {
				matrix[y - top] = [];
			}

			const index = path.findIndex(([px, py]) => px === x && py === y);

			if (index !== -1) {
				// biome-ignore lint/style/noNonNullAssertion: created above
				matrix[y - top]![x - left] = getValue(path, index);
			} else {
				// biome-ignore lint/style/noNonNullAssertion: created above
				matrix[y - top]![x - left] = " ";
			}
		}
	}

	return matrix;
};

function getValue(
	path: Coordinate[],
	index: number,
): "-" | "|" | "7" | "J" | "L" | "F" {
	const prev = index === 0 ? path[path.length - 1] : path[index - 1];
	const current = path[index];
	const post = path[index + 1] ?? path[0];
	if (!post || !prev || !current) {
		throw new Error("Invalid path");
	}

	const [prevX, prevY] = prev;
	const [currentX, currentY] = current;
	const [postX, postY] = post;

	let direction: Direction | undefined = undefined;
	if (prevX === currentX) {
		direction = prevY > currentY ? "up" : "down";
	} else if (prevY === currentY) {
		direction = prevX > currentX ? "left" : "right";
	} else {
		throw new Error(`Invalid direction: ${prev} -> ${post}`);
	}

	if (direction === "up") {
		if (postX === currentX) {
			return "|";
		}
		return postX > currentX ? "F" : "7";
	}

	if (direction === "down") {
		if (postX === currentX) {
			return "|";
		}
		return postX > currentX ? "L" : "J";
	}

	if (direction === "right") {
		if (postY === currentY) {
			return "-";
		}
		return postY > currentY ? "7" : "J";
	}

	if (direction === "left") {
		if (postY === currentY) {
			return "-";
		}
		return postY > currentY ? "F" : "L";
	}

	throw new Error("Invalid direction");
}

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
