import { paragraphs } from "../utils";

export default (input: string): string => {
	const [workflowsString, ratings] = paragraphs(input);
	if (!workflowsString || !ratings) {
		throw new Error("Invalid input");
	}

	const workflows = new Map<string, Rule[]>();
	for (const workflow of workflowsString) {
		const [key, ruleList] = workflow.replace("}", "").split("{");
		const rules = (ruleList?.split(",") ?? []).map(parseRule);
		workflows.set(key ?? "", rules);
	}

	const [x, m, a, s] = Array(4).fill([1, 4000]);
	const filter = acceptedCount(workflows);

	return filter({ x, m, a, s }).toString();
};

type Part = {
	x: [number, number];
	m: [number, number];
	a: [number, number];
	s: [number, number];
};
type Rule = {
	test: number;
	op: number;
	cat: "x" | "m" | "a" | "s";
	key: string;
};

function parseRule(rule: string): Rule {
	if (!rule.includes(":")) {
		return { test: 0, op: 1, cat: "x", key: rule };
	}
	const test = Number(rule.match(/\d+/)?.[0]);
	const [cat, key] = rule.split(/[<>]\d+:/) as ["x" | "m" | "a" | "s", string];
	return { test, op: rule.includes("<") ? -1 : 1, cat, key };
}

const acceptedCount =
	(workflows: Map<string, Rule[]>) =>
	(part: Part, workflow = "in"): number => {
		const filter = acceptedCount(workflows);
		if (workflow === "A" || workflow === "R") {
			return workflow === "A"
				? Object.values(part).reduce(
						(product, [low, high]) => product * ((high ?? 0) - (low ?? 0) + 1),
						1,
				  )
				: 0;
		}

		let combos = 0;
		for (const { test, op, cat, key } of workflows.get(workflow) ?? []) {
			const [low, high] = part[cat] ?? [0, 0];
			if ((low - test) * op > 0) {
				if ((high - test) * op > 0) {
					return combos + filter(part, key);
				}

				combos += filter({ ...part, ...{ [cat]: [low, test - 1] } });
				part[cat] = [test, high];
			} else if ((high - test) * op > 0) {
				combos += filter({ ...part, ...{ [cat]: [test + 1, high] } });
				part[cat] = [low, test];
			}
		}

		return 0;
	};
