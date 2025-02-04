import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import QuestionAnswer from '../Today/QuestionAnswer/QuestionAnswer'
import { Icontent, Iquestion } from '../Interface'
import { handlePreviewFiles } from '../util/usefulFunctions'
import {
  GreenComponentWrapper,
  ActiveButton,
  Label,
} from '../../style/CommonStyles'
import Header from '../Header/Header'
import { Contents, SecretWrapper, OpenButton, NonActiveButton } from './style'
import { API_URL } from '../../constant'

export default function TodayUpdate() {
  const [postQuestions, setPostQuestions] = useState<string[]>([])
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const params = useParams()
  const todayId = params.todayId
  const [creationDay, setCreationDay] = useState('')
  const [deleteImgId, setDeleteImgId] = useState<number[]>([])
  const [deleteVideoId, setDeleteVideoId] = useState<number[]>([])
  console.log(deleteImgId, deleteVideoId)
  const [todayFeeling, setTodayFeeling] = useState('')
  const [year, month, day] = creationDay.split('-')
  const [questionId, setQuestionId] = useState({
    questionId1: 0,
    questionId2: 0,
    questionId3: 0,
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
  console.log(videoFile1)
  // console.log(videoFile2)
  // console.log(videoFile3)
  const [publicAccess, setPublicAccess] = useState<boolean>(true)
  const [openFeelingPage, setOpenFeelingPage] = useState<boolean>(true)
  const [style, setStyle] = useState({
    publicColor: '',
    publicBackgroundColor: '',
    secretColor: '',
    secretBackgroundColor: '',
  })
  const [cookies] = useCookies(['accessToken', 'password'])
  const [previewImg1, setpreviewImg1] = useState<string[]>([])
  const [previewImg2, setpreviewImg2] = useState<string[]>([])
  const [previewImg3, setpreviewImg3] = useState<string[]>([])
  const [previewVideo1, setPreviewVideo1] = useState<string[]>([])
  const [previewVideo2, setPreviewVideo2] = useState<string[]>([])
  const [previewVideo3, setPreviewVideo3] = useState<string[]>([])
  console.log(previewVideo1)

  const handleImgFile = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files === null) return
    if (index === 1) {
      setImgFile1([...imgFile1, ...e.target.files])
      const imageLists = e.target.files
      let imageUrlLists = [...previewImg1]
      handlePreviewFiles(imageLists, imageUrlLists)
      setpreviewImg1(imageUrlLists)
    } else if (index === 2) {
      setImgFile2([...imgFile2, ...e.target.files])
      const imageLists = e.target.files
      let imageUrlLists = [...previewImg2]
      handlePreviewFiles(imageLists, imageUrlLists)
      setpreviewImg2(imageUrlLists)
    } else {
      setImgFile3([...imgFile3, ...e.target.files])
      const imageLists = e.target.files
      let imageUrlLists = [...previewImg3]
      handlePreviewFiles(imageLists, imageUrlLists)
      setpreviewImg3(imageUrlLists)
    }
  }

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number, number: number, img?: string) => {
    if (img) {
      if (number === 1) {
        setpreviewImg1(previewImg1.filter((_, index) => index !== id))
        setImgFile1(imgFile1.filter((_, index) => index !== id))
      } else if (number === 2) {
        setpreviewImg2(previewImg2.filter((_, index) => index !== id))
        setImgFile2(imgFile2.filter((_, index) => index !== id))
      } else if (number === 3) {
        setpreviewImg3(previewImg3.filter((_, index) => index !== id))
        setImgFile3(imgFile3.filter((_, index) => index !== id))
      }
    } else {
      if (number === 1) {
        setPreviewVideo1(previewVideo1.filter((_, index) => index !== id))
        setVideoFile1(videoFile1.filter((_, index) => index !== id))
      } else if (number === 2) {
        setPreviewVideo2(previewVideo2.filter((_, index) => index !== id))
        setVideoFile2(videoFile2.filter((_, index) => index !== id))
      } else if (number === 3) {
        setPreviewVideo3(previewVideo3.filter((_, index) => index !== id))
        setVideoFile3(videoFile3.filter((_, index) => index !== id))
      }
    }
  }

  const handleVideoFile = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files === null) return
    if (index === 1) {
      setVideoFile1([...videoFile1, ...e.target.files])
      const imageLists = e.target.files
      let imageUrlLists = [...previewVideo1]
      handlePreviewFiles(imageLists, imageUrlLists)
      setPreviewVideo1(imageUrlLists)
    } else if (index === 2) {
      setVideoFile2([...videoFile2, ...e.target.files])
      const imageLists = e.target.files
      let imageUrlLists = [...previewVideo2]
      handlePreviewFiles(imageLists, imageUrlLists)
      setPreviewVideo2(imageUrlLists)
    } else {
      setVideoFile3([...videoFile3, ...e.target.files])
      const imageLists = e.target.files
      let imageUrlLists = [...previewVideo3]
      handlePreviewFiles(imageLists, imageUrlLists)
      setPreviewVideo3(imageUrlLists)
    }
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    const uploadFiles = (fileName: File[], fileKey: string) => {
      for (let i = 0; i < fileName.length; i++) {
        formData.append(fileKey, fileName[i])
      }
    }

    uploadFiles(imgFile1, 'addImgs')
    uploadFiles(imgFile2, 'addImgs')
    uploadFiles(imgFile3, 'addImgs')
    uploadFiles(videoFile1, 'addVideos')
    uploadFiles(videoFile2, 'addVideos')
    uploadFiles(videoFile3, 'addVideos')

    const TodayPost = {
      postQuestions: [
        {
          questionId: questionId.questionId1,
          content: content.content1,
          deleteImgUrlId: deleteImgId,
          deleteVideoUrlId: deleteVideoId,
          addImgCount: imgFile1.length,
          addVideoCount: videoFile1.length,
        },
        {
          questionId: questionId.questionId2,
          content: content.content2,
          deleteImgUrlId: deleteImgId,
          deleteVideoUrlId: deleteVideoId,
          addImgCount: imgFile2.length,
          addVideoCount: videoFile2.length,
        },
        {
          questionId: questionId.questionId3,
          content: content.content3,
          deleteImgUrlId: deleteImgId,
          deleteVideoUrlId: deleteVideoId,
          addImgCount: imgFile3.length,
          addVideoCount: videoFile3.length,
        },
      ],
      todayFeeling: todayFeeling,
      canPublicAccess: publicAccess,
    }

    await formData.append(
      'postUpdateDto',
      new Blob([JSON.stringify(TodayPost)], { type: 'application/json' }),
    )

    axios
      .patch(`${API_URL}/post/update/${todayId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        console.log('글 수정 성공!')
        navigate(-1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    postQuestions.map((x: any, index: number) => {
      setQuestionId((prev) => ({
        ...prev,
        ['questionId' + (index + 1)]: x.questionId,
      }))
      setContent((prev) => ({
        ...prev,
        ['content' + (index + 1)]: x.content,
      }))
    })
  }, [postQuestions])

  useEffect(() => {
    axios
      .get(`${API_URL}/post/find-one/${todayId}/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.result.postQuestions)
        setPostQuestions(res.data.result.postQuestions)
        setCreationDay(res.data.result.creationDay)
        setTodayFeeling(res.data.result.todayFeeling)
        if (res.data.result.canPublicAccess === true) {
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
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
    <GreenComponentWrapper>
      <Header title={`${year}년 ${month}월 ${day}일`} />
      <Contents>
        {postQuestions.map((x: any, index: number) => {
          return (
            <QuestionAnswer
              content={`content${index + 1}`}
              question={x.question}
              number={index + 1}
              setContent={setContent}
              handleImgFile={handleImgFile}
              handleVideoFile={handleVideoFile}
              previewImg={
                index === 0
                  ? previewImg1
                  : index === 1
                  ? previewImg2
                  : previewImg3
              }
              previewVideo={
                index === 0
                  ? previewVideo1
                  : index === 1
                  ? previewVideo2
                  : previewVideo3
              }
              handleDeleteImage={handleDeleteImage}
              detail={x.content}
              images={x.postImgUrls}
              videos={x.postVideoUrls}
              setDeleteImgId={setDeleteImgId}
              setDeleteVideoId={setDeleteVideoId}
            />
          )
        })}
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
      <ActiveButton onClick={handleUpdate}>수정 완료</ActiveButton>
    </GreenComponentWrapper>
  )
}
