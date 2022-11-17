import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Withdraw from "./components/Withdraw";
import TodayPost from "./components/Today";
import Edit from "./components/Edit";

function App() {
  // const [cookies, removeCookie] = useCookies(["accessToken"]);
  // const [hasCookie, setHasCookie] = useState(false);
  // useEffect(() => {
  //   if (cookies.accessToken && cookies.accessToken !== "undefined") {
  //     setHasCookie(true);
  //   }
  // }, [cookies]);

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          {/* {!hasCookie ? <Route path="/login" /> : <Route path="/" />} */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/" element={<p>메인페이지입니다.</p>} />
          <Route path="/post" element={<TodayPost />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="*" element={<p>여기는 없는 페이지입니다😢</p>} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
