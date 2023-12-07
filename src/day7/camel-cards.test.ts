import { describe, expect, test, vi } from "vitest";

describe("Day 7: Camel Cards", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

		const answer = sut(input);
		expect(answer).toBe("6440");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

		const answer = sut(input);
		expect(answer).toBe("5905");
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
