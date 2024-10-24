export interface IGameDetails {
  id: string,
  home_team_id: string,
  home_team_name: string,
  home_score: number,
  away_team_id: string,
  away_team_name: string,
  away_score: number,
  date: string,
  started: boolean,
  ongoing: boolean,
  finished: boolean,
  blinking_game: string | null,
}
