import React, { useState, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";
// import { Link } from "react-router-dom";
//import useInput from "@hooks/useInput";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [fileImage, setFileImage] = useState("");

  // 파일 저장
  const saveFileImage = (e: any) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

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
      <h1>이미지 미리보기</h1>
      <img
        alt="sample"
        src={fileImage}
        style={{ width: "50px", height: "300px" }}
      />
      <input
        type="file"
        name="imgUpload"
        accept="image/*"
        onChange={saveFileImage}
      />
      <button onClick={() => deleteFileImage()}>삭제</button>
      <button onClick={handleSignup}>회원가입</button>
    </>
  );
}

export default Signup;
