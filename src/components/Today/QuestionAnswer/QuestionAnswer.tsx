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
} from './style'

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
  handleDeleteImage: (id: number, number: number, img?: string) => void
}

export default function QuestionAnswer(props: Iprops) {
  const ref = useRef<HTMLTextAreaElement>(null)
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
      {/* {props.previewImg?.map((x: string) => {
        return <PreviewImg src={x} />
      })} */}
      {props.previewImg?.map((image, id) => (
        <div key={id}>
          <PreviewImg src={image} alt={`${image}-${id}`} />
          <button
            onClick={() => props.handleDeleteImage(id, props.number, 'img')}
          >
            x
          </button>
        </div>
      ))}
      {props.previewVideo?.map((video, id) => (
        <div key={id}>
          <PreviewVideo src={video} controls />
          <button onClick={() => props.handleDeleteImage(id, props.number)}>
            x
          </button>
        </div>
      ))}
      <ContentInput
        onInput={handleResizeHeight}
        ref={ref}
        maxLength={100}
        rows={2}
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
