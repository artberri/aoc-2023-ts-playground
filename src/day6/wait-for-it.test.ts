import { describe, expect, test, vi } from "vitest";

describe("Day 6: Wait For It", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input = `Time:      7  15   30
Distance:  9  40  200`;

		const answer = sut(input);
		expect(answer).toBe("288");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `Time:      7  15   30
Distance:  9  40  200`;

		const answer = sut(input);
		expect(answer).toBe("71503");
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
