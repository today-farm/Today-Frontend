import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/FormSignup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/withdraw" element={<Withdraw />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
