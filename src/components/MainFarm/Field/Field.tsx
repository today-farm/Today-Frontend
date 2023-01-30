import React from 'react'
import { FiledWrapper, Text, FenceImg, Crops, CropImg } from './style'

interface Iprops {
  text?: string
  cropStatus?: string
}
export default function Filed(props: Iprops) {
  const showCrop = (cropStatus: string) => {
    let arr = []
    for (let i = 0; i < 4; i++) {
      cropStatus === 'seed'
        ? arr.push(<CropImg src="/img/crop/seed.png" />)
        : cropStatus === 'sprout'
        ? arr.push(<CropImg src="/img/crop/sprout.png" />)
        : cropStatus === 'growingSprout'
        ? arr.push(<CropImg src="/img/crop/tree.png" />)
        : // TODO : 과일 나무 이미지 저장 후 변경해야함
          arr.push(<CropImg src="/img/crop/tree.png" />)
    }
    return arr
  }
  return (
    <FiledWrapper>
      {!props.cropStatus ? (
        <Text>{props.text}</Text>
      ) : props.cropStatus === 'SEED' ? (
        <Crops>{showCrop('seed')}</Crops>
      ) : props.cropStatus === 'SPROUT' ? (
        <Crops>{showCrop('sprout')}</Crops>
      ) : props.cropStatus === ' GROWING_SPROUT' ? (
        <Crops>{showCrop('growingSprout')}</Crops>
      ) : (
        <Crops>{showCrop('fruitCrop')}</Crops>
      )}
      <FenceImg src="/img/fence.png" />
    </FiledWrapper>
  )
}
