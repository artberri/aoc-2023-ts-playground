import {
	Coordinate,
	Matrix,
	eachMatrix,
	isNotNil,
	sum,
	toMatrix,
	transpose,
} from "../utils";

const galaxy = "#";
const empty = ".";

const getEmptyRows = (matrix: Matrix): number[] => {
	return matrix.reduce<number[]>((acc, row, index) => {
		if (row.every((seat) => seat === empty)) {
			acc.push(index);
		}
		return acc;
	}, []);
};

const getEmptyColumns = (matrix: Matrix): number[] => {
	return getEmptyRows(transpose(matrix));
};

const getGalaxies = (matrix: Matrix): Map<number, Coordinate> => {
	const galaxies = new Map<number, Coordinate>();
	let index = 0;
	eachMatrix(matrix, (cell, [x, y]) => {
		if (cell === galaxy) {
			galaxies.set(index, [x, y]);
			index++;
		}
	});

	return galaxies;
};

const getGalaxyPairs = (
	galaxies: Map<number, Coordinate>,
): [number, number][] => {
	const pairs: [number, number][] = [];
	const numbers = Array.from(galaxies.keys());

	for (let i = 0; i < numbers.length - 1; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			const n1 = numbers[i];
			const n2 = numbers[j];
			if (isNotNil(n1) && isNotNil(n2)) {
				pairs.push(n1 > n2 ? [n1, n2] : [n2, n1]);
			}
		}
	}

	return pairs;
};

const emptySpaceMultiplier = 1000000;
const emptySpaceModifier = (
	p1: number,
	p2: number,
	emptySpaces: number[],
): number => {
	const [min, max] = p1 < p2 ? [p1, p2] : [p2, p1];
	const emptySpacesBetween = emptySpaces.filter((e) => e > min && e < max);
	return (
		emptySpacesBetween.length * emptySpaceMultiplier - emptySpacesBetween.length
	);
};

const shortestDistance = (c1: Coordinate, c2: Coordinate): number => {
	const [x1, y1] = c1;
	const [x2, y2] = c2;

	const xDistance = Math.abs(x2 - x1);
	const yDistance = Math.abs(y2 - y1);

	return xDistance + yDistance;
};

const calculateDistance = (
	c1: Coordinate,
	c2: Coordinate,
	emptyRows: number[],
	emptyColumns: number[],
): number => {
	const distance = shortestDistance(c1, c2);
	const emptySpaceModifierValue =
		emptySpaceModifier(c1[1], c2[1], emptyRows) +
		emptySpaceModifier(c1[0], c2[0], emptyColumns);

	return distance + emptySpaceModifierValue;
};

export default (input: string): string => {
	const matrix = toMatrix(input);
	const emptyRows = getEmptyRows(matrix);
	const emptyColumns = getEmptyColumns(matrix);
	const galaxies = getGalaxies(matrix);
	const galaxyPairs = getGalaxyPairs(galaxies);

	const distances = galaxyPairs
		.map(([g1, g2]) => {
			const c1 = galaxies.get(g1);
			const c2 = galaxies.get(g2);

			if (isNotNil(c1) && isNotNil(c2)) {
				return calculateDistance(c1, c2, emptyRows, emptyColumns);
			}

			return undefined;
		})
		.filter(isNotNil);

	return `${sum(distances)}`;
};
