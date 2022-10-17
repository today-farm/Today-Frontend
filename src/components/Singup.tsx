import React, { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
// import { Link } from "react-router-dom";
//import useInput from "@hooks/useInput";

function Singup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSignup = useCallback(() => {
    setSignUpError("");
    setSignUpSuccess(false);

    return axios({
      method: "post",
      url: `/sign-up`,
      data: {
        email,
        password,
        nickname,
      },
    })
      .then((res) => {
        // 성공시
        console.log(res);
        setSignUpSuccess(true);
        console.log(email, password, nickname);
        console.log("서버로 회원가입하기");
      })
      .catch((err) => {
        // 실패시
        console.log(err.res);
        setSignUpError(err.res.data);
      })
      .finally(() => {});
  }, [email, password, nickname]);

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
      <input
        type="nickname"
        placeholder="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleSignup}>회원가입</button>
    </>
  );
}

export default Singup;
