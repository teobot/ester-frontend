import { useContext, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

import ConfettiCannon from "../components/ConfettiCannon";
import VotingScreenDrawer from "../components/VotingScreenDrawer";

import ScaleText from "react-scale-text";

export default function UserVotingView() {
  const { state, vote, windowWidth, windowHeight } = useContext(GlobalContext);
  const [gameMarkers, setGameMarkers] = useState([]);

  const [userVote, setUserVote] = useState(state.user?.vote || 0);
  const [drawer, setDrawer] = useState(false);

  const userVoted = async (v) => {
    await vote(v);
  };

  const returnMarkers = () => {
    if (!state.game) return [];
    let _markers = [...state.game.additionMarker];
    for (
      let i = state.game.minVote;
      i < state.game.maxVote + state.game.step;
      i += state.game.step
    ) {
      _markers.push({
        value: i,
      });
    }

    // sort the markers by value
    _markers.sort((a, b) => {
      return a.value - b.value;
    });

    setGameMarkers(_markers);
  };

  useEffect(() => {
    returnMarkers();
  }, []);

  useEffect(() => {
    returnMarkers();
  }, [state.game]);

  const screenSize = () => {
    if (windowWidth > 600 && windowWidth > windowHeight) {
      // desktop
      return windowHeight;
    } else {
      // mobile
      return "100%";
    }
  };

  if (!state.user || !vote) {
    // : redirect to landing page
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <VotingScreenDrawer open={drawer} setDrawer={setDrawer} />
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: state.user.color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: screenSize(),
              height: "100%",
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
                onClick={() => setDrawer(true)}
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
                <div
                  className="parent"
                  style={{
                    width: "calc(100% - 15px)",
                    height: "calc(100% - 15px)",
                  }}
                >
                  <ScaleText>{state.user.name}</ScaleText>
                </div>
              </Avatar>
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                flex: 5,
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 25px",
              }}
            >
              <VoteDisplay voted={state.user.voted} vote={userVote} />
              <ConfettiCannon state={state} />
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
                disabled={state.user.voted || state.game.reveal}
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
                {state.user.voted ? "vote locked" : "vote"}
              </Button>
              <Slider
                disabled={state.user.voted}
                key={`slider-${state.user._id}`}
                value={userVote}
                // aria-label="Default"
                // valueLabelDisplay="auto"
                min={gameMarkers.length > 0 ? gameMarkers[0].value : 0}
                max={
                  gameMarkers.length > 0
                    ? gameMarkers[gameMarkers.length - 1].value
                    : 0
                }
                step={null}
                marks={gameMarkers}
                onChange={(e, v) => {
                  setUserVote(v);
                }}
              />
            </div>
          </div>
        </div>
      </>
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
      {vote.toFixed(2)}
    </Paper>
  );
};
