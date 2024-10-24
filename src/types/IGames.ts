import { IGameDetails } from "./IGameDetails";

export interface IGames {
  id: string,
  competition_name: string,
  games: IGameDetails[],
}