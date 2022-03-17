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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: estimateBodyHeight / 6,
        width: estimateBodyWidth,
        padding: "15px 25px",
        boxSizing: "border-box",
        background: "#F8F8F8",
        borderRadius: 20,
        position: "relative",
      }}
      className="estimate-user-row"
    >
      {hover && (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: "absolute",
            height: 70,
            width: 70,
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
      />
      <Border />
      {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((number, index) => (
        <UserDisplaySection
          key={`estimate-user-row-number-${index}`}
          user={user}
          value={number}
          disabled={!(number === user.vote && state.game.reveal)}
        />
      ))}
    </div>
  );
};

export default UserDisplayRow;
