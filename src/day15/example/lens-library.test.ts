import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 15: Lens Library", () => {
	test("Part 1", async () => {
		const input = `test
input
part1`;

		const answer = part1(input);
		expect(answer).toBe("outputpart1");
	});

	test("Part 2", async () => {
		const input = `test
input
part2`;

		const answer = part2(input);
		expect(answer).toBe("outputpart2");
	});
});
