import React, { useRef } from 'react'
import { Icons, Line } from './style'

interface Iprops {
  handleFile?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveImg?: () => void
}

function ImgInput(props: Iprops) {
  const imageInput = useRef<HTMLInputElement>(null)
  const onCickImageUpload = () => {
    imageInput.current?.click()
  }
  return (
    <div>
      <Icons>
        <input
          type="file"
          onChange={props.handleFile}
          accept="image/*"
          style={{ display: 'none' }}
          ref={imageInput}
        />
        <img
          alt="profile"
          src="img/icon_photo.png"
          onClick={onCickImageUpload}
        />
        <Line>|</Line>
        <img
          alt="profile"
          src="img/icon_delete.png"
          onClick={props.handleRemoveImg}
        />
      </Icons>
    </div>
  )
}

export default ImgInput
