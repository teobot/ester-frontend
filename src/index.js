import React from "react";

import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/index.css";

import LandingView from "./views/LandingView";
import EstimateView from "./views/EstimateView";
import JoinView from "./views/JoinView";
import UserJoinView from "./views/UserJoinView";

import GlobalContextProvider from "./content/GlobalContext";

import reportWebVitals from "./reportWebVitals";

const Main = () => {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/join/" element={<JoinView />} />
          <Route path="/join/:joinCode" element={<UserJoinView />} />
          <Route path="/estimate" element={<EstimateView />} />
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
