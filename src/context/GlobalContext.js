import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ester, { backendDomain, environment } from "../api/ester";

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
};

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, realInit);
  const [createdSocket, setCreatedSocket] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const [isLoading, setIsLoading] = React.useState(true);
  const [amountUsersVoted, setAmountUsersVoted] = React.useState(0);
  const [enableConfetti, setEnableConfetti] = React.useState(
    localStorage.getItem("enableConfetti") !== null
      ? JSON.parse(localStorage.getItem("enableConfetti")).enableConfetti
      : true
  );
  const [MEGAConfetti, setMEGAConfetti] = React.useState(false);

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

  const sortByVote = (a, b) => {
    if (!state.game.reveal) {
      // if not revealed, sort by alphabetical order
      return a.name.localeCompare(b.name);
    } else {
      // if revealed, sort by vote value
      return a.vote - b.vote;
    }
  };

  useEffect(() => {
    if (createdSocket) {
      const socket = io(
        backendDomain + (environment === "development" ? ":3333" : "")
      );

      socket.on(state.game._id, (data) => {
        switch (data.type) {
          case "user:joined":
          case "user:vote":
          case "game:revote":
          case "game:reveal":
          case "game:update":
            refreshGameData();
            break;
          default:
            break;
        }
      });

      socket.on("connect", () => {
        // listen to room messages
        console.log("connected to socket");
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
      if (!res.data.game.reveal && res.data.game.users) {
        setAmountUsersVoted(
          res.data.game.users.filter((user) => user.voted).length
        );
      }
      console.log("refreshed game data");
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

  const undoVote = async () => {
    try {
      // send a post request for the vote to undo a vote
      const res = await ester.post("/user/vote/undo", {
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
      navigate("/");
    }
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
      navigate("/");
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
      setAmountUsersVoted(0);
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

  const wakeUpRequest = async () => {
    setIsLoading(true);
    try {
      // wait 5 seconds
      const wakeup = await ester.get("");
      console.log(wakeup.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateGame = async (type, payload) => {
    // update game
    // type = setMin, setMax, setStep
    // : send request based on type
    try {
      let res = null;
      switch (type) {
        case "setMin":
          // set min value
          res = await ester.post("/game/min", {
            userId: state.user._id,
            gameId: state.game._id,
            min: payload,
          });
          break;
        case "setMax":
          // set max value
          res = await ester.post("/game/max", {
            userId: state.user._id,
            gameId: state.game._id,
            max: payload,
          });
          break;
        case "setStep":
          // set step value
          res = await ester.post("/game/step", {
            userId: state.user._id,
            gameId: state.game._id,
            step: payload,
          });
          break;
        default:
          break;
      }
      if (res) {
        dispatch({
          type: "set",
          payload: {
            game: res.data.game,
            user: res.data.user,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const forceUpdate = async () => {
    // send a post request to /game/force
    try {
      const res = await ester.post("/game/force", {
        userId: state.user._id,
        gameId: state.game._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const amountUsersPresent = state.game?.users ? state.game?.users.length : 0;

  return (
    <GlobalContext.Provider
      value={{
        state,
        hostGame,
        joinGame,
        refreshGameData,
        goToJoinCodeView,
        undoVote,
        vote,
        reveal,
        revote,
        amountUsersVoted,
        amountUsersPresent,
        kickUser,
        windowHeight,
        windowWidth,
        sortByVote,
        wakeUpRequest,
        isLoading,
        enableConfetti,
        setEnableConfetti: (value) => {
          setEnableConfetti(value);
          localStorage.setItem(
            "enableConfetti",
            JSON.stringify({
              enableConfetti: value,
            })
          );
        },
        MEGAConfetti,
        setMEGAConfetti,
        updateGame,
        forceUpdate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
