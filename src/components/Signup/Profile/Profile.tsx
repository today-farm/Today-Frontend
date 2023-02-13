import React, { useCallback, useState, Dispatch, SetStateAction } from 'react'
import {
  GreenComponentWrapper,
  ActiveButton,
  Error,
  Success,
  Title,
} from '../../../style/CommonStyles'
import {
  ProfileWrapper,
  NickNameInput,
  DoubleCheckButton,
  Header,
  Logo,
  ProfileImg,
} from './style'
import axios from 'axios'
import { nicknameRegex } from '../../util/usefulFunctions'
import ImgInput from '../../FileInput/ImgInput/ImgInput'
import { API_URL } from '../../../constant'

interface Iprops {
  setFile: Dispatch<SetStateAction<File | null>>
  register: any
  watch: any
  errors: any
  handleSignup: () => void
}

function Profile(props: Iprops) {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [previewImg, setPreviewImg] = useState<string>()

  const handleDoubleCheck = async () => {
    const formData = new FormData()
    await formData.append('nickname', props.watch('nickname'))
    return axios
      .post(`${API_URL}/sign-up/nickname-duplicate-check`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res)
        if (res.data.result.duplicateCheck === true) {
          setError('이미 사용 중인 닉네임이에요! 다른 닉네임을 사용해 주세요.')
          setSuccess('')
        } else {
          setSuccess('사용 가능한 닉네임이에요!')
          setError('')
        }
      })
  }

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return
    if (e.target.files[0]) {
      props.setFile(e.target.files[0])
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
    props.setFile(null)
  }

  return (
    <GreenComponentWrapper>
      <Header>
        <Logo>로고</Logo>
        <Title>안녕하세요!</Title>
        <Title>닉네임과 프로필 사진(선택)을 등록해주세요.</Title>
      </Header>
      <ProfileWrapper>
        <ProfileImg
          src={previewImg ? previewImg : 'img/icons/icon_profile.png'}
          alt="프로필 이미지"
        />
        <ImgInput handleFile={handleFile} handleRemoveImg={handleRemoveImg} />
        <NickNameInput
          placeholder="사용하실 닉네임을 입력해주세요."
          {...props.register('nickname', {
            required: '닉네임을 입력해주세요.',
            minLength: {
              value: 2,
            },
            maxLength: {
              value: 8,
            },
            pattern: {
              value: nicknameRegex,
              message: '2자 이상 8자 이하로 숫자, 한글, 영어만 가능해요!',
            },
          })}
        ></NickNameInput>
        <Error>{props.errors?.nickname?.message}</Error>
        <Success>{success}</Success>
        <DoubleCheckButton onClick={handleDoubleCheck}>
          닉네임 중복 확인
        </DoubleCheckButton>
      </ProfileWrapper>
      <ActiveButton onClick={props.handleSignup}>
        하루농장 시작하기
      </ActiveButton>
    </GreenComponentWrapper>
  )
}

export default Profile
