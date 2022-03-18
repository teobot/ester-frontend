import { useContext, useRef, createContext } from "react";

import { Navigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

import GetDimensions from "../helpers/GetDimensions";

import UserDisplayRow from "../components/UserDisplayRow";

import QRCode from "react-qr-code";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import Button from "@mui/material/Button";

import "react-circular-progressbar/dist/styles.css";

export const EstimateContext = createContext();

export default function EstimateView() {
  const {
    state,
    reveal,
    revote,
    amountUsersVoted,
    amountUsersPresent,
    sortByVote,
  } = useContext(GlobalContext);

  const estimateRef = useRef();

  const { width: estimateBodyWidth, height: estimateBodyHeight } =
    GetDimensions(estimateRef);

  const revoteMessage = () => {
    if (state.game.reveal) {
      return "Click to cast revote";
    }
    if (amountUsersPresent === 0) {
      return "No one is here to vote.";
    } else if (amountUsersVoted === 0) {
      return "No one has voted yet.";
    }
    if (amountUsersVoted === amountUsersPresent) {
      return "All users have voted.";
    } else {
      return "Not everyone has voted yet.";
    }
  };

  const revealMessage = () => {
    if (amountUsersPresent === 0) {
      return "Nothing to reveal";
    }
    if (amountUsersVoted === amountUsersPresent) {
      return "Click to reveal player votes";
    } else {
      return "Waiting for all users to vote";
    }
  };

  const progressChartMessage = () => {
    let percentage = Math.round(
      state.game.users.reduce((acc, user) => {
        return acc + user.vote;
      }, 0) / state.game.users.length
    );
    if (state.game.reveal) {
      if (percentage) {
        // display the average vote
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Average vote:
            <br />
            <b
              style={{
                fontSize: "2em",
              }}
            >
              {/* round to 2 decimal places */}
              {percentage.toFixed(2)}
            </b>
          </div>
        );
      } else {
        return "Votes are revealed";
      }
    }
    if (amountUsersPresent === 0) {
      return <>Waiting for players</>;
    }
    if (amountUsersVoted === amountUsersPresent) {
      return "Everyone has voted";
    } else {
      return (
        <>
          <strong>
            {amountUsersVoted} of {amountUsersPresent}
          </strong>{" "}
          have voted
        </>
      );
    }
  };

  if (!state.user || !state.game) {
    // : redirect to landing page
    return <Navigate to="/" />;
  } else {
    return (
      <div id="estimate-container">
        <div id="estimate-header">
          <div id="estimate-header-left">
            <div className="game-button-container">
              <Button
                fullWidth
                variant="contained"
                disabled={state.game.reveal || amountUsersPresent === 0}
                onClick={reveal}
                size="large"
                color={
                  amountUsersVoted === amountUsersPresent &&
                  amountUsersPresent !== 0
                    ? "success"
                    : "secondary"
                }
              >
                {revealMessage()}
              </Button>
              <Button
                fullWidth
                variant="contained"
                disabled={!state.game.reveal}
                onClick={revote}
                size="large"
                color="secondary"
              >
                {revoteMessage()}
              </Button>
            </div>
          </div>
          <div id="estimate-header-center">
            <div style={{ width: 175, height: 175 }}>
              <CircularProgressbarWithChildren
                styles={{
                  path: {
                    stroke:
                      amountUsersVoted === amountUsersPresent &&
                      amountUsersPresent !== 0
                        ? "#66bb6a"
                        : "#3e98c7",
                  },
                }}
                value={(amountUsersVoted / amountUsersPresent) * 100}
              >
                <div
                  style={{ fontSize: "90%", marginTop: -5 }}
                  className="roboto"
                >
                  {progressChartMessage()}
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div id="estimate-header-right">
            <QRCode
              value={window.location.origin + `/join/${state.game.joinCode}`}
              size={150}
            />
            <div className="qr-code-subtext">{state.game.joinCode}</div>
          </div>
        </div>
        <EstimateContext.Provider
          value={{ estimateBodyWidth, estimateBodyHeight }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            ref={estimateRef}
            id="estimate-body"
          >
            {/* Make a array of 5 items */}
            {state?.game.users.sort(sortByVote).map((user, index) => (
              <UserDisplayRow
                isLowest={index === 0}
                isHighest={index === state.game.users.length - 1}
                voted={user.voted}
                key={`estimate-user-row-${index}`}
                user={user}
              />
            ))}
          </div>
        </EstimateContext.Provider>
      </div>
    );
  }
}
