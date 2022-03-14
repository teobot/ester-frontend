import { useContext, useRef, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../content/GlobalContext";

import GetDimensions from "../helpers/GetDimensions";

import UserDisplayRow from "../components/UserDisplayRow";

import QRCode from "react-qr-code";

export const EstimateContext = createContext();

export default function EstimateView() {
  const { gameData } = useContext(GlobalContext);

  const estimateRef = useRef();

  const { width: estimateBodyWidth, height: estimateBodyHeight } =
    GetDimensions(estimateRef);

  useEffect(() => {
    console.log(gameData);
  }, []);

  if (!gameData) {
    return null;
  } else {
    return (
      <div id="estimate-container">
        <div id="estimate-header">
          <div id="estimate-header-left">
            <button>Reveal</button>
            <button>Revote</button>
          </div>
          <div id="estimate-header-right">
            <div>
              <QRCode
                value={window.location.origin + `/join/abc123`}
                size={215}
              />
              <div className="qr-code-subtext">abc123</div>
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
            {gameData.users.map((user, index) => (
              <UserDisplayRow
                voted={true}
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
