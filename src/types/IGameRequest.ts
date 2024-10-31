export interface IGameRequest {
  id: string
  date: string,
  location: string,
  home_team_id: string
  home_team_name: string
  away_team_id: string,
  away_team_name: string,
  home_score?: number,
  away_score?: number,
  started: boolean,
  ongoing: boolean,
  finished: boolean,
  competition_id: string,
  competition_name: string
}