import { isNotNil, map, minimum, paragraphs, without } from "../utils";

type SeedMap = {
	source: string;
	destination: string;
	map: {
		sourceStart: number;
		sourceEnd: number;
		destinationStart: number;
	}[];
};

const parseMapping = (
	mapping: string,
):
	| {
			sourceStart: number;
			sourceEnd: number;
			destinationStart: number;
	  }
	| undefined => {
	const match = mapping.match(/(\d+)\s(\d+)\s(\d+)/);
	const source = Number.parseInt(match?.[2] ?? "-1", 10);
	const destination = Number.parseInt(match?.[1] ?? "-1", 10);
	const length = Number.parseInt(match?.[3] ?? "-1", 10);

	if (source === -1 || destination === -1 || length === -1) {
		return undefined;
	}

	return {
		sourceStart: source,
		sourceEnd: source + length - 1,
		destinationStart: destination,
	};
};

const getSeedMap = (paragraph: string[]): SeedMap => {
	const heading = paragraph[0] ?? "";
	const mappings = without([heading], paragraph);
	const match = heading.match(/(\w+)-to-(\w+) map:/);
	const source = match?.[1] ?? "";
	const destination = match?.[2] ?? "";

	const parseMappings = map(parseMapping);

	return {
		source,
		destination,
		map: parseMappings(mappings).filter(isNotNil),
	};
};

const getDestination = (value: number, seedMap: SeedMap) => {
	const mapping = seedMap.map.find((m) => {
		return m.sourceStart <= value && m.sourceEnd >= value;
	});

	if (!mapping) {
		return value;
	}

	return mapping.destinationStart + (value - mapping.sourceStart);
};

const getValue =
	(originCategory: string, destinationCategory: string, seedMaps: SeedMap[]) =>
	(origin: number): number => {
		const seedMap = seedMaps.find((s) => s.source === originCategory);
		if (!seedMap) {
			throw new Error(
				`No seed map found for ${originCategory} to ${destinationCategory}`,
			);
		}

		const destination = getDestination(origin, seedMap);
		if (destinationCategory === seedMap.destination) {
			return destination;
		}

		return getValue(
			seedMap.destination,
			destinationCategory,
			seedMaps,
		)(destination);
	};

export default (input: string): string => {
	const inputs = paragraphs(input);
	const heading = inputs[0] ?? "";
	const seeds = (heading[0]?.match(/(\d+)/g) ?? []).map((s: string) =>
		Number.parseInt(s, 10),
	);

	const seedMaps = map(getSeedMap)(without([heading], inputs));
	const getLocation = getValue("seed", "location", seedMaps);
	const seedRanges: { start: number; length: number }[] = [];
	while (seeds.length > 0) {
		const start = seeds.shift();
		const length = seeds.shift();
		if (!start || !length) {
			break;
		}
		seedRanges.push({ start, length });
	}

	let closestLocation: undefined | number = undefined;

	for (const seedRange of seedRanges) {
		const seed = seedRange.start;
		for (let i = 0; i < seedRange.length; i++) {
			const location = getLocation(seed + i);
			closestLocation = minimum([closestLocation, location].filter(isNotNil));
		}
	}

	return closestLocation ? closestLocation.toString() : "0";
};
