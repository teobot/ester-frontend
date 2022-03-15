import React from "react";
import { useParams } from "react-router";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { GlobalContext } from "../context/GlobalContext";

import wave from "../images/wave.png";

export default function JoinCodeView() {
  const { joinGame, windowHeight, windowWidth } =
    React.useContext(GlobalContext);

  let { code } = useParams();

  const [joinCode, setJoinCode] = React.useState(code || "");
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");

  const handleJoinGame = async () => {
    if (joinCode.length === 0) {
      setError("Please enter a code.");
      return;
    }

    if (username.length === 0) {
      setError("Please enter a username.");
      return;
    }

    const res = await joinGame(joinCode, username);
    
    if (res) {
      setError(error);
    }
  };

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
          height: "70%",
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
          alignItems: "flex-start",
          zIndex: 2,
          height: "70%",
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          style={{
            fontSize:
              windowWidth < 1600
                ? windowWidth > 600
                  ? "calc(5vw + 100px)"
                  : 75
                : 175,
            fontWeight: "bold",
          }}
        >
          Join
          <br />
          Game
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: 8,
            borderRadius: 10,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent:
                windowWidth < 400 ? "space-between" : "space-evenly",
            }}
          >
            {!code && (
              <TextField
                size="large"
                label="Join Code"
                color="info"
                focused
                fullWidth
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
            )}
            <TextField
              size="large"
              label="Enter username"
              color="secondary"
              focused
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <IconButton
              onClick={handleJoinGame}
              color="secondary"
              component="span"
              size="large"
            >
              <LoginOutlinedIcon style={{ fontSize: 48 }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
