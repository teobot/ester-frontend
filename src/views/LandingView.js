import { useContext } from "react";

import "../css/App.css";

import { GlobalContext } from "../content/GlobalContext";

function App() {
  const { hostGame, joinGame } = useContext(GlobalContext);

  const buttonStyle = {
    fontSize: 68,
    padding: 5,
    margin: 5,
  };

  return (
    <div className="App">
      <button onClick={joinGame} style={buttonStyle}>
        JOIN
      </button>
      <button onClick={hostGame} style={buttonStyle}>
        HOST
      </button>
    </div>
  );
}

export default App;
