//JSON 데이터와 File 데이터를 함께 보내기 위해선 Multipart/form-data를 이용하면 될 것!

import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EmailAuth from '../EmailAuth/EmailAuth';
import {
  // SignupWrapper,
  Header,
  // BigButton,
  BackIcon,
  Inputs,
  InputWrapper,
  Input,
  Label,
  EmailInput,
  // FindPassword,
} from './style';

import {
  ComponentWrapper,
  NonActiveButton,
  NonActiveSmallButton,
  SmallLinkButton,
  Title,
} from '../../style/CommonStyles';

interface User {
  email: string;
  password: string;
  nickname: string;
}

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isJoinSuccess, setJoinSuccess] = useState<boolean>(false);
  const [emailAuthOpen, setEmailAuthOpen] = useState(false);

  // catch error // file type 정해주기 - catch error
  const [file, setFile] = useState<File | null>(null);

  //e의 타입 React.ChangeEvent<HTMLInputElement>
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const emailAuthClose = () => {
    setEmailAuthOpen(false);
  };

  const handleSignup = useCallback(async () => {
    if (!file) return;

    const formData = new FormData();

    await formData.append('profileImg', file);

    const User: User = {
      email: email,
      password: password,
      nickname: nickname,
    };

    // catch error // 블랍과 뒤에 type 명시해주어야함!!!!!!
    await formData.append(
      'signUpRequestDto',
      new Blob([JSON.stringify(User)], { type: 'application/json' })
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
        console.log(res.data);
        console.log('서버로 회원가입하기');
        setJoinSuccess(true);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }, [file]);

  return (
    <>
      {!isJoinSuccess && (
        <ComponentWrapper>
          <Header>
            <BackIcon alt='icon_back' src='img/icon_back.png'></BackIcon>
            <Title>회원가입</Title>
          </Header>
          <Inputs>
            <InputWrapper>
              <Label>이메일</Label>
              <EmailInput>
                <Input
                  type='text'
                  placeholder='이메일을 입력해 주세요.'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <NonActiveSmallButton
                  onClick={() => {
                    setEmailAuthOpen(true);
                  }}
                >
                  인증
                </NonActiveSmallButton>
              </EmailInput>
              {emailAuthOpen && <EmailAuth emailAuthClose={emailAuthClose} />}
            </InputWrapper>
            <InputWrapper>
              <Label>비밀번호</Label>
              <Input
                type='password'
                placeholder='비밀번호를 입력해 주세요.'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>비밀번호 확인</Label>
              <Input
                type='password'
                placeholder='비밀번호를 한 번 더 입력해 주세요.'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
            {/* <input
              type='nickname'
              placeholder='nickname'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            /> */}
          </Inputs>
          {/* <input type={'file'} onChange={handleFile} /> */}
          <NonActiveButton onClick={handleSignup}>회원가입</NonActiveButton>
          <Link to='/find/password'>
            <SmallLinkButton>비밀번호 찾기</SmallLinkButton>
          </Link>
        </ComponentWrapper>
      )}
      {isJoinSuccess && (
        <>
          <p>회원가입을 축하합니다!</p>
          <Link to='/login'>로그인</Link>
        </>
      )}
    </>
  );
}
export default Signup;
