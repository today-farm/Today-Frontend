import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  GreenComponentWrapper,
  NonActiveButton,
} from '../../../style/CommonStyles'
import Header from '../../Header/Header'
import { FeelingWrapper, Title, Feelings, Feeling } from './style'
import { todayYearMonthDate } from '../TodayDate'

interface Feelings {
  img: string
  name: string
}

interface Iprops {
  setTodayFeeling: Dispatch<SetStateAction<string>>
  setOpenFeelingPage: Dispatch<SetStateAction<boolean>>
}

function TodayFeeling(props: Iprops) {
  const [feelings, setFeelings] = useState<any>()

  const handleFeeling = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.setTodayFeeling(e.currentTarget.name)
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3000/data/feeling.json`)
      .then((res) => setFeelings(res.data))
  }, [])

  return (
    <GreenComponentWrapper>
      <Header title={todayYearMonthDate()} />
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
                name={x.name}
                style={{
                  backgroundImage: 'url(' + x.img + ')',
                }}
                onClick={(e) => {
                  handleFeeling(e)
                }}
              />
            )
          })}
        </Feelings>
      </FeelingWrapper>
      <NonActiveButton
        onClick={() => {
          props.setOpenFeelingPage(false)
        }}
      >
        다음
      </NonActiveButton>
    </GreenComponentWrapper>
  )
}

export default TodayFeeling
