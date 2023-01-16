import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  GreenComponentWrapper,
  NonActiveButton,
} from '../../../style/CommonStyles'
import Header from '../../Header/Header'
import { FeelingWrapper, Title, Feelings, Feeling } from './style'
import { todayTime } from '../TodayDate'

interface Feelings {
  img: string
  name: string
}

function TodayFeeling() {
  const [feelings, setFeelings] = useState<any>()
  const [todayFeeling, setTodayFeeling] = useState<string>('')
  const handleFeeling = (name: any) => {
    setTodayFeeling(name)
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3000/data/feeling.json`)
      .then((res) => setFeelings(res.data))
  }, [])

  return (
    <GreenComponentWrapper>
      <Header title={todayTime()} />
      <FeelingWrapper>
        <Title>
          오늘의 기분을
          <br />
          골라주세요!
        </Title>
        <Feelings>
          {feelings?.map((x: any) => {
            return (
              <Feeling
                src={x.img}
                alt={x.name}
                onClick={() => {
                  handleFeeling(x.name)
                }}
              />
            )
          })}
        </Feelings>
      </FeelingWrapper>
      <Link to="/post">
        <NonActiveButton>다음</NonActiveButton>
      </Link>
    </GreenComponentWrapper>
  )
}

export default TodayFeeling
