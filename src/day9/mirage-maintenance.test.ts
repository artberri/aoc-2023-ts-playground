import { describe, expect, test, vi } from "vitest";

describe("Day 9: Mirage Maintenance", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

		const answer = sut(input);
		expect(answer).toBe("114");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

		const answer = sut(input);
		expect(answer).toBe("2");
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
