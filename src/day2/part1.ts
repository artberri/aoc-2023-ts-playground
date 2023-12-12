export default (input: string): string => {
	const games = input.split("\n").map(parseGame);

	return games
		.filter((game) => game.sets.every(isPossible))
		.reduce((acc, cur) => acc + cur.id, 0)
		.toString();
};

const gameRegex = /Game (\d+): (.*)/;
const cubeRegex = /(\d+) (.*)/;

const parseGame = (input: string) => {
	const match = input.match(gameRegex);

	return {
		id: Number.parseInt(match?.[1] ?? "0", 10),
		sets: (match?.[2] ?? "").split("; ").map(parseSet),
	};
};

type Bag = Record<string, number>;

const parseSet = (set: string): Bag => {
	return set
		.split(", ")
		.map(parseCube)
		.reduce((acc, cur) => {
			acc[cur.color] = cur.number;
			return acc;
		}, {} as Bag);
};

const parseCube = (cube: string) => {
	const match = cube.match(cubeRegex);
	return {
		number: Number.parseInt(match?.[1] ?? "0", 10),
		color: match?.[2] ?? "",
	};
};

const bag: Bag = {
	red: 12,
	green: 13,
	blue: 14,
};

const isPossible = (set: Bag): boolean => {
	return Object.entries(set).every(([color, number]) => {
		return (bag[color] ?? 0) >= number;
	});
};
