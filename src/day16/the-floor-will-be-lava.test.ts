import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 16: The Floor Will Be Lava", () => {
	test("Part 1", async () => {
		const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

		const answer = part1(input);
		expect(answer).toBe("46");
	});

	test("Part 2", async () => {
		const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

		const answer = part2(input);
		expect(answer).toBe("51");
	});
});
