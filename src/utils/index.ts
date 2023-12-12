import { map, pipe, reverse, split, trim } from "ramda";

export { clone, filter, map, min, pipe, reverse, sum, without } from "ramda";

export type Matrix<T = string> = readonly T[][];

export type Coordinate = readonly [number, number];

export const lines = pipe(split("\n"), map(trim));

export const toMatrix: (s: string) => Matrix = pipe(lines, map(split("")));

const toParagraphs = (lines: string[]): string[][] => {
	const paragraphs: string[][] = [];
	let currentParagraph: string[] = [];
	for (const line of lines) {
		if (line === "") {
			paragraphs.push(currentParagraph);
			currentParagraph = [];
		} else {
			currentParagraph.push(line);
		}
	}

	if (currentParagraph.length > 0) {
		paragraphs.push(currentParagraph);
	}

	return paragraphs;
};
export const paragraphs = pipe(lines, toParagraphs);

export const reverseString = (s: string) => reverse(s);

export const mergeMaps = <K, V>(maps: Map<K, V>[]): Map<K, V> =>
	new Map(maps.flatMap((map) => [...map]));

export const minimum = (n: number[]) => Math.min(...n);

export const isNotNil = <T>(value: T | undefined | null): value is T => {
	return value !== undefined && value !== null;
};

export const multiply = (numbers: number[]): number =>
	numbers.reduce((a, b) => a * b, 1);

export const lcm = (...arr: number[]) => {
	const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
	const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
	return [...arr].reduce((a, b) => _lcm(a, b));
};

export const transpose = <T>(a: Matrix<T>): Matrix<T> => {
	return Object.keys(a[0] ?? ([] satisfies T[])).map((c) =>
		a.map((r) => {
			const value = r[parseInt(c, 10)];
			if (value === undefined) {
				throw new Error(
					`Could not find value for ${c} in ${JSON.stringify(a)}`,
				);
			}
			return value;
		}),
	);
};

export const eachMatrix = <T>(
	matrix: Matrix<T>,
	eachFn: (item: T, pos: [number, number], matrix: Matrix<T>) => void,
) => {
	for (let y = 0; y < matrix.length; y++) {
		const length = matrix[y]?.length ?? 0;
		for (let x = 0; x < length; x++) {
			const value = matrix[y]?.[x];
			if (value) {
				eachFn(value, [x, y], matrix);
			}
		}
	}
};
