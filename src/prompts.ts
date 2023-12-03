import { editor, select } from "@inquirer/prompts";

export const promptDay = async (availableDays: number[]): Promise<number> => {
	const answer = await select({
		message: "Select a day",
		choices: availableDays.map((day) => ({
			name: `Day ${day}`,
			value: day,
		})),
	});

	return answer;
};

export const promptPart = async (): Promise<1 | 2> => {
	const answer = await select({
		message: "Select a day",
		choices: [
			{
				name: "Part 1",
				value: 1 as const,
			},
			{
				name: "Part 2",
				value: 2 as const,
			},
		],
	});

	return answer;
};

export const promptInput = async (): Promise<string> => {
	const answer = await editor({
		message: "Insert input",
		waitForUseInput: true,
	});

	return answer.trim();
};
