import { useState, useEffect } from 'react';

import axios from 'axios';

import { Box } from '@mui/material';

import echo from '../src/config/WebSocketConfig';

import Competition from '../src/components/Competition';

import { IGames } from './types/IGames';

import './App.css';

const App = () => {
  const [games, setGames] = useState<IGames[]>([]);
  const [blinking_game, setblinking_game] = useState<string | null>(null); // To track which game a goal was scored

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/games?date=2024-10-23')
      .then(response => setGames(response.data))
      .catch(error => console.error(error));

    echo.channel('game-live')
      .listen('GameUpdated', (data: { game_event: any; }) => {
        const { game_event } = data;

        setblinking_game(game_event.game_id);

        // Set a timeout to stop the blinking after 3 seconds
        setTimeout(() => {
          setblinking_game(null);
        }, 3000);

        setGames((prevGames) =>
          prevGames.map(competition => ({
            ...competition,
            games: competition.games.map(game =>
              game.id === game_event.game_id
                ? {
                    ...game,
                    home_score: game_event.team_id === game.home_team_id ? game.home_score + 1 : game.home_score,
                    away_score: game_event.team_id === game.away_team_id ? game.away_score + 1 : game.away_score,
                  }
                : game
            ),
          }))
        );
      });

    return () => {
      echo.leaveChannel('game-live');
    };
  }, []);

  return (
    <Box 
      sx={{
        margin: '0 auto',
        width: {
          md: '100%',
          lg: '80%',
          xl: '50%',
        },
      }}
    >
      {games.map(competition => (
        <Competition
          key={competition.id}
          id={competition.id}
          competition_name={competition.competition_name}
          games={competition.games}
          blinking_game={blinking_game}
        />
      ))}
    </Box>
  );
}

export default App;
