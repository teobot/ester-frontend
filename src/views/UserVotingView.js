import { useRef, useContext, useState } from "react";

import { Navigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

import GetDimensions from "../helpers/GetDimensions";

import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

export default function UserVotingView() {
  const { state, vote } = useContext(GlobalContext);

  const [userVote, setUserVote] = useState(state.user?.vote || 0);

  const screenRef = useRef(null);

  if (!state.user || !vote) {
    // : redirect to landing page
    return <Navigate to="/" />;
  } else {
    return (
      <div
        ref={screenRef}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: state.user.color,
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 5,
          }}
        >
          <Avatar
            className="roboto"
            style={{
              backgroundColor: state.user.color,
              width: 75,
              height: 75,
              border: "1px solid rgba(0, 0, 0, 0.15)",
              boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.25)",
              fontWeight: "bold",
              color: "black"
            }}
            variant="rounded"
          >
            {state.user.name}
          </Avatar>
        </div>
        <div
          style={{
            display: "flex",
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VoteDisplay voted={state.user.voted} vote={userVote} />
        </div>
        <div
          style={{
            display: "flex",
            flex: 5,
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
            padding: "0px 25px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              vote(userVote);
            }}
            color={state.user.voted ? "secondary" : "success"}
            size="large"
            style={{
              width: "100%",
            }}
          >
            {state.user.voted ? "Revote" : "Vote"}
          </Button>
          <Slider
            key={`slider-${state.user._id}`}
            size="medium"
            value={userVote}
            aria-label="Default"
            valueLabelDisplay="auto"
            min={0}
            max={5}
            step={0.5}
            marks
            onChange={(e, v) => {
              setUserVote(v);
            }}
          />
        </div>
      </div>
    );
  }
}

const VoteDisplay = ({ vote, voted }) => {
  return (
    <div
      className="roboto"
      style={{
        height: 300,
        width: 300,
        backgroundColor: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "50%",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "7rem",
        border: voted ? "10px solid rgba(0, 0, 0, 0.15)" : "none",
      }}
    >
      {vote.toString()}
    </div>
  );
};
