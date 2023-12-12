import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 9: Mirage Maintenance", () => {
	test("Part 1", async () => {
		const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

		const answer = part1(input);
		expect(answer).toBe("114");
	});

	test("Part 2", async () => {
		const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

		const answer = part2(input);
		expect(answer).toBe("2");
	});
});
