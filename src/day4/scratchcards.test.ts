import { describe, expect, test, vi } from "vitest";

describe("Day 4: Scratchcards", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

		const answer = sut(input);
		expect(answer).toBe("13");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

		const answer = sut(input);
		expect(answer).toBe("30");
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
