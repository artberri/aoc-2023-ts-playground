import { isNotNil, lcm, paragraphs } from "../utils";

enum Direction {
	Left = "L",
	Right = "R",
}

type Map = {
	value: string;
	left: string;
	right: string;
};

const next = (direction: Direction, value: string, maps: Map[]): string => {
	const map = maps.find((map) => map.value === value);
	if (!map) {
		return value;
	}

	switch (direction) {
		case Direction.Left:
			return map.left;
		case Direction.Right:
			return map.right;
		default:
			return value;
	}
};

const calculateTimes = (
	value: string,
	directions: Direction[],
	maps: Map[],
): number => {
	let times = 0;
	let currentValue = value;

	while (!currentValue.endsWith("Z")) {
		const direction = directions.shift();
		if (!direction) {
			break;
		}

		currentValue = next(direction, currentValue, maps);
		directions.push(direction);

		times++;
	}

	return times;
};

export default (input: string): string => {
	const inputs = paragraphs(input);

	const directions = (inputs[0]?.[0] ?? "")
		.split("")
		.map((direction) => {
			switch (direction) {
				case Direction.Left:
					return Direction.Left;
				case Direction.Right:
					return Direction.Right;
				default:
					return undefined;
			}
		})
		.filter(isNotNil);

	const maps: Map[] = (inputs[1] ?? []).map((map) => {
		const [_, value, left, right] =
			map.match(/^(\w+)\s\=\s\((\w+)\,\s(\w+)\)$/) ?? [];
		return {
			value: value ?? "",
			left: left ?? "",
			right: right ?? "",
		};
	});

	const times = maps
		.map((map) => map.value)
		.filter((value) => value.endsWith("A"))
		.map((value) => calculateTimes(value, directions, maps));

	return lcm(...times).toString();
};
