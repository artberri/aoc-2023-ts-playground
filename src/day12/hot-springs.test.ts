import { describe, expect, test, vi } from "vitest";

describe("Day 12: Hot Springs", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input1 = `#.#.### 1,1,3
.#...#....###. 1,1,3
.#.###.#.###### 1,3,1,6
####.#...#... 4,1,1
#....######..#####. 1,6,5
.###.##....# 3,2,1`;

		const answer1 = sut(input1);
		expect(answer1).toBe("6");

		const input2 = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

		const answer2 = sut(input2);
		expect(answer2).toBe("21");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

		const answer = sut(input);
		expect(answer).toBe("525152");
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
