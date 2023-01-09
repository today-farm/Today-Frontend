//JSON 데이터와 File 데이터를 함께 보내기 위해선 Multipart/form-data를 이용하면 될 것!
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ComponentWrapper } from '../../style/CommonStyles';
import EmailPassword from './EmailPassword/EmailPassword';
import Profile from './Profile/Profile';
import { User } from '../Interface';

function Signup() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [openProfilePage, setOpenProfilePage] = useState<boolean>(false);
  const [info, setInfo] = useState<User>({
    email: '',
    password: '',
    nickname: '',
  });

  const handleSignup = async () => {
    const formData = new FormData();
    if (info.nickname === '' || info.email === '' || info.password === '') {
      alert('빠진 정보가 없는지 확인해주세요!');
    }
    if (file) {
      await formData.append('profileImg', file);
    }
    await formData.append(
      'userSignUpRequestDto',
      new Blob([JSON.stringify(info)], { type: 'application/json' })
    );

    return axios({
      method: 'post',
      url: `/sign-up`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        // console.log(res.data);
        console.log('서버로 회원가입하기');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ComponentWrapper>
      {!openProfilePage ? (
        <EmailPassword
          info={info}
          setInfo={setInfo}
          setOpenProfilePage={setOpenProfilePage}
        />
      ) : (
        <Profile
          info={info}
          setInfo={setInfo}
          setFile={setFile}
          handleSignup={handleSignup}
        />
      )}
    </ComponentWrapper>
  );
}
export default Signup;
