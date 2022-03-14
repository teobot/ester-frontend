import React from "react";

import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/index.css";

import LandingView from "./views/LandingView";
import EstimateView from "./views/EstimateView";
import JoinCodeView from "./views/JoinCodeView";
import UserJoinView from "./views/UserJoinView";
import UserVotingView from "./views/UserVotingView";

import GlobalContextProvider from "./context/GlobalContext";

import reportWebVitals from "./reportWebVitals";

const Main = () => {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/join/" element={<JoinCodeView />} />
          <Route path="/join/:code" element={<JoinCodeView />} />
          <Route path="/estimate" element={<EstimateView />} />
          <Route path="/voting" element={<UserVotingView />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
