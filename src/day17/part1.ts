import { Matrix, isNotNil, mapMatrix, toMatrix } from "../utils";

export default (input: string): string => {
	const matrix = toMatrix(input.trim());
	const grid = mapMatrix(matrix, (item) => Number.parseInt(item, 10));
	const minimalHeatLoss = getMinimalHeatLoss(grid);
	return minimalHeatLoss.toString();
};

type Queued = [
	heatLoss: number,
	row: number,
	column: number,
	deltaRow: number,
	deltaColumn: number,
	steps: number,
];

function getMinimalHeatLoss(grid: Matrix<number>) {
	const queue: Queued[] = [[0, 0, 0, 0, 0, 0]];

	const seen = new Set<string>();

	while (queue.length) {
		const [hl, r, c, dr, dc, n] = queue
			.sort(([prevCost], [nextCost]) => nextCost - prevCost)
			.pop() ?? [0, 0, 0, 0, 0, 0];

		if (
			r === grid.length - 1 &&
			isNotNil(grid[0]?.length) &&
			c === grid[0].length - 1
		) {
			return hl;
		}

		const key = JSON.stringify([r, c, dr, dc, n]);

		if (seen.has(key)) continue;

		seen.add(key);

		if (n < 3 && ![dr, dc].every((coord) => coord === 0)) {
			const nr = r + dr;
			const nc = c + dc;

			if (
				0 <= nr &&
				nr < grid.length &&
				0 <= nc &&
				nc < (grid[0]?.length ?? 0)
			) {
				queue.push([hl + (grid[nr]?.[nc] ?? 0), nr, nc, dr, dc, n + 1]);
			}
		}

		for (const [ndr, ndc] of [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		] as const) {
			if (
				JSON.stringify([ndr, ndc]) !== JSON.stringify([dr, dc]) &&
				JSON.stringify([ndr, ndc]) !== JSON.stringify([-dr, -dc])
			) {
				const nr = r + ndr;
				const nc = c + ndc;

				if (
					0 <= nr &&
					nr < grid.length &&
					0 <= nc &&
					nc < (grid[0]?.length ?? 0)
				) {
					queue.push([hl + (grid[nr]?.[nc] ?? 0), nr, nc, ndr, ndc, 1]);
				}
			}
		}
	}

	return 0;
}
