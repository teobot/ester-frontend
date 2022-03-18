import { useEffect, useState, useContext } from "react";

import { useParams } from "react-router";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { GlobalContext } from "../context/GlobalContext";

import wave from "../images/wave.png";
import ServerConnectionIcon from "../components/ServerConnectionIcon";

export default function JoinCodeView() {
  const { joinGame, windowWidth, isLoading, wakeUpRequest } =
    useContext(GlobalContext);

  let { code } = useParams();

  const [joinCode, setJoinCode] = useState(code || "");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    wakeUpRequest();
  }, []);

  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
      <ServerConnectionIcon isLoading={isLoading} />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          borderRadius: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            width: "100%",
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            style={{
              fontWeight: "bold",
              fontSize: windowWidth / 15 + 100,
            }}
          >
            Join <br /> Game
          </Typography>
        </div>
        {!code && (
          <>
            <TextField
              size="large"
              label="Join Code"
              color="info"
              focused
              fullWidth
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              disabled={isLoading}
            />
            <br />
          </>
        )}

        <TextField
          size="large"
          label="Enter username"
          color="secondary"
          focused
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <IconButton
          onClick={handleJoinGame}
          color="secondary"
          component="span"
          size="large"
          disabled={isLoading}
        >
          <LoginOutlinedIcon style={{ fontSize: 48 }} />
        </IconButton>
      </Container>
    </Container>
  );
}
