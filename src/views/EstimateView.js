import { useContext, useRef, createContext, useState } from "react";

import { Navigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

import GetDimensions from "../helpers/GetDimensions";

import UserDisplayRow from "../components/UserDisplayRow";

import QRCode from "react-qr-code";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SettingsIcon from "@mui/icons-material/Settings";

import "react-circular-progressbar/dist/styles.css";
import EstimateScreenDrawer from "../components/EstimateScreenDrawer";

import ScaleText from "react-scale-text";

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
  const headerRef = useRef();

  const { width: estimateBodyWidth, height: estimateBodyHeight } =
    GetDimensions(estimateRef);

  const { width: headerWidth, height: headerHeight } = GetDimensions(headerRef);

  const [drawer, setDrawer] = useState(false);

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
    let userCount = 0;
    const voteAccumulator = state.game.users.reduce((acc, user) => {
      userCount++;
      return acc + user.vote;
    }, 0);
    const voteAverage = voteAccumulator / userCount;

    if (state.game.reveal) {
      // display the average vote
      return (
        <>
          Average vote:
          <b
            style={{
              fontSize: "2em",
            }}
          >
            {/* round to 2 decimal places */}
            {voteAverage.toFixed(2)}
          </b>
        </>
      );
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
      <>
        <SettingsIcon
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 5,
            cursor: "pointer",
          }}
          onClick={() => setDrawer(true)}
        />
        <EstimateScreenDrawer open={drawer} setDrawer={setDrawer} />
        <div id="estimate-container">
          <div id="estimate-header" ref={headerRef}>
            <div id="estimate-header-left">
              <div className="game-button-container">
                <Grid container spacing={2} className="h-100">
                  <Grid item xs={6} className="h-100">
                    <Button
                      className="h-100"
                      fullWidth
                      variant="contained"
                      disabled={state.game.reveal || amountUsersPresent === 0}
                      onClick={reveal}
                      color={
                        amountUsersVoted === amountUsersPresent &&
                        amountUsersPresent !== 0
                          ? "success"
                          : "secondary"
                      }
                    >
                      {revealMessage()}
                    </Button>
                  </Grid>
                  <Grid className="h-100" item xs={6}>
                    <Button
                      fullWidth
                      className="h-100"
                      variant="contained"
                      disabled={!state.game.reveal}
                      onClick={revote}
                      color="secondary"
                    >
                      {revoteMessage()}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div id="estimate-header-center" style={{ position: "relative" }}>
              <div
                style={{
                  height: headerHeight / 1.1,
                  width: headerHeight / 1.1,
                }}
              >
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
                    id="chart-wrapper"
                    style={{ marginTop: -5 }}
                    className="roboto"
                  >
                    <ScaleText minFontSize={16}>
                      {progressChartMessage()}
                    </ScaleText>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div id="estimate-header-right">
              <QRCode
                value={window.location.origin + `/join/${state.game.joinCode}`}
                size={headerHeight * 0.7}
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
                justifyContent:
                  state?.game.users.length > 5 ? "space-between" : "flex-start",
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
      </>
    );
  }
}
