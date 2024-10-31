import { IGame } from "./IGame";

export interface IGames {
  id: string,
  competition_name: string,
  games: IGame[],
}