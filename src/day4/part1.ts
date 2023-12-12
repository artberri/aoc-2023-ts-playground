import { sum } from "../utils";

export default (input: string): string => {
	const points = input.split("\n").map(parseCard);

	return sum(points).toString();
};

const cardRegex = /Card\s+(\d+): (.*)/;

const parseCard = (card: string): number => {
	const match = card.match(cardRegex);
	const numbers = (match?.[2] ?? "").split(" | ");
	const winningSet = (numbers[0] ?? "").split(" ").filter(Boolean);
	const mySet = (numbers[1] ?? "").split(" ").filter(Boolean);

	const prizes = mySet.filter((n) => winningSet.includes(n));
	const prizesLength = prizes.length;
	const points = 2 ** (prizesLength - 1);

	return prizesLength > 0 ? points : 0;
};
