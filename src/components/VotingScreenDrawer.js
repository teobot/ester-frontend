import { useContext } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import CelebrationIcon from "@mui/icons-material/Celebration";
import UndoIcon from "@mui/icons-material/Undo";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { GlobalContext } from "../context/GlobalContext";

export default function VotingScreenDrawer({ open, setDrawer }) {
  const {
    enableConfetti,
    setEnableConfetti,
    MEGAConfetti,
    setMEGAConfetti,
    windowWidth,
    undoVote,
  } = useContext(GlobalContext);

  const undoVoteRequest = async () => {
    await undoVote();
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
            <CelebrationIcon />
          </ListItemIcon>
          <ListItemText id="confetti-toggle" primary="Confetti cannon" />
          <Switch
            edge="end"
            onChange={() => setEnableConfetti(!enableConfetti)}
            checked={enableConfetti}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CelebrationIcon sx={{ color: "#e91e63" }} />
          </ListItemIcon>
          <ListItemText id="mega-confetti-toggle" primary="MEGA confetti" />
          <Switch
            edge="end"
            onChange={() => setMEGAConfetti(!MEGAConfetti)}
            checked={MEGAConfetti}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <UndoIcon />
          </ListItemIcon>
          <ListItemText id="undo-vote-toggle" primary="Undo My Vote" />
          <Button variant="contained" onClick={undoVoteRequest}>
            Undo
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}
