import { lines, pipe, sum } from "../utils";

const calculateDiff = (series: number[]): number[] => {
	const diff = [];
	for (let i = 0; i < series.length - 1; i++) {
		diff.push((series[i + 1] ?? 0) - (series[i] ?? 0));
	}
	return diff;
};

const calculateNext = (series: number[]): number => {
	let diff: number[] = series;
	const results: number[][] = [];
	do {
		results.push(diff);
		diff = calculateDiff(diff);
	} while (!diff.every((d) => d === 0));

	let next = 0;
	while (results.length > 0) {
		const prev = results.pop()?.shift() ?? 0;
		next = prev - next;
	}

	return next;
};

export default (input: string): string => {
	const series = lines(input)
		.map((line) => line.split(" ").map((n) => parseInt(n, 10)))
		.map(calculateNext);

	return pipe(sum, String)(series);
};
