import { useContext } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "../css/App.css";

import { GlobalContext } from "../context/GlobalContext";

import wave from "../images/wave.png";

function App() {
  const { hostGame, goToJoinCodeView } = useContext(GlobalContext);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F0F0",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          width: "100%",
          height: "75%",
          backgroundImage: `url(${wave})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "rotate(180deg)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          style={{
            fontSize: "18vw",
            fontWeight: "bold",
          }}
        >
          Estr
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#E0E0E0",
            padding: 8,
            borderRadius: 10,
          }}
        >
          <ActionButton
            onClick={goToJoinCodeView}
            color="secondary"
            content={"Join"}
          />
          <ActionButton onClick={hostGame} color="info" content={"Host"} />
        </div>
      </div>
    </div>
  );
}

const ActionButton = ({ content, onClick, color }) => {
  return (
    <Button
      style={{
        borderRadius: 10,
        width: 180,
        height: 75,
        fontSize: "225%",
      }}
      onClick={onClick}
      variant="contained"
      color={color}
    >
      {content}
    </Button>
  );
};

export default App;
