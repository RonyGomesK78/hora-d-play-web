import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";

import axiosClient from "../clients/axiosClient";
import echo from "../config/WebSocketConfig";

import { IGameRequest } from "../types/IGameRequest";
import { IEventsRequest } from "../types/IEventsRequest";

import constants from "../utils/constants";

const Game = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();

  const [game, setGame] = useState<IGameRequest | null>(null);
  const [events, setEvents] = useState<IEventsRequest[]>([]);
  const [blinking_game, setblinking_game] = useState<boolean>(false);
  console.log("🚀 ~ Game ~ blinking_game:", blinking_game)
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderGameStatus = () => {
    enum GameStatus {
      NOT_STARTED = 'Ainda não começou',
      STARTED = 'Em andamento',
      FINISHED = 'Finalizado',
    };

    if (game?.finished === true) {
      return (
        <Typography variant={isMobile ? 'body2' : 'body2'} component="h1" textAlign="center" color="error">
          {GameStatus.FINISHED}
        </Typography>
      );
    }
    else if (game?.ongoing === true) {
      return (
        <Typography variant={isMobile ? 'body2' : 'body2'} component="h1" textAlign="center" color="success">
          {GameStatus.STARTED}
        </Typography>
      );
    }
    return (
      <Typography variant={isMobile ? 'body2' : 'body2'} component="h1" textAlign="center" color="warning">
        {GameStatus.NOT_STARTED}
      </Typography>
    );
  };

  useEffect(() => {
    axiosClient.get(`/games/${id}`)
      .then(response => setGame(response.data))
      .catch(error => console.error(error));

    axiosClient.get(`/games/${id}/events`)
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));

  }, [id]);

  useEffect(() => {
    if (!game) return;
    // Set up WebSocket channel for the specific game
    echo.channel(`game-live.${id}`)
      .listen('GameUpdated', (data: { game_event: IEventsRequest; }) => {
        const { game_event } = data;

        if (game_event) {
          if (game_event.event_type === constants.events.GOAL) {
            setblinking_game(true);
            setGame(prevGame => {
              if (!prevGame) return prevGame;
  
              return {
                ...prevGame,
                home_score: game_event.team_id === prevGame.home_team_id ? prevGame.home_score + 1 : prevGame.home_score,
                away_score: game_event.team_id === prevGame.away_team_id ? prevGame.away_score + 1 : prevGame.away_score,
              };
            });
          }

        }

        setTimeout(() => setblinking_game(false), 3000);
      });
  
    // Cleanup function to leave the channel
    return () => {
      echo.leaveChannel(`game-live.${id}`);
    };
  }, [game]);  // Depend on `game` to re-establish connection when it changes

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: '0 auto',
        width: {
          md: '100%',
          lg: '80%',
          xl: '50%',
        },
        border: '1px solid #C5C6D0',
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: 'whitesmoke',
      }}
    >
      <Typography variant="subtitle2" textAlign="center" color="textSecondary" fontSize={isMobile ? '0.8rem' : '1rem'}>
        {game?.competition_name}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1, p: 2,  width: '100%' }}>
          <Typography variant={isMobile ? 'h6' : 'h4'} component="h1" textAlign="end" pr={isMobile ? '0.5rem' : '1rem'}>
            {game?.home_team_name}
          </Typography>
        </Box>
        <Box sx={{ flex: 'none', p: 2, borderRadius: 2 }}>
          <Typography
            className={blinking_game ? 'blink' : ''}
            variant={isMobile ? 'h6' : 'h4'} component="h1" textAlign="center"
          >
            {game?.home_score} - {game?.away_score}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, p: 2,  width: '100%' }}>
          <Typography variant={isMobile ? 'h6' : 'h4'} component="h1" textAlign="start" pl={isMobile ? '0.5rem' : '1rem'}>
            {game?.away_team_name}
          </Typography>
        </Box>
      </Box>

      <Typography fontSize="0.7rem" color="textSecondary" textAlign="center" variant="button">
        {game?.date}
      </Typography>
      <Typography variant={isMobile ? 'body2' : 'body2'} component="h1" textAlign="center" color="error">
        {renderGameStatus()}
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered textColor="primary" indicatorColor="primary">
          <Tab sx={{ fontSize: '0.7rem' }} label="Eventos" />
          <Tab sx={{ fontSize: '0.7rem' }} label="Escalações" />
        </Tabs>
        {value === 0 && (
          events.map(event => {
            console.log("🚀 ~ Game ~ event:", event);
            
            // I just interested of the events related to teams
            if (event.team_id) {
              // Check if the event is related to home or away team
              if (event.team_id === game?.home_team_id) {
                return (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', bgcolor: 'background.paper', border: '1px solid rgba(197, 198, 208, 0.5)' }}>
                      <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box sx={{ flex: 1, py: 1, width: '100%' }}>
                          <Typography fontSize="0.7rem" textAlign="end">
                            {event.event_type} - {event.player_name} - {event.minute}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1, width: '100%' }} />
                      </Box>
                    </Box>
                  </>
                );
              }
              else if (event.team_id === game?.away_team_id) {
                return (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', bgcolor: 'background.paper', border: '1px solid rgba(197, 198, 208, 0.5)' }}>
                      <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box sx={{ flex: 1, width: '100%' }} />
                        <Box sx={{ flex: 1, py: 1, width: '100%' }}>
                          <Typography fontSize="0.7rem" textAlign="start" pr={isMobile ? '0.5rem' : '1rem'}>
                            {event.minute} - {event.event_type} - {event.player_name}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </>
                );
              }
            }
          })
        )}
        {value === 1 && (
          <Box sx={{ bgcolor: 'background.paper' }}>
            <Typography textAlign='center' variant="body2">Escalações Content</Typography>
            {/* Render content specific to the "Escalações" tab */}
          </Box>
        )}
      </Box>
      
    </Box>
  );
}

export default Game;