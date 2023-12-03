# Advent of Code 2023 TypeScript Playground

This is a Typescript playground for the [Advent of Code 2023](https://adventofcode.com/2023).

The idea of this repository is to provide an easy to play environment and allow you to focus on solving the challenges of Advent of Code 2023. It includes:

- A puzzle runner. Simply run the puzzle with the given input to get the answer.
- Test cases for the puzzles
  > I'll add them as I finish them. If you want to start a puzzle before I do read the "What can I do if there is no test for the puzzle I'm trying to solve?" section.

## Requirements

Node.js v20 and PNPM v8.

## Project Setup

1. Clone the repository
2. Run `pnpm install` to install dependencies

## Solve a puzzle

Each Advent of Code 2023 puzzle has two parts. For example, imagine that you want to solve the puzzle of the day2.

Create the file `src/day2/part1.ts` with the following code:

```ts
// src/day2/part1.ts
export default (input: string): string => {
  throw new Error("Not implemented");
};
```

Run the test and see it fail:

```bash
pnpm test:part1 day2
```

Implement the solution for part 1, if it is good, you should pass the test.

Run the puzzle using the input provided by the web:

```bash
pnpm start --day 2 --part 1 # You can also just run `pnpm start' and it will prompt for day and part.
```

Once you solve the first part you can start with the second one. It is mostly the same.

Create the file `src/day2/part2.ts`, it is probably worth starting by copying the code from the part 1:

Run the tests and see it fail for the part 2:

```bash
pnpm test day2
```

Implement the solution for part 2, if it is good, you should pass the tests.

Run the puzzle using the input provided by the web:

```bash
pnpm start --day 2 --part 2 # You can also just run `pnpm start' and it will prompt for day and part.
```

## What can I do if there is no test for the puzzle I'm trying to solve?

If there's no test for the puzzle you're trying to solve, it's because you want to start a puzzle before I do, which is probably because I'm not a regular player.

1. Create the day structure yourself by copying the example provided:
   ```bash
   cp -R example src/dayX
   ```
2. Rename the test file and replace the placeholders in the file with the inputs and expected outputs of that day's puzzle.
3. Enjoy the puzzle.

## Contributing

Pull requests are welcome. If you get to the next puzzle before me and prepare the tests I will be happy to merge your PR.

## License

[MIT](LICENSE)
