import React, { Dispatch, SetStateAction } from 'react'
import { Icontent } from '../../Interface'
import ImgVideoInput from '../../FileInput/ImgVideoInput/ImgVideoInput'
import { ContentWrapper, Question, ContentInput } from './style'

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
}

export default function QuestionAnswer(props: Iprops) {
  return (
    <ContentWrapper>
      <Question>{props.question}</Question>
      <ImgVideoInput
        number={props.number}
        handleImgFile={props.handleImgFile}
        handleVideoFile={props.handleVideoFile}
      />
      <ContentInput
        type="text"
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
