import { describe, expect, test } from "vitest";
import part1 from "./part1";
import part2 from "./part2";

describe("Day 15: Lens Library", () => {
	test("Part 1", async () => {
		const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

		const answer = part1(input);
		expect(answer).toBe("1320");
	});

	test("Part 2", async () => {
		const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

		const answer = part2(input);
		expect(answer).toBe("145");
	});
});
