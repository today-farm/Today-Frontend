import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import {
  ComponentWrapper,
  Inputs,
  InputWrapper,
  Label,
  Input,
  BottomButton,
  Error,
  ClearButton,
  ActiveBottomButton,
} from './../../../style/CommonStyles'
import Header from '../../Header/Header'
import { validatePassword } from '../../util/usefulFunctions'
import { API_URL } from '../../../constant'
import { PRIVATE_ROUTE } from '../../../Route'

interface password {
  currentPassword: string
  changePassword: string
  changePasswordCheck: string
}

interface errorData {
  currentPasswordError: string
  changePasswordError: string
  changePasswordCheckError: string
}

function ChangePassword() {
  const navigate = useNavigate()
  const [cookies] = useCookies(['accessToken'])
  const [password, setPassword] = useState<password>({
    currentPassword: '',
    changePassword: '',
    changePasswordCheck: '',
  })
  const [error, setError] = useState<errorData>({
    currentPasswordError: '',
    changePasswordError: '',
    changePasswordCheckError: '',
  })

  const Checkpassword = (passwordCheck: string) => {
    return passwordCheck === password.changePassword
  }

  const handleCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'changePassword') {
      setPassword((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
      if (!validatePassword(e.target.value)) {
        setError((prev) => ({
          ...prev,
          changePasswordError:
            '영어, 숫자, 특수문자 조합으로 8자 이상 만들어 주세요!',
        }))
      } else {
        setError((prev) => ({
          ...prev,
          changePasswordError: '',
        }))
      }
    } else if (e.target.name === 'changePasswordCheck') {
      setPassword((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
      if (!Checkpassword(e.target.value)) {
        setError((prev) => ({
          ...prev,
          changePasswordCheckError:
            '비밀번호가 일치하지 않아요! 다시 확인해 주세요!',
        }))
      } else {
        setError((prev) => ({
          ...prev,
          changePasswordCheckError: '',
        }))
      }
    }
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    await formData.append('currentPassword', password.currentPassword)
    await formData.append('changePassword', password.changePassword)
    if (
      password.currentPassword === '' ||
      password.changePassword === '' ||
      password.changePasswordCheck
    ) {
      alert('빠진 정보가 없는지 확인해 주세요!')
      return
    }
    return axios
      .patch(`${API_URL}/user/update-password`, formData, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      })
      .then((res) => {
        alert('업데이트 완료!')
        setError((prev) => ({
          ...prev,
          currentPasswordError: '',
        }))
        navigate(PRIVATE_ROUTE.MYPAGE.path)
      })
      .catch((err) => {
        if (err.response.data.errorCode === 2005) {
          setError((prev) => ({
            ...prev,
            currentPasswordError:
              '비밀번호가 잘못되었어요! 다시 확인해 주세요.',
          }))
        }
      })
  }

  const clearInput = (target: string) => {
    target === 'currentPassword'
      ? setPassword((prev) => ({
          ...prev,
          ['currentPassword']: '',
        }))
      : target === 'changePassword'
      ? setPassword((prev) => ({
          ...prev,
          ['changePassword']: '',
        }))
      : setPassword((prev) => ({
          ...prev,
          ['changePasswordCheck']: '',
        }))
  }

  return (
    <ComponentWrapper>
      <Header title="비밀번호 변경" />
      <Inputs height={240}>
        <InputWrapper>
          <Label>현재 비밀번호</Label>
          <Input
            type="password"
            name="currentPassword"
            value={password.currentPassword}
            placeholder="현재 비밀번호를 입력해 주세요."
            onChange={handleCurrentPassword}
          />
          {password.currentPassword !== '' && (
            <ClearButton
              src="/img/icons/icon_input_delete.png"
              onClick={() => {
                clearInput('currentPassword')
              }}
            />
          )}
          <Error>{error.currentPasswordError}</Error>
        </InputWrapper>
        <InputWrapper>
          <Label>변경할 비밀번호</Label>
          <Input
            type="password"
            name="changePassword"
            placeholder="새로운 비밀번호를 입력해 주세요."
            value={password.changePassword}
            onChange={handleChange}
          />
          {password.changePassword !== '' && (
            <ClearButton
              src="/img/icons/icon_input_delete.png"
              onClick={() => {
                clearInput('changePassword')
              }}
            />
          )}
          <Error>{error.changePasswordError}</Error>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            name="changePasswordCheck"
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            value={password.changePasswordCheck}
            onChange={handleChange}
          />
          {password.changePasswordCheck !== '' && (
            <ClearButton
              src="/img/icons/icon_input_delete.png"
              onClick={() => {
                clearInput('changePasswordCheck')
              }}
            />
          )}
          <Error>{error.changePasswordCheckError}</Error>
        </InputWrapper>
      </Inputs>
      {password.currentPassword !== '' &&
      password.changePassword !== '' &&
      password.changePasswordCheck !== '' ? (
        <ActiveBottomButton>비밀번호 변경</ActiveBottomButton>
      ) : (
        <BottomButton onClick={handleUpdate}>비밀번호 변경</BottomButton>
      )}
    </ComponentWrapper>
  )
}

export default ChangePassword
