import { useState } from "react";
import styled from "styled-components";
import axios, { AxiosError } from "axios"; // import express = require("express");
import { useCookies } from "react-cookie";

function Withdraw() {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  // const COOKIE_KEY = window.LOGIN_KEY;
  const [cookies, setCookie, removeCookie] = useCookies([
    "email",
    "accessToken",
    "password",
  ]);

  const handleIsOk = () => {
    setIsOk((curr) => !curr);
  };

  const handleSubmit = () => {
    return axios({
      method: "post",
      url: `/user/withdraw`,
      data: {
        currentPassword: password,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => {
        removeCookie("accessToken");

        // localStorage.removeItem("refresh-token");
        console.log("탈퇴 성공!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!isOk ? (
        <>
          <p>탈퇴 후 복구할 수 없습니다.</p>
          <p>탈퇴 하시겠습니까?</p>
          <button onClick={handleIsOk}>탈퇴하기</button>
        </>
      ) : (
        <>
          <p>회원 탈퇴를 위해서 비밀번호를 입력해주세요.</p>
          <input
            id="userPassword"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleIsOk}>취소하기</button>
          <button onClick={handleSubmit}>탈퇴하기</button>
        </>
      )}
    </>
  );
}

export default Withdraw;
