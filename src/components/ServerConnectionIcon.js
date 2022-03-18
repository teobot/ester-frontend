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
        width: "8%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        fontSize: 16,
      }}
    >
      {isLoading ? (
        <>
          <b>connecting</b>
          <CircularProgress color="primary" style={{ height: 20, width: 20 }} />
        </>
      ) : (
        <>
          <b>connected</b>
          <CheckCircleIcon color="success" style={{ height: 24, width: 24 }} />
        </>
      )}
    </div>
  );
}
