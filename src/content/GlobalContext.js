import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ester from "../api/ester";

export const GlobalContext = React.createContext();

export default function GlobalContextProvider({ children }) {
  const [gameData, setGameData] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [userType, setUserType] = React.useState(null);
  const [gameId, setGameId] = React.useState(null);
  const [awaitInterval, setAwaitInterval] = React.useState(5000);
  const [minEstimate, setMinEstimate] = React.useState(0);
  const [maxEstimate, setMaxEstimate] = React.useState(5);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     executePeriodically();
  //   }, awaitInterval);

  //   return () => clearInterval(interval);
  // }, [awaitInterval, gameData]);

  const executePeriodically = () => {
    if (!gameData) {
      console.log("No game data");
      navigate("/");
      return;
    } else {
      console.log("Game data found");
      if (awaitInterval < 4000) {
        setAwaitInterval(1000);
      }
      getGamedata();
      return;
    }
  };

  const getGamedata = async () => {
    try {
      const res = await ester.post("/get/game", {
        data: {
          joinCode: gameData.joinCode,
        },
      });
      setGameData(res.data);
    } catch (error) {
      navigate("/");
    }
  };

  const hostGame = async () => {
    // user wants to host a game
    console.log("hosting a game");
    try {
      const res = await ester.post("/create/game");
      setGameData(res.data);
      setUserId(res.data.creator._id);
      setUserType("host");
      setGameId(res.data._id);
      console.log(res.data);
      navigate("/estimate");
    } catch (error) {
      console.log(error);
    }
  };

  const redirectIfGameDataNull = () => {
    console.log(gameData);
    if (!gameData) {
      navigate("/");
    }
  };

  const joinGame = async () => {
    // user wants to join a game
    console.log("joining a game");
  };

  return (
    <GlobalContext.Provider
      value={{ hostGame, joinGame, redirectIfGameDataNull }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
