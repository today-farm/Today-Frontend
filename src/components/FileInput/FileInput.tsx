import React, { useRef } from 'react'
import { Label } from '../../style/CommonStyles'
import { FileInput } from './ImgVideoInput/style'

interface Iprops {
  handleFunction: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  number: number
  accept: string
  icon: string
  label: string
}

function FileInputs(props: Iprops) {
  const imageInput = useRef<HTMLInputElement>(null)
  const onCickImageUpload = () => {
    imageInput.current?.click()
  }

  return (
    <FileInput>
      <input
        type="file"
        onChange={(e) => {
          props.handleFunction(props.number, e)
        }}
        accept={props.accept}
        style={{ display: 'none' }}
        ref={imageInput}
        multiple
      />
      <img alt="profile" src={props.icon} onClick={onCickImageUpload} />
      <Label>{props.label}</Label>
    </FileInput>
  )
}

export default FileInputs
