import React from "react";
import { useParams } from "react-router";

import { GlobalContext } from "../context/GlobalContext";

export default function JoinCodeView() {
  const { joinGame } = React.useContext(GlobalContext);

  let { code } = useParams();

  const [joinCode, setJoinCode] = React.useState(code || "");
  const [username, setUsername] = React.useState("Theo");

  return (
    <div>
      <h1>Join Code</h1>
      <label>JoinCode</label>
      <input
        type="text"
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value)}
      />
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => joinGame(joinCode, username)}>Join</button>
    </div>
  );
}
