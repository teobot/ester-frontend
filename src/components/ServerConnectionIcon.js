import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ServerConnectionIcon({ isLoading }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        padding: 6,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 16,
      }}
    >
      {isLoading ? (
        <>
          <b style={{ marginRight: 10 }}>connecting</b>
          <CircularProgress color="primary" style={{ height: 20, width: 20 }} />
        </>
      ) : (
        <>
          <b style={{ marginRight: 10 }}>connected</b>
          <CheckCircleIcon color="success" style={{ height: 24, width: 24 }} />
        </>
      )}
    </div>
  );
}
