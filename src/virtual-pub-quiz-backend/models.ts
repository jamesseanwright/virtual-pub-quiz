interface Round {
  categoryId: string;
  questionIds: string[];
}

interface Game {
  rounds: Round[];
}

export const createGame = (): Game => ({
  rounds: [],
});
