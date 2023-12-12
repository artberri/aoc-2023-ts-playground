import { lines, multiply } from "../utils";

type Race = {
	time: number;
	distance: number;
};

const calculateDistance = (pressTime: number, runTime: number): number => {
	return pressTime * runTime;
};

const betterTimesRange = (race: Race): [number, number] => {
	const { time, distance } = race;
	const middle = Math.floor(time / 2);

	let minRange = 0;
	for (let i = middle; i >= 0; i--) {
		const pressTime = i;
		const runTime = time - i;
		const current = calculateDistance(pressTime, runTime);
		if (current > distance) {
			minRange = i;
		} else {
			break;
		}
	}

	let maxRange = Number.MAX_SAFE_INTEGER;
	for (let i = middle + 1; i <= time; i++) {
		const pressTime = i;
		const runTime = time - i;
		const current = calculateDistance(pressTime, runTime);
		if (current > distance) {
			maxRange = i;
		} else {
			break;
		}
	}

	return [minRange, maxRange];
};

const getNumbersBetweenRange = (range: [number, number]): number => {
	const [min, max] = range;
	return max - min + 1;
};

export default (input: string): string => {
	const inputs = lines(input);
	const times: string[] = inputs[0]?.match(/(\d+)/g) ?? [];
	const distances: string[] = inputs[1]?.match(/(\d+)/g) ?? [];
	const races: Race[] = times.map((t, i) => ({
		time: parseInt(t, 10),
		distance: parseInt(distances[i] ?? "0", 10),
	}));
	const ranges = races
		.map((r) => betterTimesRange(r))
		.map(getNumbersBetweenRange);

	return multiply(ranges).toString();
};
