import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import QuestionAnswer from './QuestionAnswer/QuestionAnswer'
import { Icontent, Iquestion } from '../Interface'
import { getRandomQuestion } from '../util/usefulFunctions'
import {
  GreenComponentWrapper,
  ActiveButton,
  Label,
} from '../../style/CommonStyles'
import Header from '../Header/Header'
import { todayTime } from './TodayDate'
import { Contents, SecretWrapper, OpenButton, NonActiveButton } from './style'
import TodayFeeling from './TodayFeeling/TodayFeeling'

export default function Today() {
  const [question, setQuestion] = useState<Iquestion>({
    question1: getRandomQuestion(),
    question2: getRandomQuestion(),
    question3: getRandomQuestion(),
  })
  const [content, setContent] = useState<Icontent>({
    content1: '',
    content2: '',
    content3: '',
  })
  const [imgFile1, setImgFile1] = useState<File[]>([])
  const [imgFile2, setImgFile2] = useState<File[]>([])
  const [imgFile3, setImgFile3] = useState<File[]>([])
  const [videoFile1, setVideoFile1] = useState<File[]>([])
  const [videoFile2, setVideoFile2] = useState<File[]>([])
  const [videoFile3, setVideoFile3] = useState<File[]>([])
  const [todayFeeling, setTodayFeeling] = useState<string>('')
  const [publicAccess, setPublicAccess] = useState<boolean>(true)
  const [openFeelingPage, setOpenFeelingPage] = useState<boolean>(true)
  const [style, setStyle] = useState({
    publicColor: '',
    publicBackgroundColor: '',
    secretColor: '',
    secretBackgroundColor: '',
  })
  const [cookies] = useCookies(['accessToken', 'password'])
  const navigate = useNavigate()

  const handleImgFile = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files === null) return
    if (index === 1) {
      setImgFile1([...imgFile1, ...e.target.files])
    } else if (index === 2) {
      setImgFile2([...imgFile2, ...e.target.files])
    } else {
      setImgFile3([...imgFile3, ...e.target.files])
    }
  }

  const handleVideoFile = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files === null) return
    if (index === 1) {
      setVideoFile1([...videoFile1, ...e.target.files])
    } else if (index === 2) {
      setVideoFile2([...videoFile2, ...e.target.files])
    } else {
      setVideoFile3([...videoFile3, ...e.target.files])
    }
  }

  const handleToday = async () => {
    const formData = new FormData()
    const uploadFiles = (fileName: File[], fileKey: string) => {
      for (let i = 0; i < fileName.length; i++) {
        formData.append(fileKey, fileName[i])
      }
    }
    uploadFiles(imgFile1, 'uploadImgs')
    uploadFiles(imgFile2, 'uploadImgs')
    uploadFiles(imgFile3, 'uploadImgs')
    uploadFiles(videoFile1, 'uploadVideos')
    uploadFiles(videoFile2, 'uploadVideos')
    uploadFiles(videoFile3, 'uploadVideos')

    const TodayPost = {
      postQuestions: [
        {
          question: question.question1,
          content: content.content1,
          imgCount: imgFile1.length,
          videoCount: videoFile1.length,
        },
        {
          question: question.question2,
          content: content.content2,
          imgCount: imgFile2.length,
          videoCount: videoFile2.length,
        },
        {
          question: question.question3,
          content: content.content3,
          imgCount: imgFile3.length,
          videoCount: videoFile3.length,
        },
      ],
      todayFeeling: todayFeeling,
      canPublicAccess: publicAccess,
    }

    await formData.append(
      'postSaveDto',
      new Blob([JSON.stringify(TodayPost)], { type: 'application/json' }),
    )

    return axios
      .post(`/post/save`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        console.log('글 등록 성공!')
        navigate('/todaylist')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const clickPublicAccess = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { name } = e.target as HTMLButtonElement
    if (name === 'true') {
      setPublicAccess(true)
      setStyle(() => ({
        ['publicColor']: 'var(--dark-green)',
        ['publicBackgroundColor']: 'var(--mid-green)',
        ['secretColor']: 'var(--green)',
        ['secretBackgroundColor']: '#fff',
      }))
    } else {
      setPublicAccess(false)
      setStyle(() => ({
        ['secretColor']: 'var(--dark-green)',
        ['secretBackgroundColor']: 'var(--mid-green)',
        ['publicColor']: 'var(--green)',
        ['publicBackgroundColor']: '#fff',
      }))
    }
  }

  return (
    <>
      {openFeelingPage ? (
        <TodayFeeling
          setTodayFeeling={setTodayFeeling}
          setOpenFeelingPage={setOpenFeelingPage}
        />
      ) : (
        <GreenComponentWrapper>
          <Header title={todayTime()} post={setOpenFeelingPage} />
          <Contents>
            <QuestionAnswer
              content="content1"
              question={question.question1}
              number={1}
              setContent={setContent}
              handleImgFile={handleImgFile}
              handleVideoFile={handleVideoFile}
            />
            <QuestionAnswer
              content="content2"
              question={question.question2}
              number={2}
              setContent={setContent}
              handleImgFile={handleImgFile}
              handleVideoFile={handleVideoFile}
            />
            <QuestionAnswer
              content="content3"
              question={question.question3}
              number={3}
              setContent={setContent}
              handleImgFile={handleImgFile}
              handleVideoFile={handleVideoFile}
            />
          </Contents>
          <SecretWrapper>
            <Label>친구에게 이 일기를 보여줄까요?</Label>
            <div>
              <NonActiveButton
                style={{
                  color: style.publicColor,
                  backgroundColor: style.publicBackgroundColor,
                }}
                name="true"
                onClick={clickPublicAccess}
              >
                공개
              </NonActiveButton>
              <NonActiveButton
                style={{
                  color: style.secretColor,
                  backgroundColor: style.secretBackgroundColor,
                }}
                name="false"
                onClick={clickPublicAccess}
              >
                비공개
              </NonActiveButton>
            </div>
          </SecretWrapper>
          <ActiveButton onClick={handleToday}>기록 저장</ActiveButton>
        </GreenComponentWrapper>
      )}
    </>
  )
}
