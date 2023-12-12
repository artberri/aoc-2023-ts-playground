import { lines, sum } from "../utils";

type Data = {
	springs: string;
	groups: number[];
};

const operational = "." as const;
const damaged = "#" as const;
const unk = "?" as const;

export type Cache = Map<string, number>;

export const cache: Cache = new Map();

const arrangements = ({ springs, groups }: Data): number => {
	if (!springs.length) {
		return groups.length ? 0 : 1;
	}

	if (!groups.length) {
		return springs.includes(damaged) ? 0 : 1;
	}

	const key = JSON.stringify([springs, groups]);

	if (cache.has(key)) {
		return cache.get(key) ?? 0;
	}

	let result = 0;

	const spring = springs[0];

	if (spring === operational || spring === unk) {
		result += arrangements({ springs: springs.slice(1), groups });
	}

	const group = groups[0] ?? 0;

	if (spring === damaged || spring === unk) {
		if (
			group <= springs.length &&
			!springs.slice(0, group).includes(".") &&
			(group === springs.length || springs[group] !== "#")
		) {
			result += arrangements({
				springs: springs.slice(group + 1),
				groups: groups.slice(1),
			});
		}
	}

	cache.set(key, result);

	return result;
};

const getData = (input: string): Data[] => {
	const inputs = lines(input);
	return inputs.map((line) => {
		const [springs, groups] = line.split(" ");
		return {
			springs: springs ?? "",
			groups: (groups ?? "").split(",").map(Number),
		};
	});
};

export default (input: string): string => {
	const data = getData(input);
	return sum(data.map(arrangements)).toString();
};
