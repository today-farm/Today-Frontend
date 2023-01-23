import React from 'react'
import { FiledWrapper, Text, FenceImg } from './style'

interface Iprops {
  text: string
}
export default function Filed(props: Iprops) {
  return (
    <FiledWrapper>
      <Text>{props.text}</Text>
      <FenceImg src="/img/fence.png" />
    </FiledWrapper>
  )
}
