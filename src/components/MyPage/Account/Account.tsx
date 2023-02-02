import React, { useCallback, useState, useEffect, useRef } from 'react'
import {
  ComponentWrapper,
  Error,
  Success,
  BottomButton,
  ActiveBottomButton,
} from './../../../style/CommonStyles'
import Header from '../../Header/Header'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  ProfileImg,
  NonDoubleCheckButton,
  DoubleCheckButton,
  NickNameInput,
} from './style'
import ImgInput from '../../FileInput/ImgInput/ImgInput'
import { API_URL, IMG_URL } from '../../../constant'
import { PRIVATE_ROUTE } from '../../../Route'

interface User {
  nickname: string
  img: string
}

function Account() {
  const navigate = useNavigate()
  const [cookies] = useCookies(['accessToken'])
  const [info, setInfo] = useState<User>({
    nickname: '',
    img: '',
  })
  const [changeNickname, setChangeNickname] = useState<string>('')
  const [previewImg, setPreviewImg] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  useEffect(() => {
    axios
      .get(`${API_URL}/user/find-my-info`, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      })
      .then((res) => {
        setInfo((prev) => ({
          ...prev,
          ['nickname']: res.data.result.nickname,
          ['img']: res.data.result.profileImgUrl,
        }))
      })
  }, [])

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = (e) => {
      const result = e?.target?.result as string
      setPreviewImg(result)
    }
  }, [])

  const handleRemoveImg = () => {
    setPreviewImg('')
    setFile(null)
  }

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeNickname(e.target.value)
  }

  const handleDoubleCheck = async () => {
    const formData = new FormData()
    await formData.append('changeNickname', changeNickname)
    return axios
      .post(`${API_URL}/sign-up/nickname-duplicate-check`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.data.result.duplicateCheck === true) {
          setError('이미 사용 중인 닉네임이에요! 다른 닉네임을 사용해 주세요.')
          setSuccess('')
        } else {
          setSuccess('사용 가능한 닉네임이에요!')
          setError('')
        }
      })
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    if (file) {
      await formData.append('profileImg', file)
    }
    if (changeNickname !== '') {
      await formData.append(
        'userUpdateRequestDto',
        new Blob([JSON.stringify(changeNickname)], {
          type: 'application/json',
        }),
      )
    }
    return axios
      .patch(`${API_URL}/user/update-my-info`, formData, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      })
      .then((res) => {
        alert('업데이트 완료!')
        navigate(PRIVATE_ROUTE.MYPAGE.path)
      })
      .catch((err) => {
        if (err.response.data.errorCode === 2004) {
          setError('기존 닉네임과 같은 닉네임입니다.')
        }
      })
  }

  return (
    <ComponentWrapper>
      <Header title="내 정보 수정" />
      <ProfileImg
        src={previewImg ? previewImg : `${IMG_URL}${info.img}`}
        alt="프로필 이미지"
      />
      <ImgInput handleFile={handleFile} handleRemoveImg={handleRemoveImg} />
      <NickNameInput
        defaultValue={info.nickname}
        onChange={handleChangeNickname}
      />
      <Error>{error}</Error>
      <Success>{success}</Success>
      {changeNickname !== '' ? (
        <DoubleCheckButton onClick={handleDoubleCheck}>
          닉네임 중복 확인
        </DoubleCheckButton>
      ) : (
        <NonDoubleCheckButton onClick={handleDoubleCheck}>
          닉네임 중복 확인
        </NonDoubleCheckButton>
      )}
      {success === '사용 가능한 닉네임이에요!' ? (
        <ActiveBottomButton onClick={handleUpdate}>저장</ActiveBottomButton>
      ) : (
        <BottomButton onClick={handleUpdate}>저장</BottomButton>
      )}
    </ComponentWrapper>
  )
}

export default Account
