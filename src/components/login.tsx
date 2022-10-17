import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // import express = require("express");
// let app: express.Application = express();
// ADD THIS
// var cors = require("cors");
// app.use(cors());

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    return axios({
      method: "post",
      // ip: "port",
      url: `/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log("로그인 성공!");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Email-ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </>
  );
}

export default Login;
