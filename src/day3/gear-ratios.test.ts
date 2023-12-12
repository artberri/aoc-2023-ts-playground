import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 3: Gear Ratios", () => {
	test("Part 1", async () => {
		const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

		const answer = part1(input);
		expect(answer).toBe("4361");
	});

	test("Part 2", async () => {
		const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

		const answer = part2(input);
		expect(answer).toBe("467835");
	});
});
