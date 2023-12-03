import chalk from "chalk";

export const title = (message: string) => {
	console.log(chalk.blue(message));
	console.log();
};

export const log = (message: string) => {
	console.log(message);
	console.log();
};

export const error = (message: string) => {
	console.error(chalk.bold.red(message));
	console.log();
};
