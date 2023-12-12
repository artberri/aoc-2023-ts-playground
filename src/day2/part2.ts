export default (input: string): string => {
	const games = input.split("\n").map(parseGame);

	return games
		.map(setPower)
		.reduce((acc, cur) => acc + cur, 0)
		.toString();
};

const gameRegex = /Game (\d+): (.*)/;
const cubeRegex = /(\d+) (.*)/;

const parseGame = (input: string) => {
	const match = input.match(gameRegex);

	return (match?.[2] ?? "").split("; ").map(parseSet);
};

type Set = Record<string, number>;

const parseSet = (set: string): Set => {
	return set
		.split(", ")
		.map(parseCube)
		.reduce((acc, cur) => {
			acc[cur.color] = cur.number;
			return acc;
		}, {} as Set);
};

const parseCube = (cube: string) => {
	const match = cube.match(cubeRegex);
	return {
		number: Number.parseInt(match?.[1] ?? "0", 10),
		color: match?.[2] ?? "",
	};
};

const setPower = (sets: Set[]): number => {
	const minimum = sets.reduce((acc, set) => {
		for (const [color, number] of Object.entries(set)) {
			acc[color] = Math.max(acc[color] ?? 0, number);
		}

		return acc;
	}, {} as Set);

	return Object.values(minimum).reduce((acc, cur) => acc * cur, 1);
};
