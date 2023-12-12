import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 1: Trebuchet?!", () => {
	test("Part 1", async () => {
		const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

		const answer = part1(input);
		expect(answer).toBe("142");
	});

	test("Part 2", async () => {
		const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

		const answer = part2(input);
		expect(answer).toBe("281");
	});
});
