import { clone, lines } from "../utils";

type Hand = {
	cards: string;
	bid: number;
};

type CalculatedHand = {
	cards: string;
	bid: number;
	type: HandType;
};

const parseHand = (hand: string): Hand => {
	const [cards, bid] = hand.split(" ");
	return {
		bid: parseInt(bid ?? "0", 10),
		cards: cards?.trim() ?? "",
	};
};

enum HandType {
	HighCard = 0,
	OnePair = 1,
	TwoPairs = 2,
	ThreeOfAKind = 3,
	FullHouse = 6,
	FourOfAKind = 7,
	FiveOfAKind = 8,
}

const pokerCardStrengthOrder = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"T",
	"J",
	"Q",
	"K",
	"A",
];

const getHandType = (cards: string): HandType => {
	const cardCounts = cards
		.split("")
		.reduce<Record<string, number>>((acc, card) => {
			const count = acc[card] ?? 0;
			const newObject = clone(acc);
			newObject[card] = count + 1;
			return newObject;
		}, {});

	const counts = Object.values(cardCounts);
	const countSet = new Set(counts);

	if (countSet.size === 1) {
		if (counts.includes(5)) {
			return HandType.FiveOfAKind;
		}

		return HandType.HighCard;
	}

	if (countSet.size === 2) {
		if (counts.includes(2) && counts.includes(3)) {
			return HandType.FullHouse;
		}

		if (counts.includes(4)) {
			return HandType.FourOfAKind;
		}

		if (counts.includes(3)) {
			return HandType.ThreeOfAKind;
		}

		if (counts.length === 3) {
			return HandType.TwoPairs;
		}
	}

	return HandType.OnePair;
};

const sortHands = (a: CalculatedHand, b: CalculatedHand): number => {
	const byType = a.type - b.type;
	if (byType !== 0) {
		return byType;
	}

	const aCards = a.cards.split("");
	const bCards = b.cards.split("");

	for (let i = 0; i < aCards.length; i++) {
		const aCard = aCards[i];
		const bCard = bCards[i];

		const aIndex = aCard ? pokerCardStrengthOrder.indexOf(aCard) : 0;
		const bIndex = bCard ? pokerCardStrengthOrder.indexOf(bCard) : 0;

		const byCard = aIndex - bIndex;
		if (byCard !== 0) {
			return byCard;
		}
	}

	return 0;
};

const sumBid = (
	acc: number,
	hand: CalculatedHand,
	currentIndex: number,
): number => {
	return acc + hand.bid * (currentIndex + 1);
};

export default (input: string): string => {
	const bid = lines(input)
		.map(parseHand)
		.map((hand) => ({
			...hand,
			type: getHandType(hand.cards),
		}))
		.sort(sortHands)
		.reduce(sumBid, 0);

	return bid.toString();
};
