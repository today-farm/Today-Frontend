const now = new Date() // 현재 날짜 및 시간
const todayYear = now.getFullYear()
const todayMonth = now.getMonth() + 1
const todayDate = now.getDate()

export const todayYearMonthDate = () => {
  return `${todayYear}년 ${todayMonth}월 ${todayDate}일`
}

export const todayYearMonth = () => {
  return `${todayYear}년 0${todayMonth}월`
}
