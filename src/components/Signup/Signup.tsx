//JSON 데이터와 File 데이터를 함께 보내기 위해선 Multipart/form-data를 이용하면 될 것!
import React, { useState } from 'react'
import axios from 'axios'
import { Routes, Route, useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile/Profile'
import { API_URL } from '../../constant'
import { PUBLIC_ROUTE } from './../../Route'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { emailRegex, passwordRegex } from '../util/usefulFunctions'
import {
  EmailInput,
  EmailAuthInput,
  SignUpClearButton,
} from './EmailPassword/style'
import {
  ComponentWrapper,
  ActiveButton,
  NonActiveButton,
  NonActiveSmallButton,
  SmallLinkButton,
  ActiveSmallButton,
  Inputs,
  Input,
  Label,
  InputWrapper,
  Error,
  Success,
  ClearButton,
} from '../../style/CommonStyles'
import Timer from './Timer/Timer'
import { User, errorData } from '../Interface'
import Header from '../Header/Header'

function Signup() {
  const navigate = useNavigate()
  const [active, setActive] = useState<boolean>(true)
  const [file, setFile] = useState<File | null>(null)
  const [emailAuth, setEmailAuth] = useState<string>('')
  const [height, setHeight] = useState<number>(220)
  const [authResult, setAuthResult] = useState<boolean>(false)
  const [openEmailAuthInput, setOpenEmailAuthInput] = useState<boolean>(false)
  const [startTimer, setStartTimer] = useState<boolean>(false)
  const [emailAuthError, setEmailAuthError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [openProfilePage, setOpenProfilePage] = useState<boolean>(false)
  const [error, setError] = useState<errorData>({
    emailError: '',
    passwordError: '',
    passwordCheckError: '',
  })
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',
    },
  })

  interface IForm {
    email: string
    password: string
    passwordCheck: string
    nickname: string
  }

  const handleConfirmEmail = async () => {
    const formData = new FormData()
    await formData.append('email', watch('email'))
    await formData.append('authCode', emailAuth)

    return axios
      .post(`${API_URL}/confirm-email-auth-code`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
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
    await formData.append('email', watch('email'))
    return axios
      .post(`${API_URL}/send-email-auth-code`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (error.emailError === '') {
          alert('이메일 요청을 보냈습니다!')
          setStartTimer(true)
          setSuccess('')
          setOpenEmailAuthInput(true)
        }
      })
      .catch((err) => {
        setError((prev) => ({
          ...prev,
          emailError: err.response.data.message,
        }))
      })
  }

  const handleSignup = async () => {
    const formData = new FormData()
    if (file) {
      await formData.append('profileImg', file)
    }
    await formData.append(
      'userSignUpRequestDto',
      new Blob(
        [
          JSON.stringify({
            email: watch('email'),
            password: watch('password'),
            nickname: watch('nickname'),
          }),
        ],
        {
          type: 'application/json',
        },
      ),
    )
    return axios
      .post(`${API_URL}/sign-up`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        navigate(PUBLIC_ROUTE.LOGIN.path)
      })
  }

  return (
    <>
      {!openProfilePage && (
        <ComponentWrapper>
          <Header title="회원가입" />
          <Inputs height={height}>
            <InputWrapper>
              <Label>이메일</Label>
              <EmailInput>
                <Input
                  type="text"
                  placeholder="이메일을 입력해 주세요."
                  value={watch('email')}
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: emailRegex,
                      message:
                        '올바르지 않은 이메일 형식이에요! 다시 확인해 주세요.',
                    },
                  })}
                />
                {watch('email') !== '' && (
                  <SignUpClearButton
                    src="/img/icons/icon_input_delete.png"
                    onClick={() => {
                      reset({
                        email: '',
                      })
                    }}
                  />
                )}

                <NonActiveSmallButton onClick={handleEmailAuth}>
                  인증 요청
                </NonActiveSmallButton>
              </EmailInput>
              <Error>{errors?.email?.message}</Error>
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
                // onChange={passwordClearInput}
                {...register('password', {
                  required: '비밀번호를 입력해주세요!',
                  pattern: {
                    value: passwordRegex,
                    message:
                      '영어, 숫자, 특수문자 조합으로 8자 이상 만들어 주세요!',
                  },
                })}
              />
              {watch('password') !== '' && (
                <ClearButton
                  src="/img/icons/icon_input_delete.png"
                  onClick={() => {
                    reset({
                      password: '',
                    })
                  }}
                />
              )}
              <Error>{errors?.password?.message}</Error>
            </InputWrapper>
            <InputWrapper>
              <Label>비밀번호 확인</Label>
              <Input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해 주세요."
                // onChange={passwordCheckClearInput}
                {...register('passwordCheck', {
                  required: '비밀번호를 확인해주세요!',
                  validate: {
                    check: (val: string) => {
                      if (getValues('password') !== val) {
                        return '비밀번호가 일치하지 않아요! 다시 확인해 주세요!'
                      }
                    },
                  },
                })}
              />
              {watch('passwordCheck') !== '' && (
                <ClearButton
                  src="/img/icons/icon_input_delete.png"
                  onClick={() => {
                    reset({
                      passwordCheck: '',
                    })
                  }}
                />
              )}
              <Error>{errors?.passwordCheck?.message}</Error>
            </InputWrapper>
          </Inputs>
          {watch('email') !== '' &&
          watch('password') !== '' &&
          watch('passwordCheck') !== '' &&
          errors?.email?.message === undefined &&
          errors?.password?.message === undefined &&
          errors?.passwordCheck?.message === undefined &&
          authResult === true ? (
            <ActiveButton
              onClick={() => {
                setOpenProfilePage(true)
              }}
            >
              회원가입
            </ActiveButton>
          ) : (
            <NonActiveButton>회원가입</NonActiveButton>
          )}
          <Link to={PUBLIC_ROUTE.FIND_PASSWORD.path}>
            <SmallLinkButton>비밀번호 찾기</SmallLinkButton>
          </Link>
        </ComponentWrapper>
      )}
      {openProfilePage && (
        <Profile
          setFile={setFile}
          register={register}
          watch={watch}
          errors={errors}
          handleSignup={handleSignup}
        />
      )}
    </>
  )
}
export default Signup
