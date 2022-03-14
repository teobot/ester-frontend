import { useContext, useEffect } from "react";

import "../css/App.css";

import { GlobalContext } from "../context/GlobalContext";

function App() {
  const { hostGame, goToJoinCodeView } = useContext(GlobalContext);

  const buttonStyle = {
    fontSize: 68,
    padding: 5,
    margin: 5,
  };

  return (
    <div className="App">
      <button onClick={goToJoinCodeView} style={buttonStyle}>
        JOIN
      </button>
      <button onClick={hostGame} style={buttonStyle}>
        HOST
      </button>
    </div>
  );
}

export default App;
