import { IGame } from "./IGame";

export interface ICompetitionGames {
  id: string,
  competition_name: string,
  games: IGame[],
  blinking_game: string | null,
  handleOnGameClick: (id: string) => undefined,
} 