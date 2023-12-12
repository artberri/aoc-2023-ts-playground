import { sum } from "../utils";

export default (input: string): string => {
	const cards = input.split("\n").map(parseCard);

	const cardsMap = Array.from(input.split("\n"), () => 1);

	for (const card of cards) {
		for (let i = 0; i < card.length; i++) {
			if (cardsMap[card.i + i + 1]) {
				cardsMap[card.i + i + 1] += cardsMap[card.i] ?? 0;
			}
		}
	}

	return sum(cardsMap).toString();
};

const cardRegex = /Card\s+(\d+): (.*)/;

const parseCard = (card: string) => {
	const match = card.match(cardRegex);
	const numbers = (match?.[2] ?? "").split(" | ");
	const winningSet = (numbers[0] ?? "").split(" ").filter(Boolean);
	const mySet = (numbers[1] ?? "").split(" ").filter(Boolean);

	const prizes = mySet.filter((n) => winningSet.includes(n));
	const length = prizes.length;

	return {
		i: Number.parseInt(match?.[1] ?? "0", 10) - 1,
		length,
	};
};
