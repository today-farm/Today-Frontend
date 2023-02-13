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

  // const image = useRef() as React.MutableRefObject<HTMLDivElement>
  const image = useRef<HTMLImageElement>(null)

  const notShowFile = () => {
    console.log('hi')
    console.log(image)
    if (image === null || image.current === null) {
      return
    }
    // console.log(image.current?.style.display)
    image.current.style.display = 'none'
    //console.log(image.current)
  }
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
              ref={image}
              className={`image${id}`}
              // style={{ display: display }}
              src={`${IMG_URL}${image.postImgUrl}`}
            />
            <DeleteButton
              src="/img/icons/icon_file_delete.png"
              // style={{ display: display }}
              onClick={(e) => {
                props.setDeleteImgId?.((imgId: any) => [
                  ...imgId,
                  image.postImgUrlId,
                ])
                // handleShowFile(e)
                notShowFile()
                e.currentTarget.style.display = 'none'
                // props.handleDeleteImage(id, props.number, 'img')
                // setDisplay('none')
                // setActive(!active)
              }}
            />
          </div>
        )
      })}
      {props.videos?.map((video: any, id: number) => {
        return (
          <div key={id}>
            <PreviewVideo
              // style={{ display: display }}
              src={`${IMG_URL}${video.postVideoUrl}`}
            />
            <DeleteButton
              src="/img/icons/icon_file_delete.png"
              // style={{ display: display }}
              onClick={(e) => {
                props.setDeleteVideoId?.((videoId: any) => [
                  ...videoId,
                  video.postVideoUrlId,
                ])
                e.currentTarget.style.display = 'none'
                // props.handleDeleteImage(id, props.number)
                // setDisplay('none')
              }}
            />
          </div>
        )
      })}
      {props.previewImg?.map((image, id) => (
        <div key={id}>
          <PreviewImg src={image} alt={`${image}-${id}`} />
          <DeleteButton
            src="/img/icons/icon_file_delete.png"
            onClick={() => props.handleDeleteImage(id, props.number, 'img')}
          />
        </div>
      ))}
      {props.previewVideo?.map((video, id) => (
        <div key={id}>
          <PreviewVideo src={video} controls />
          <DeleteButton
            src="/img/icons/icon_file_delete.png"
            onClick={() => props.handleDeleteImage(id, props.number)}
          />
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
