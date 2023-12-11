import { describe, expect, test, vi } from "vitest";

describe("Day 11: Cosmic Expansion", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

		const answer = sut(input);
		expect(answer).toBe("374");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

		const answer = sut(input);
		expect(answer).toBe("82000210");
	});
});

let sut: (input: string) => string;

function loadPart1() {
	import("./part1").then(
		(solution: { default: (input: string) => string }) => {
			sut = solution.default;
		},
	);
}

function loadPart2() {
	import("./part2").then(
		(solution: { default: (input: string) => string }) => {
			sut = solution.default;
		},
	);
}
