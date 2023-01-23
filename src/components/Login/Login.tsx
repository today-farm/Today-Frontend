import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { validateEmail } from '../util/usefulFunctions'
import {
  ComponentWrapper,
  Input,
  InputWrapper,
  Label,
  NonActiveButton,
  SmallLinkButton,
  Error,
} from '../../style/CommonStyles'
import { Links, LoginInputs, Line } from './style'
import { API_URL } from '../../constant'
interface User {
  email: string
  password: string
}

interface errorData {
  emailError: string
  passwordError: string
}

export default function Login() {
  const navigate = useNavigate()
  const [, setCookie] = useCookies<string>(['accessToken'])
  const [info, setInfo] = useState<User>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<errorData>({
    emailError: '',
    passwordError: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (!validateEmail(e.target.value)) {
        setError((prev) => ({
          ...prev,
          emailError: '올바르지 않은 이메일 형식이에요! 다시 확인해 주세요.',
        }))
      } else {
        setError((prev) => ({
          ...prev,
          emailError: '',
        }))
        setInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
    } else if (e.target.name === 'password') {
      setInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const handleLogin = () => {
    axios
      .post(`${API_URL}/login`, info)
      .then((res) => {
        let refreshToken: string = res.headers['authorization-refresh']!
        let accessToken = res.headers.authorization
        let userId = res.data.userId
        localStorage.setItem('userId', userId)
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setError((prev) => ({
          ...prev,
          emailError: '',
          passwordError: '',
        }))
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setError((prev) => ({
          ...prev,
          emailError: '가입되지 않은 이메일이에요! 다시 확인해 주세요.',
          passwordError: '비밀번호가 잘못되었어요! 다시 확인해 주세요.',
        }))
      })
  }

  return (
    <ComponentWrapper>
      <LoginInputs>
        <InputWrapper>
          <Label>이메일</Label>
          <Input
            type="text"
            placeholder="이메일을 입력해 주세요."
            name="email"
            onChange={handleChange}
          />
          <Error>{error.emailError}</Error>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            name="password"
            onChange={handleChange}
          />
          <Error>{error.passwordError}</Error>
        </InputWrapper>
      </LoginInputs>
      <NonActiveButton onClick={handleLogin}>로그인</NonActiveButton>
      <Links>
        <Link to="/signup">
          <SmallLinkButton>회원가입</SmallLinkButton>
        </Link>
        <Line>|</Line>
        <Link to="/find/password">
          <SmallLinkButton>비밀번호 찾기</SmallLinkButton>
        </Link>
      </Links>
    </ComponentWrapper>
  )
}
