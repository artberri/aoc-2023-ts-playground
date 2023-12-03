import { describe, expect, test, vi } from "vitest";

describe("Day 1: Trebuchet?!", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

		const answer = sut(input);
		expect(answer).toBe("142");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

		const answer = sut(input);
		expect(answer).toBe("281");
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
