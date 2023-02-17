import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import {
  ComponentWrapper,
  Input,
  InputWrapper,
  Label,
  NonActiveButton,
  SmallLinkButton,
  Error,
  ClearButton,
} from '../../style/CommonStyles'
import { Logo, Links, LoginInputs, Line } from './style'
import { API_URL } from '../../constant'
import { ActiveButton } from './../../style/CommonStyles'
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from './../../Route'
import { emailRegex } from '../util/usefulFunctions'
import { useForm } from 'react-hook-form'

interface errorData {
  emailError: string
  passwordError: string
}

interface IForm {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const [, setCookie] = useCookies<string>(['accessToken'])
  const [error, setError] = useState<errorData>({
    emailError: '',
    passwordError: '',
  })

  const handleLogin = () => {
    axios
      .post(`${API_URL}/login`, {
        email: watch('email'),
        password: watch('password'),
      })
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
        navigate(PRIVATE_ROUTE.FARM.path)
      })
      .catch((err) => {
        setError((prev) => ({
          ...prev,
          emailError: '가입되지 않은 이메일이에요! 다시 확인해 주세요.',
          passwordError: '비밀번호가 잘못되었어요! 다시 확인해 주세요.',
        }))
      })
  }

  return (
    <ComponentWrapper>
      <Logo src="img/logo.png" />
      <LoginInputs>
        <InputWrapper>
          <Label>이메일</Label>
          <Input
            type="text"
            placeholder="이메일을 입력해 주세요."
            value={watch('email')}
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: emailRegex,
                message: '올바르지 않은 이메일 형식이에요! 다시 확인해 주세요.',
              },
            })}
          />
          {watch('email') !== '' && (
            <ClearButton
              src="/img/icons/icon_input_delete.png"
              onClick={() => {
                reset({
                  email: '',
                })
                setError((prev) => ({
                  ...prev,
                  emailError: '',
                }))
              }}
            />
          )}
          <Error>{errors?.email?.message}</Error>
          {!errors?.email?.message && <Error>{error?.emailError}</Error>}
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            {...register('password', {
              required: '비밀번호를 입력해주세요!',
            })}
          />
          {watch('password') !== '' && (
            <ClearButton
              src="/img/icons/icon_input_delete.png"
              onClick={() => {
                reset({
                  password: '',
                })
                setError((prev) => ({
                  ...prev,
                  passwordError: '',
                }))
              }}
            />
          )}
          <Error>{errors?.password?.message}</Error>
          {!errors?.password?.message && <Error>{error?.passwordError}</Error>}
        </InputWrapper>
      </LoginInputs>
      {watch('email') !== '' &&
      watch('password') !== '' &&
      errors?.email?.message === undefined &&
      errors?.password?.message === undefined ? (
        <ActiveButton onClick={handleLogin}>로그인</ActiveButton>
      ) : (
        <NonActiveButton onClick={handleLogin}>로그인</NonActiveButton>
      )}
      <Links>
        <Link to={PUBLIC_ROUTE.SIGNUP.path}>
          <SmallLinkButton>회원가입</SmallLinkButton>
        </Link>
        <Line>|</Line>
        <Link to={PUBLIC_ROUTE.FIND_PASSWORD.path}>
          <SmallLinkButton>비밀번호 찾기</SmallLinkButton>
        </Link>
      </Links>
    </ComponentWrapper>
  )
}
