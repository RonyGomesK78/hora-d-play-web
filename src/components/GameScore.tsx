import { Box, Typography } from '@mui/material';
import { IGameScore } from '../types/IGameScore';

const GameScore = ({ 
  home_team_id,
  home_team_name,
  home_score,
  away_team_id,
  away_team_name,
  away_score,
  blinking_game,
  game_id
}: IGameScore) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Box sx={{ flex: 1, p: 2,  width: '100%' }}>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'end' }} variant="body2">
          {home_team_name}
        </Typography>
      </Box>
      <Box sx={{ flex: 'none', p: 2 }}>
        <Typography
          className={game_id === blinking_game ? 'blink' : ''}
          sx={{ fontWeight: 'bold', mx: 1 }}
          variant="body2"
        >
          {home_score} - {away_score}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, p: 2, width: '100%' }}>
        <Typography sx={{ fontWeight: 'bold', width: '100%' }} variant="body2">
          {away_team_name}
        </Typography>
      </Box>
    </Box>
  );
}

export default GameScore;