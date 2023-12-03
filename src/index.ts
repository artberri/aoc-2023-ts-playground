import { error, log, title } from "./log";
import { parseArgs, parseDay, parsePart } from "./parseArgs";
import { promptDay, promptInput, promptPart } from "./prompts";

title("Welcome to Advent of Code 2023 TypeScript Playground!");

const availableDays = Array.from({ length: 25 }, (_, i) => i + 1);

const run = async () => {
	const args = parseArgs();

	const day = args.day ? parseDay(args.day) : await promptDay(availableDays);
	if (!availableDays.includes(day)) {
		error(`There is no day ${day} in the Advent of Code 2023!`);
		process.exit(1);
	}

	const part = args.part ? parsePart(args.part) : await promptPart();

	let solution: { default: (input: string) => string };
	try {
		solution = await import(`./day${day}/part${part}`);
	} catch (e) {
		error(
			`Error: Could not find solution for day ${day} part ${part}. Please make sure it exists in src/day${day}/part${part}.ts`,
		);
		process.exit(1);
	}

	const answer = await promptInput();

	log(`Running day ${day} part ${part}...`);

	const result = solution.default(answer);

	log("Answer:");

	log(result);
};

run();
