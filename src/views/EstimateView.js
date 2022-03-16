import { useContext, useRef, useEffect, createContext } from "react";

import { Navigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

import GetDimensions from "../helpers/GetDimensions";

import UserDisplayRow from "../components/UserDisplayRow";

import QRCode from "react-qr-code";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import Button from "@mui/material/Button";

import "react-circular-progressbar/dist/styles.css";
import { Typography } from "@mui/material";

export const EstimateContext = createContext();

export default function EstimateView() {
  const { state, reveal, revote, amountUsersVoted, amountUsersPresent } =
    useContext(GlobalContext);

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
    if(state.game.reveal) {
      return "Reveal in progress";
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
            <Button
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
              variant="contained"
              disabled={!state.game.reveal}
              onClick={revote}
              size="large"
              color="secondary"
            >
              {revoteMessage()}
            </Button>
          </div>
          <div id="estimate-header-left">
            <div style={{ width: 200, height: 200 }}>
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
                  style={{ fontSize: "100%", marginTop: -5 }}
                  className="roboto"
                >
                  {progressChartMessage()}
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div id="estimate-header-right">
            <div>
              <QRCode
                value={window.location.origin + `/join/${state.game.joinCode}`}
                size={215}
              />
              <div className="qr-code-subtext">{state.game.joinCode}</div>
            </div>
          </div>
        </div>
        <EstimateContext.Provider
          value={{ estimateBodyWidth, estimateBodyHeight }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            ref={estimateRef}
            id="estimate-body"
          >
            {/* Make a array of 5 items */}
            {state?.game.users.map((user, index) => (
              <UserDisplayRow
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

// const Button = ({ onclick, text, active }) => {
//   return (
//     <button
//       className="roboto"
//       style={{
//         backgroundColor: active ? "#E6B9ED" : "white",
//       }}
//       onClick={() => {
//         onclick();
//       }}
//     >
//       {text}
//     </button>
//   );
// };
