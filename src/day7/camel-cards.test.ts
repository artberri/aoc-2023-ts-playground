import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 7: Camel Cards", () => {
	test("Part 1", async () => {
		const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

		const answer = part1(input);
		expect(answer).toBe("6440");
	});

	test("Part 2", async () => {
		const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

		const answer = part2(input);
		expect(answer).toBe("5905");
	});
});
