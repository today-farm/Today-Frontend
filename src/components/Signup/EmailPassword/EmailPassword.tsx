//JSON 데이터와 File 데이터를 함께 보내기 위해선 Multipart/form-data를 이용하면 될 것!
import React, { useState, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../util/usefulFunctions'
import { EmailInput, EmailAuthInput } from './style'
import {
  ComponentWrapper,
  NonActiveButton,
  ActiveButton,
  NonActiveSmallButton,
  SmallLinkButton,
  Title,
  ActiveSmallButton,
  Inputs,
  Input,
  Label,
  InputWrapper,
  Error,
  Success,
} from '../../../style/CommonStyles'
import Timer from '../Timer/Timer'
import { User, errorData } from '../../Interface'
import Header from '../../Header/Header'
import { API_URL } from '../../../constant'
interface Iprops {
  info: User
  setInfo: Dispatch<SetStateAction<User>>
  setOpenProfilePage: Dispatch<SetStateAction<boolean>>
}

function EmailPassword(props: Iprops) {
  const [emailAuth, setEmailAuth] = useState<string>('')
  const [height, setHeight] = useState<number>(220)
  const [authResult, setAuthResult] = useState<boolean>(false)
  const [openEmailAuthInput, setOpenEmailAuthInput] = useState<boolean>(false)
  const [startTimer, setStartTimer] = useState<boolean>(false)
  const [emailAuthError, setEmailAuthError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [error, setError] = useState<errorData>({
    emailError: '',
    passwordError: '',
    passwordCheckError: '',
  })
  const Checkpassword = (passwordCheck: string) => {
    return passwordCheck === props.info.password
  }

  const handleConfirmEmail = async () => {
    const formData = new FormData()
    await formData.append('email', props.info?.email)
    await formData.append('authCode', emailAuth)

    return axios
      .post(`${API_URL}/confirm-email-auth-code`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res)
        console.log(res.data.result.authSuccess)
        setAuthResult(res.data.result.authSuccess)
        if (res.data.result.authSuccess === true) {
          setSuccess('이메일 인증이 완료되었어요.')
          setStartTimer(false)
          setEmailAuthError('')
        } else {
          setSuccess('')
          setEmailAuthError('인증번호가 일치하지 않습니다. 다시 확인해주세요!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEmailAuth = async () => {
    const formData = new FormData()
    await formData.append('email', props.info.email)
    return axios
      .post(`${API_URL}/send-email-auth-code`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (error.emailError === '') {
          alert('이메일 요청을 보냈습니다!')
          setStartTimer(true)
          setSuccess('')
        }
      })
      .catch((err) => {
        setError((prev) => ({
          ...prev,
          emailError: err.response.data.message,
        }))
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (!validateEmail(e.target.value)) {
        setError((prev) => ({
          ...prev,
          emailError: '올바르지 않은 이메일 형식이에요! 다시 확인해 주세요.',
        }))
        setOpenEmailAuthInput(false)
        setHeight(220)
      } else {
        setError((prev) => ({
          ...prev,
          emailError: '',
        }))
        props.setInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
        setOpenEmailAuthInput(true)
        setHeight(260)
      }
    } else if (e.target.name === 'password') {
      if (!validatePassword(e.target.value)) {
        setError((prev) => ({
          ...prev,
          passwordError:
            '영어, 숫자, 특수문자 조합으로 8자 이상 만들어 주세요!',
        }))
      } else {
        setError((prev) => ({
          ...prev,
          passwordError: '',
        }))
        props.setInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
    } else if (e.target.name === 'passwordCheck') {
      if (!Checkpassword(e.target.value)) {
        setError((prev) => ({
          ...prev,
          passwordCheckError: '비밀번호가 일치하지 않아요! 다시 확인해 주세요!',
        }))
      } else {
        setError((prev) => ({
          ...prev,
          passwordCheckError: '',
        }))
      }
    }
  }

  return (
    <ComponentWrapper>
      <Header title="회원가입" />
      <Inputs height={height}>
        <InputWrapper>
          <Label>이메일</Label>
          <EmailInput>
            <Input
              type="text"
              placeholder="이메일을 입력해 주세요."
              name="email"
              onChange={handleChange}
            />
            <NonActiveSmallButton onClick={handleEmailAuth}>
              인증 요청
            </NonActiveSmallButton>
          </EmailInput>
          <Error>{error.emailError}</Error>
          {openEmailAuthInput && (
            <EmailAuthInput>
              <Input
                placeholder="인증번호를 입력해 주세요."
                onChange={(e) => {
                  setEmailAuth(e.target.value)
                }}
              />
              <ActiveSmallButton onClick={handleConfirmEmail}>
                인증 확인
              </ActiveSmallButton>
            </EmailAuthInput>
          )}
          <Error>{emailAuthError}</Error>
          <Success>{success}</Success>
          {startTimer && (
            <Timer
              setStartTimer={setStartTimer}
              setEmailAuthError={setEmailAuthError}
            />
          )}
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
        <InputWrapper>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            name="passwordCheck"
            onChange={handleChange}
          />
          <Error>{error.passwordCheckError}</Error>
        </InputWrapper>
      </Inputs>
      <NonActiveButton
        onClick={() => {
          if (props.info.email === '' || props.info.password === '') {
            alert('빠진 정보가 없는지 확인해주세요!')
          } else if (authResult !== true) {
            alert('이메일 인증을 확인해주세요!')
          } else {
            props.setOpenProfilePage(true)
          }
        }}
      >
        회원가입
      </NonActiveButton>
      <Link to="/find/password">
        <SmallLinkButton>비밀번호 찾기</SmallLinkButton>
      </Link>
    </ComponentWrapper>
  )
}
export default EmailPassword
