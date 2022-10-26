import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [cookies, setCookie, getCookie] = useCookies<string>(["accessToken"]);
  const handleLogin = () => {
    return axios({
      method: "post",
      url: `/login`,
      data: {
        email,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("로그인 성공!");
        console.log(res);
        let accessToken = res.headers.authorization;
        setCookie("accessToken", accessToken);
        // TODO: refresh-token 추가해야함
        // localStorage.setItem("refreshToken", refreshToken);
        setLoginSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!isLoginSuccess && (
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
      )}
      {isLoginSuccess && <Navigate to="/" />}
    </>
  );
}

export default Login;
