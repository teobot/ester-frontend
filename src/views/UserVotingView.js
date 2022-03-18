import { useRef, useContext, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

import ConfettiExplosion from "@reonomy/react-confetti-explosion";

export default function UserVotingView() {
  const { state, vote, windowWidth } = useContext(GlobalContext);

  const [isExploding, setIsExploding] = useState(false);
  const [userVote, setUserVote] = useState(state.user?.vote || 0);

  const screenRef = useRef(null);

  const ExplodeProps = {
    force: 0.7,
    particleCount: 100,
    duration: 4000,
    floorHeight: 1000,
    floorWidth: 1000,
  };

  const userVoted = async (v) => {
    await vote(v).then(() => {
      setIsExploding(true);
    });
  };

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
      }, ExplodeProps.duration);
    }
  }, [isExploding]);

  console.log(state);

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
              color: "black",
            }}
            variant="rounded"
          >
            {state.user.name.length > 4
              ? state.user.name.toString().substring(0, 4)
              : state.user.name}
          </Avatar>
        </div>
        <div
          style={{
            display: "flex",
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 25px",
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
              userVoted(userVote);
            }}
            disabled={state.user.voted}
            color={state.user.voted ? "secondary" : "success"}
            size="large"
            style={{
              width: "100%",
              height: "20%",
              fontSize: "2rem",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isExploding ? (
              <div
                key="explosion-container"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  right: "50%",
                  bottom: "50%",
                }}
              >
                <ConfettiExplosion key="explosion-object" {...ExplodeProps} />
              </div>
            ) : null}
            {state.user.voted ? "vote locked" : "vote"}
          </Button>
          <Slider
            disabled={state.user.voted}
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
    <Paper
      elevation={voted ? 12 : 1}
      className="roboto"
      style={{
        height: 300,
        width: "100%",
        borderRadius: voted ? 30 : 10,
        fontWeight: voted ? 700 : 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "7rem",
        transition: "all 0.25s ease-in-out",
        position: "relative",
      }}
    >
      {vote.toString()}
    </Paper>
  );
};
