import React, { useRef } from 'react'
import { Icons } from './style'
import FileInputs from '../FileInput'

interface Iprops {
  number: number
  handleImgFile: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
  handleVideoFile: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
}

function ImgVideoInput(props: Iprops) {
  return (
    <Icons>
      <FileInputs
        handleFunction={props.handleImgFile}
        number={props.number}
        accept={'image/*'}
        icon={'/img/icons/icon_photo2.png'}
        label={'사진 추가'}
      />
      <FileInputs
        handleFunction={props.handleVideoFile}
        number={props.number}
        accept={'video/*'}
        icon={'/img/icons/icon_video.png'}
        label={'동영상 추가'}
      />
    </Icons>
  )
}

export default ImgVideoInput
