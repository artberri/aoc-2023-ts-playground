import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 12: Hot Springs", () => {
	test("Part 1", async () => {
		const input1 = `#.#.### 1,1,3
.#...#....###. 1,1,3
.#.###.#.###### 1,3,1,6
####.#...#... 4,1,1
#....######..#####. 1,6,5
.###.##....# 3,2,1`;

		const answer1 = part1(input1);
		expect(answer1).toBe("6");

		const input2 = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

		const answer2 = part1(input2);
		expect(answer2).toBe("21");
	});

	test("Part 2", async () => {
		const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

		const answer = part2(input);
		expect(answer).toBe("525152");
	});
});
