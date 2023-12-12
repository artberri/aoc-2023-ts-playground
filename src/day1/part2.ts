import { lines, map, pipe, reverseString, sum } from "../utils";

const numbers = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"zero",
];
const reverseNumbers = map(reverseString)(numbers);
const reNumbers = new RegExp(`[0-9]|${numbers.join("|")}`, "i");
const reReverseNumbers = new RegExp(`[0-9]|${reverseNumbers.join("|")}`, "i");
const findNumberForwards = (input: string): string =>
	reNumbers.exec(input)?.[0] ?? "0";
const findNumberBackwards = (input: string): string =>
	reReverseNumbers.exec(input)?.[0] ?? "0";
const textToNumber = (text: string): string => {
	const index = numbers.indexOf(text);
	return index === -1 ? text : (index + 1).toString();
};
const textToReverseNumber = (text: string): string => {
	const index = reverseNumbers.indexOf(text);
	return index === -1 ? text : (index + 1).toString();
};
const firstNumber = pipe(findNumberForwards, textToNumber);
const lastNumber = pipe(
	reverseString,
	findNumberBackwards,
	textToReverseNumber,
);
const findNumbers = (input: string): [string, string] => [
	firstNumber(input),
	lastNumber(input),
];
const toNumber = (numbers: [string, string]): number =>
	Number.parseInt(`${numbers[0]}${numbers[1]}`, 10);
const lineToNumber = pipe(findNumbers, toNumber);

export default pipe(lines, map(lineToNumber), sum, String);
