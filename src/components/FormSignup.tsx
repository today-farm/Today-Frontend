import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const FormSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const handleFormSignup = async () => {
    let formData = new FormData();

    let signUpRequestDto = {
      email: email,
      password: password,
      nickname: nickname,
    };

    formData.append("signUpRequestDto", JSON.stringify(signUpRequestDto));
    formData.append("profileImg", profileImg);

    await axios({
      method: "POST",
      url: `/sign-up`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
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
      <input
        type="nickname"
        placeholder="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="file"
        name="imgUpload"
        accept="image/*"
        onChange={(e) => setProfileImg(e.target.value)}
      />
      <button onClick={handleFormSignup}>회원가입</button>
    </>
  );
};

export default FormSignup;
