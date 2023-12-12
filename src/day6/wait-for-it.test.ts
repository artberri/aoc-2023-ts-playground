import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 6: Wait For It", () => {
	test("Part 1", async () => {
		const input = `Time:      7  15   30
Distance:  9  40  200`;

		const answer = part1(input);
		expect(answer).toBe("288");
	});

	test("Part 2", async () => {
		const input = `Time:      7  15   30
Distance:  9  40  200`;

		const answer = part2(input);
		expect(answer).toBe("71503");
	});
});
