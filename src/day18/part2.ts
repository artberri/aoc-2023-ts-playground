import { Coordinate, Direction, lines, navigate } from "../utils";

type Instruction = {
	direction: Direction;
	number: number;
	color: string;
};

type InstructionFixed = {
	direction: Direction;
	number: number;
};

const toDirection: Record<string, Direction> = {
	U: "up",
	D: "down",
	R: "right",
	L: "left",
} as const;

export default (input: string): string => {
	const instructions = lines(input);
	const data: InstructionFixed[] = instructions
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
		)
		.map(fixInstruction);

	const { points, perimeter } = getPathAndPerimeter(data);

	return `${areaFromCoords(points) + perimeter / 2 + 1}`;
};

function getPathAndPerimeter(data: InstructionFixed[]) {
	const startingPoint: Coordinate = [0, 0];
	const points: Coordinate[] = [startingPoint];
	let perimeter = 0;

	for (const { direction, number } of data) {
		const lastPoint = points[points.length - 1] ?? startingPoint;
		const newPoint = navigate(lastPoint, direction, number);
		points.push(newPoint);
		perimeter += number;
	}

	points.pop();

	return { points, perimeter };
}

// https://stackoverflow.com/questions/24793288/calculating-the-area-of-an-irregular-polygon-using-javascript
function areaFromCoords(coordArray: Coordinate[]) {
	const x = coordArray.reduce<number[]>((acc, value) => {
		acc.push(value[0], value[1]);
		return acc;
	}, []);
	let a = 0;

	// Must have even number of elements
	if (x.length % 2) {
		throw new Error("coordArray must have an even number of elements");
	}

	// Process pairs, increment by 2 and stop at length - 2
	for (let i = 0, iLen = x.length - 2; i < iLen; i += 2) {
		a += (x[i] ?? 0) * (x[i + 3] ?? 0) - (x[i + 2] ?? 0) * (x[i + 1] ?? 0);
	}

	return Math.abs(a / 2);
}

function fixInstruction({ color }: Instruction): InstructionFixed {
	const number = color.substring(0, 5);
	const direction = color.substring(5);

	const toDirection: Record<string, Direction> = {
		0: "right",
		1: "down",
		2: "left",
		3: "up",
	} as const;

	const realDirection = toDirection[direction];
	if (!realDirection) {
		throw new Error(`Invalid direction: ${direction}`);
	}

	const fixed: InstructionFixed = {
		direction: realDirection,
		number: parseInt(number, 16),
	};

	return fixed;
}
