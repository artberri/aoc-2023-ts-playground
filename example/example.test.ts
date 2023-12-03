import { describe, expect, test, vi } from "vitest";

describe("Day X: Test Name", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input = `test
input
part1`;

		const answer = sut(input);
		expect(answer).toBe("outputpart1");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `test
input
part2`;

		const answer = sut(input);
		expect(answer).toBe("outputpart2");
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
