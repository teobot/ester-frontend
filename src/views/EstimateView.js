import { useContext, useRef, useEffect, createContext } from "react";

import { GlobalContext } from "../context/GlobalContext";

import GetDimensions from "../helpers/GetDimensions";

import UserDisplayRow from "../components/UserDisplayRow";

import QRCode from "react-qr-code";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const { io } = require("socket.io-client");

export const EstimateContext = createContext();

export default function EstimateView() {
  const { state, reveal, revote, amountUsersVoted, amountUsersPresent } =
    useContext(GlobalContext);

  const estimateRef = useRef();

  const { width: estimateBodyWidth, height: estimateBodyHeight } =
    GetDimensions(estimateRef);

  return (
    <div id="estimate-container">
      <div id="estimate-header">
        <div id="estimate-header-left">
          <h2 className="roboto">Game Details</h2>
          <Button onclick={reveal} text="Reveal" active={state.game.reveal} />
          <Button
            onclick={revote}
            text={`Revote - ${amountUsersVoted} of ${amountUsersPresent} have voted`}
            active={state.game.revote}
          />
          {/* <Button onclick={refreshGameData} text="Refresh" active={false} /> */}
        </div>
        <div id="estimate-header-left">
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbarWithChildren
              value={(amountUsersVoted / amountUsersPresent) * 100}
            >
              <div
                style={{ fontSize: "100%", marginTop: -5 }}
                className="roboto"
              >
                <strong>
                  {amountUsersVoted} of {amountUsersPresent}
                </strong>{" "}
                have voted
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

const Button = ({ onclick, text, active }) => {
  return (
    <button
      className="roboto"
      style={{
        backgroundColor: active ? "#E6B9ED" : "white",
      }}
      onClick={() => {
        onclick();
      }}
    >
      {text}
    </button>
  );
};
