import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import Login from "./components/Login";
import Signup from "./components/FormSignup";
import Withdraw from "./components/Withdraw";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/" element={<p>메인페이지입니다.</p>} />
          <Route path="*" element={<p>여기는 없는 페이지입니다😢</p>} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
