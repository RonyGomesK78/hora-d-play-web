import { IGameDetails } from "./IGameDetails";

export interface ICompetitionGames {
  id: string,
  competition_name: string,
  games: IGameDetails[],
  blinking_game: string | null,
} 