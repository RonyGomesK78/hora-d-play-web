import { Box, Typography } from '@mui/material';

import GameScore from './GameScore';

import { IGameDetails } from '../types/IGameDetails';

const Game = ({
  id,
  home_team_id,
  home_team_name,
  home_score,
  away_team_id,
  away_team_name,
  away_score,
  date,
  started,
  ongoing,
  finished,
  blinking_game,
}: IGameDetails) => {
  return (
    <Box key={id} width="100%" sx={{ border: '1px solid #C5C6D0' }}>
      <Box
        sx={{
          width: "100%",
          pt: "1rem",
          pb: "0.2rem",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: ongoing ? '#006BD6' : 'inherit',
          '&:hover': {
            color: '#006BD6',
          },
        }}
      >
        <GameScore 
          home_team_id={home_team_id}
          home_team_name={home_team_name}
          home_score={home_score}
          away_team_id={away_team_id}
          away_team_name={away_team_name}
          away_score={away_score}
          blinking_game={blinking_game}
          game_id={id}
        />
       
        <Typography fontSize="0.7rem" color="textSecondary">
          {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
    </Box>
  );
}

export default Game;