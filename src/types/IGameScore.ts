export interface IGameScore {
  home_team_id: string,
  home_team_name: string,
  home_score: number,
  away_team_id: string,
  away_team_name: string,
  away_score: number,
  blinking_game: string | null,
  game_id: string,
}