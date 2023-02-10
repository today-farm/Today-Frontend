import { useQuery } from 'react-query'
import { useCookies } from 'react-cookie'
import { GreenComponentWrapper } from '../../style/CommonStyles'
import Footer from './../Footer/Footer'
import { todayYearMonthDate } from '../Today/TodayDate'
import { Title } from '../../style/CommonStyles'
import Field from './Field/Field'
import Menu from '../Menu/Menu'
import { Icrops } from '../Interface'
import { getMainFarm } from './../../api'

export default function MainFarm() {
  const userId = localStorage.getItem('userId')
  const [cookies] = useCookies(['accessToken'])
  const { isLoading, data } = useQuery<Icrops[]>('crops', () =>
    getMainFarm(userId, cookies.accessToken),
  )
  return (
    <GreenComponentWrapper>
      <Menu />
      <Title>{todayYearMonthDate()}</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Field
            text={'첫 번째 하루를 기록해보세요.'}
            cropStatus={data![0].cropStatus}
          />
          <Field
            text={'8개의 기록이 필요해요.'}
            cropStatus={data![1]?.cropStatus}
          />
          <Field
            text={'15개의 기록이 필요해요.'}
            cropStatus={data![2]?.cropStatus}
          />
          <Field
            text={'22개의 기록이 필요해요'}
            cropStatus={data![3]?.cropStatus}
          />
        </>
      )}

      <Footer main={true} />
    </GreenComponentWrapper>
  )
}
