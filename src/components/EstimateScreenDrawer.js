import { useContext, useState } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import SystemSecurityUpdateIcon from "@mui/icons-material/SystemSecurityUpdate";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { GlobalContext } from "../context/GlobalContext";

export default function EstimateScreenDrawer({ open, setDrawer }) {
  const { state, windowWidth, updateGame, forceUpdate } =
    useContext(GlobalContext);
  const [stepState, setStepState] = useState(state.game.step);
  const [minState, setMinState] = useState(state.game.minVote);
  const [maxState, setMaxState] = useState(state.game.maxVote);

  const onSave = async () => {
    if (stepState !== state.game.step) {
      await updateGame("setStep", stepState);
    }

    if (minState !== state.game.minVote) {
      await updateGame("setMin", minState);
    }

    if (maxState !== state.game.maxVote) {
      await updateGame("setMax", maxState);
    }
  };

  return (
    <Drawer
      key="voting-drawer"
      anchor="right"
      open={open}
      onClose={() => setDrawer(false)}
    >
      <List
        sx={{ width: windowWidth > 900 ? "30vw" : "60vw", maxWidth: "98vw" }}
        subheader={<ListSubheader>Settings</ListSubheader>}
      >
        <ListItem>
          <ListItemIcon>
            <HikingOutlinedIcon />
          </ListItemIcon>
          <ListItemText id="step-input" primary="Vote step" />
          <TextField
            value={stepState}
            id="outlined-basic"
            label="Step"
            variant="outlined"
            type="number"
            onChange={(e) => setStepState(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArrowCircleDownOutlinedIcon />
          </ListItemIcon>
          <ListItemText id="vote-min-input" primary="Vote minimum" />
          <TextField
            value={minState}
            id="outlined-basic"
            label="Minimum"
            variant="outlined"
            type="number"
            onChange={(e) => setMinState(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArrowCircleUpOutlinedIcon />
          </ListItemIcon>
          <ListItemText id="vote-max-input" primary="Vote maximum" />
          <TextField
            value={maxState}
            id="outlined-basic"
            label="Maximum"
            variant="outlined"
            type="number"
            onChange={(e) => setMaxState(e.target.value)}
          />
        </ListItem>
        <ListItem style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" onClick={onSave}>
            Save
          </Button>
        </ListItem>
        <br />
        <Divider light={true}/>
        <br />
        <ListItem>
          <ListItemIcon>
            <SystemSecurityUpdateIcon />
          </ListItemIcon>
          <ListItemText id="force-update-button" primary="Force Update Users" />
          <Button variant="outlined" color="primary" onClick={forceUpdate}>
            Update
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}
