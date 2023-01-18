import React, { useRef } from 'react'
import { Label } from '../../../style/CommonStyles'
import { Icons, FileInput } from './style'
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
  const imageInput = useRef<HTMLInputElement>(null)
  const onCickImageUpload = () => {
    imageInput.current?.click()
  }

  return (
    <Icons>
      <FileInputs
        handleFunction={props.handleImgFile}
        number={props.number}
        accept={'image/*'}
        icon={'img/icon_photo2.png'}
        label={'사진 추가'}
      />
      <FileInputs
        handleFunction={props.handleVideoFile}
        number={props.number}
        accept={'video/*'}
        icon={'img/icon_video.png'}
        label={'동영상 추가'}
      />
      {/* <FileInput>
        <input
          type="file"
          onChange={(e) => {
            props.handleImgFile(props.number, e)
          }}
          accept="image/*"
          style={{ display: 'none' }}
          ref={imageInput}
          multiple
        />
        <img
          alt="profile"
          src="img/icon_photo2.png"
          onClick={onCickImageUpload}
        />
        <Label>사진 추가</Label>
      </FileInput>
      <FileInput>
        <input
          type="file"
          onChange={(e) => {
            props.handleVideoFile(props.number, e)
          }}
          accept="video/*"
          style={{ display: 'none' }}
          ref={imageInput}
          multiple
        />
        <img
          alt="profile"
          src="img/icon_video.png"
          onClick={onCickImageUpload}
        />
        <Label>동영상 추가</Label>
      </FileInput> */}
    </Icons>
  )
}

export default ImgVideoInput
