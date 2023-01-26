import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { Icontent } from '../../Interface'
import ImgVideoInput from '../../FileInput/ImgVideoInput/ImgVideoInput'
import {
  ContentWrapper,
  Question,
  ContentInput,
  PreviewImg,
  PreviewVideo,
  DeleteButton,
} from './style'
import { API_URL, IMG_URL } from '../../../constant'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

interface Iprops {
  content: string
  question: string
  number: number
  setContent: Dispatch<SetStateAction<Icontent>>
  handleImgFile: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
  handleVideoFile: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  previewImg: string[]
  previewVideo: string[]
  detail?: string
  images?: any
  videos?: any
  handleDeleteImage: (id: number, number: number, img?: string) => void
  setDeleteImgId?: Dispatch<SetStateAction<number[]>> | undefined
  setDeleteVideoId?: Dispatch<SetStateAction<number[]>> | undefined
}

export default function QuestionAnswer(props: Iprops) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [postQuestions, setPostQuestions] = useState<string[]>([])
  const [display, setDisplay] = useState<string>('block')
  const [active, setActive] = useState(false)
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const params = useParams()
  const todayId = params.todayId
  const [cookies] = useCookies(['accessToken', 'password'])
  useEffect(() => {
    if (ref === null || ref.current === null) {
      return
    }
    ref.current.style.height = '40px'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }, [])

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return
    }
    ref.current.style.height = '40px'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }, [])

  return (
    <ContentWrapper>
      <Question>{props.question}</Question>
      <ImgVideoInput
        number={props.number}
        handleImgFile={props.handleImgFile}
        handleVideoFile={props.handleVideoFile}
      />
      {props.images?.map((image: any, id: number) => {
        return (
          <div key={id}>
            <PreviewImg
              // style={{ display: display }}
              src={`${IMG_URL}${image.postImgUrl}`}
            />
            <DeleteButton
              style={{ display: display }}
              onClick={() => {
                props.setDeleteImgId?.((imgId: any) => [
                  ...imgId,
                  image.postImgUrlId,
                ])
                // setDisplay('none')
                // setActive(!active)
              }}
            >
              X
            </DeleteButton>
          </div>
        )
      })}
      {props.videos?.map((video: any, id: number) => {
        return (
          <div key={id}>
            <PreviewVideo
              style={{ display: display }}
              src={`${IMG_URL}${video.postImgUrl}`}
            />
            <DeleteButton
              style={{ display: display }}
              onClick={() => {
                props.setDeleteImgId?.((imgId: any) => [
                  ...imgId,
                  video.postImgUrlId,
                ])
                setDisplay('none')
              }}
            >
              X
            </DeleteButton>
          </div>
        )
      })}
      {props.previewImg?.map((image, id) => (
        <div key={id}>
          <PreviewImg src={image} alt={`${image}-${id}`} />
          <DeleteButton
            onClick={() => props.handleDeleteImage(id, props.number, 'img')}
          >
            x
          </DeleteButton>
        </div>
      ))}
      {props.previewVideo?.map((video, id) => (
        <div key={id}>
          <PreviewVideo src={video} controls />
          <DeleteButton
            onClick={() => props.handleDeleteImage(id, props.number)}
          >
            x
          </DeleteButton>
        </div>
      ))}
      <ContentInput
        onInput={handleResizeHeight}
        ref={ref}
        maxLength={100}
        rows={2}
        defaultValue={props.detail}
        placeholder="오늘의 기록을 남겨보세요."
        name={props.content}
        onChange={(e) =>
          props.setContent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
    </ContentWrapper>
  )
}
