import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Singup";
import Singup from "./components/Singup";
function App() {
  return (
    <BrowserRouter>
      <section>
        <Singup></Singup>
        <br></br>
        <Login></Login>
        {/* <Routes {path} ="/login" element={<Login />}></Routes> */}
      </section>
    </BrowserRouter>
  );
}

export default App;
