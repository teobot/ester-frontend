import React from "react";

import { EstimateContext } from "../views/EstimateView";
import { GlobalContext } from "../content/GlobalContext";

import UserDisplaySection from "./UserDisplaySection";
import Border from "./Border";

const UserDisplayRow = ({ voted, user: user2 }) => {
  const { minEstimate, maxEstimate } = React.useContext(GlobalContext);

  const { estimateBodyHeight, estimateBodyWidth } =
    React.useContext(EstimateContext);

  let colors = [
    "#EDB9B9",
    "#EDE8B9",
    "#E6B9ED",
    "#BDB9ED",
    "#B9EDBE",
    "#B9DDED",
  ];

  const user = {
    name: "theo",
    vote: 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  };

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
      }}
      className="estimate-user-row"
    >
      <UserDisplaySection disabledColor={user.color} user={user} value={"TC"} disabled={true} />
      <Border />
      {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((number, index) => (
        <UserDisplaySection
          user={user}
          value={number}
          disabled={number !== user.vote}
        />
      ))}
    </div>
  );
};

export default UserDisplayRow;
