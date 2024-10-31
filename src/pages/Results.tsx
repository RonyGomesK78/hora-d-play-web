import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import axiosClient from "../clients/axiosClient";
import echo from "../config/WebSocketConfig";

import CompetitionGames from "../components/CompetitionGames";

import { IGames } from "../types/IGames";

import constants from "../utils/constants";

const Games = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState<IGames[]>([]);
  const [blinking_game, setblinking_game] = useState<string | null>(null); // To track which game a goal was scored

  const handleOnGameClick = (id: string) => {
    navigate(`/game/${id}`);

    return undefined;
  };

  useEffect(() => {
    axiosClient.get('/games?date=2024-10-31')
      .then(response => setGames(response.data))
      .catch(error => console.error(error));

    echo.channel('games-live')
      .listen('GameUpdated', (data: { game_event: any; }) => {
        const { game_event } = data;

        if (game_event.event_type === constants.events.GOAL) {
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
        }
      });

    return () => {
      echo.leaveChannel('games-live');
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
        <CompetitionGames
          key={competition.id}
          id={competition.id}
          competition_name={competition.competition_name}
          games={competition.games}
          blinking_game={blinking_game}
          handleOnGameClick={handleOnGameClick}
        />
      ))}
    </Box>
  );

}

export default Games;