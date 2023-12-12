import { lines, map, pipe, reverseString, sum } from "../utils";

const firstNumber = (input: string): string => input.match(/\d+/)?.[0] ?? "0";
const lastNumber = pipe(reverseString, firstNumber);
const findNumbers = (input: string): [string, string] => [
	firstNumber(input),
	lastNumber(input),
];
const toNumber = (numbers: [string, string]): number =>
	Number.parseInt(`${numbers[0]}${numbers[1]}`, 10);
const lineToNumber = pipe(findNumbers, toNumber);

export default pipe(lines, map(lineToNumber), sum, String);
