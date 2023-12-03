import { parseArgs as nodeParseArgs } from "node:util";
import { error } from "./log";

export const parseArgs = () => {
	const args = process.argv.slice(2);

	const options = {
		day: {
			type: "string",
			short: "d",
		},
		part: {
			type: "string",
			short: "p",
		},
	} as const;

	const config = nodeParseArgs({
		options,
		args,
	});

	return config.values;
};

export const parseDay = (day: string): number => {
	const dayNum = Number.parseInt(day);
	if (Number.isNaN(dayNum)) {
		error(`Error: Invalid day: ${day}`);
		process.exit(1);
	}

	return dayNum;
};

export const parsePart = (part: string): 1 | 2 => {
	if (part !== "1" && part !== "2") {
		error(`Error: Invalid part: ${part}. Must be 1 or 2.`);
		process.exit(1);
	}

	return Number.parseInt(part) as 1 | 2;
};
