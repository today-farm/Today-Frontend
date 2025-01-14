import React, { useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import {
  ComponentWrapper,
  Inputs,
  Input,
  Label,
  NonActiveButton,
  SmallLinkButton,
  Error,
  ActiveButton,
  ClearButton,
} from './../../style/CommonStyles'
import Modal from './Modal/Modal'
import { API_URL } from '../../constant'

export default function FindPassword() {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const findPassword = async () => {
    const formData = new FormData()
    if (email !== '') {
      await formData.append('checkEmail', email)
    }
    return axios
      .post(`${API_URL}/find-password`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        setError('')
        if (res.data.isSuccess === true) {
          setOpenModal(true)
        }
      })
      .catch((err) => {
        setError('가입되지 않은 이메일이에요! 다시 확인해 주세요.')
      })
  }
  return (
    <ComponentWrapper>
      <Header title="비밀번호 찾기" />
      <Inputs>
        <Label>이메일</Label>
        <Input
          placeholder="가입하신 이메일을 입력해 주세요."
          onChange={handleEmail}
        />
        {email !== '' && (
          <ClearButton
            src="/img/icons/icon_input_delete.png"
            onClick={() => {
              setEmail('')
            }}
          />
        )}
        <Error>{error}</Error>
      </Inputs>
      {email !== '' ? (
        <ActiveButton onClick={findPassword}>임시 비밀번호 전송</ActiveButton>
      ) : (
        <NonActiveButton onClick={findPassword}>
          임시 비밀번호 전송
        </NonActiveButton>
      )}

      <SmallLinkButton>회원가입</SmallLinkButton>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </ComponentWrapper>
  )
}
