import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 14: Parabolic Reflector Dish", () => {
	test("Part 1", async () => {
		const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

		const answer = part1(input);
		expect(answer).toBe("136");
	});

	test("Part 2", async () => {
		const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

		const answer = part2(input);
		expect(answer).toBe("64");
	});
});
