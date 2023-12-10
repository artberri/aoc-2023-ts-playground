import { describe, expect, test, vi } from "vitest";

describe("Day 10: Pipe Maze", () => {
	test("Part 1", async () => {
		loadPart1();
		await vi.dynamicImportSettled();

		const input1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

		const answer1 = sut(input1);
		expect(answer1).toBe("4");

		const input2 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

		const answer2 = sut(input2);
		expect(answer2).toBe("4");

		const input3 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

		const answer3 = sut(input3);
		expect(answer3).toBe("8");

		const input4 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

		const answer4 = sut(input4);
		expect(answer4).toBe("8");
	});

	test("Part 2", async () => {
		loadPart2();
		await vi.dynamicImportSettled();

		const input1 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

		const answer1 = sut(input1);
		expect(answer1).toBe("4");

		const input2 = `..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`;

		const answer2 = sut(input2);
		expect(answer2).toBe("4");

		const input3 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

		const answer3 = sut(input3);
		expect(answer3).toBe("8");

		const input4 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

		const answer4 = sut(input4);
		expect(answer4).toBe("10");
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
