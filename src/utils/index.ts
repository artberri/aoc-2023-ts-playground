import crypto from "crypto";
import { join, map, pipe, reverse, split, trim } from "ramda";

export { clone, filter, map, min, pipe, reverse, sum, without } from "ramda";

export type Matrix<T = string> = readonly T[][];

export type Coordinate = readonly [number, number];

type GrowToSize<T, N extends number, A extends T[]> = A["length"] extends N
	? A
	: GrowToSize<T, N, [...A, T]>;

export type FixedArray<T, N extends number> = GrowToSize<T, N, []>;

type Enumerate<
	N extends number,
	Acc extends number[] = [],
> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

export type Range<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

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

export const matrixToLines = (matrix: Matrix): string[] => matrix.map(join(""));

export const toMatrixes = (s: string): Matrix[] =>
	paragraphs(s).map((p) => p.map((l) => l.split("")));

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

export const rotate = <T>(matrix: Matrix<T>): Matrix<T> => {
	const M = matrix.length;
	const N = matrix[0]?.length ?? 0;

	const destination = new Array<T[]>(N);
	for (let i = 0; i < N; i++) {
		destination[i] = new Array<T>(M);
	}

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < M; j++) {
			const value = matrix[M - j - 1]?.[i];
			if (!value) {
				throw new Error(
					`Could not find value for ${i}, ${j} in ${JSON.stringify(matrix)}`,
				);
			}
			// biome-ignore lint/style/noNonNullAssertion: will exist
			destination[i]![j] = value;
		}
	}

	return destination;
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

export const hash = (str: string) =>
	crypto.createHash("md5").update(str).digest("hex");

export type Direction = "up" | "down" | "right" | "left";

export type Navigation = {
	point: Coordinate;
	direction: Direction;
};

export function readCell(
	matrix: Matrix,
	[x, y]: Coordinate,
): string | undefined {
	return matrix[y]?.[x];
}

export function navigate(point: Coordinate, direction: Direction): Coordinate {
	const [x, y] = point;

	const next = {
		up: [x, y - 1],
		down: [x, y + 1],
		left: [x - 1, y],
		right: [x + 1, y],
	} as const;

	return next[direction];
}

export const mapMatrix = <T, K>(
	matrix: Matrix<T>,
	eachFn: (item: T, pos?: [number, number], matrix?: Matrix<T>) => K,
): Matrix<K> => {
	const mapped: K[][] = [];
	for (let y = 0; y < matrix.length; y++) {
		const length = matrix[y]?.length ?? 0;
		for (let x = 0; x < length; x++) {
			const value = matrix[y]?.[x];
			if (value !== undefined) {
				mapped[y] ??= [];
				// biome-ignore lint/style/noNonNullAssertion: see line above
				mapped[y]![x] = eachFn(value, [x, y], matrix);
			}
		}
	}

	return mapped;
};
