import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ester, { domain, environment } from "../api/ester";

import { io } from "socket.io-client";

export const GlobalContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const realInit = {
  user: null,
  game: null,
  refreshTime: 10000,
};

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, realInit);
  const [createdSocket, setCreatedSocket] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  useEffect(() => {
    // make a listen to window resize and change the state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.user && state.game && !createdSocket) {
      setCreatedSocket(true);
    }
  }, [state]);

  useEffect(() => {
    if (createdSocket) {
      const socket = io(domain + environment === "development" ? ":3333" : "");

      console.log(state.game._id);

      socket.on(state.game._id, (data) => {
        switch (data.type) {
          case "user:joined":
          case "user:vote":
          case "game:revote":
          case "game:reveal":
            refreshGameData();
            break;
          default:
            break;
        }
      });

      socket.on("connect", () => {
        // listen to room messages
        console.log("connected");
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    }
  }, [createdSocket]);

  const refreshGameData = async () => {
    if (!state.game || !state.user) return;
    try {
      const res = await ester.post("/get/game", {
        userId: state.user._id,
        gameId: state.game._id,
      });
      dispatch({
        type: "set",
        payload: {
          game: res.data.game,
          user: res.data.user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hostGame = async () => {
    // user wants to host a game
    console.log("hosting a game");
    try {
      const res = await ester.post("/create/game");
      dispatch({
        type: "set",
        payload: {
          game: res.data.game,
          user: res.data.user,
        },
      });
      navigate("/estimate");
    } catch (error) {
      console.log(error);
    }
  };

  const joinGame = async (joinCode, username) => {
    // user wants to join a game
    console.log("joining a game");
    try {
      const res = await ester.post("/game/join", {
        name: username,
        joinCode: joinCode,
      });
      dispatch({
        type: "set",
        payload: {
          game: res.data.game,
          user: res.data.user,
        },
      });
      navigate("/voting");
    } catch (error) {
      console.log(error);
      // return error message
      return error.response.data.error;
    }
  };

  const goToJoinCodeView = () => {
    navigate("/join");
  };

  const vote = async (voteValue) => {
    try {
      const res = await ester.post("/game/vote", {
        userId: state.user._id,
        gameId: state.game._id,
        vote: voteValue,
      });
      dispatch({
        type: "set",
        payload: {
          game: res.data.game,
          user: res.data.user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const reveal = async () => {
    try {
      const res = await ester.post("/game/reveal", {
        userId: state.user._id,
        gameId: state.game._id,
      });
      dispatch({
        type: "set",
        payload: {
          game: res.data.game,
          user: res.data.user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const revote = async () => {
    try {
      const res = await ester.post("/game/revote", {
        userId: state.user._id,
        gameId: state.game._id,
      });
      dispatch({
        type: "set",
        payload: {
          game: res.data.game,
          user: res.data.user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const kickUser = async (id) => {
    try {
      const res = await ester.post("/game/user/remove", {
        userId: state.user._id,
        gameId: state.game._id,
        kickId: id,
      });
      dispatch({
        type: "set",
        payload: {
          game: res.data.game,
          user: res.data.user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const amountUsersVoted = state.game?.users
    ? state.game?.users.filter((user) => user.voted).length
    : 0;
  const amountUsersPresent = state.game?.users ? state.game?.users.length : 0;

  return (
    <GlobalContext.Provider
      value={{
        state,
        hostGame,
        joinGame,
        refreshGameData,
        goToJoinCodeView,
        vote,
        reveal,
        revote,
        amountUsersVoted,
        amountUsersPresent,
        kickUser,
        windowHeight,
        windowWidth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
