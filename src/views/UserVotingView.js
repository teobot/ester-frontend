import { useEffect, useContext, useState } from "react";

import { GlobalContext } from "../context/GlobalContext";

export default function UserVotingView() {
  const { state, refreshGameData, vote } = useContext(GlobalContext);
  const [userVote, setUserVote] = useState(state.user.vote);

  useEffect(() => {
    // refresh the game data every second
    const interval = setInterval(() => {
      refreshGameData();
    }, state.refreshTime);
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(state);

  return (
    <div>
      <h1>welcome, {state.user.name}</h1>
      <div>
        <h2>your current game:</h2>
        <div>
          <h3>reveal: {state.game.reveal.toString()}</h3>
          <h3>revote: {state.game.revote.toString()}</h3>
          <h3>you voted?: {state.user.voted.toString()}</h3>
        </div>
        <div>
          <h3>your vote: {userVote.toString()}</h3>
          {/* SLIDER FOR USER VOTE */}
          <input
            type="range"
            min="0"
            max="5"
            step={"0.5"}
            value={userVote}
            onChange={(e) => {
              setUserVote(e.target.value);
            }}
          />
          <button onClick={() => vote(parseFloat(userVote))}>vote</button>
        </div>
      </div>
    </div>
  );
}
