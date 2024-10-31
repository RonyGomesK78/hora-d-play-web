import { Box, Typography } from '@mui/material';

import Game from './Game';

import { ICompetitionGames } from '../types/ICompetitionGames';

const CompetitionGames = ({
  id,
  competition_name,
  games,
  blinking_game,
  handleOnGameClick,
}: ICompetitionGames) => {
  return (
    <Box
      key={id}
      mb={4}
      sx={{
        border: '1px solid #C5C6D0',
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Box sx={{ bgcolor: 'whitesmoke' }}>
        <Typography variant="button" component="h2" textAlign="center" fontWeight="bold">
          {competition_name}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        {games.map(game => (
          <Game
            key={game.id}
            id={game.id}
            home_team_id={game.home_team_id}
            home_team_name={game.home_team_name}
            home_score={game.home_score}
            away_team_id={game.away_team_id}
            away_team_name={game.away_team_name}
            away_score={game.away_score}
            date={game.date}
            started={game.started}
            ongoing={game.started}
            finished={game.finished}
            blinking_game={blinking_game}
            handleOnGameClick={handleOnGameClick}
          />
        ))}
      </Box>
    </Box>
  );
}

export default CompetitionGames;