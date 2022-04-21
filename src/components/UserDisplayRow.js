import React from "react";

import { EstimateContext } from "../views/EstimateView";
import { GlobalContext } from "../context/GlobalContext";

import UserDisplaySection from "./UserDisplaySection";
import Border from "./Border";

const UserDisplayRow = ({ voted, user, isLowest, isHighest }) => {
  const { state, kickUser } = React.useContext(GlobalContext);
  const [hover, setHover] = React.useState(false);

  const { estimateBodyHeight, estimateBodyWidth } =
    React.useContext(EstimateContext);

  const generateDisplayNumbers = () => {
    let r = [];
    for (
      let i = state.game.minVote;
      i <= state.game.maxVote;
      i += state.game.step
    )
      r.push(i);
    return r;
  };

  const tileRowOptions = {
    height: estimateBodyHeight / state.game.users.length,
    width: estimateBodyWidth,
  };

  const tileOptions = {
    height: estimateBodyHeight / state.game.users.length > 70 ? 70 : estimateBodyHeight / state.game.users.length,
    width: estimateBodyHeight / state.game.users.length > 70 ? 70 : estimateBodyHeight / state.game.users.length,
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // height: tileRowOptions.height,
        width: tileRowOptions.width,
        padding: "10px 25px",
        boxSizing: "border-box",
        background: "#F8F8F8",
        borderRadius: 20,
      }}
      className="estimate-user-row"
    >
      {hover && (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: "absolute",
            height: tileOptions.height,
            width: tileOptions.width,
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 10,
            fontSize: 26,
            fontWeight: 900,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              kickUser(user._id);
            }}
          >
            kick
          </button>
        </div>
      )}
      <UserDisplaySection
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        key={user._id}
        user={user}
        value={user.name}
        disabled={!(voted || state.game.reveal)}
        tileOptions={tileOptions}
      />
      <Border />
      {generateDisplayNumbers().map((number, index) => (
        <UserDisplaySection
          key={`estimate-user-row-number-${index}`}
          user={user}
          value={number.toFixed(1)}
          disabled={!(number === user.vote && state.game.reveal)}
          tileOptions={tileOptions}
        />
      ))}
    </div>
  );
};

export default UserDisplayRow;
