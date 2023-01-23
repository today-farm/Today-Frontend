import styled from 'styled-components'

export const CalenderHeader = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  padding: 50px 20px 20px 20px;
`

export const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`

export const CalenderWrapper = styled.div`
  /* width: 342px;
  height: 432px; */
  /* padding: 10px; */
  padding: 30px 15px;
  background-color: #fff;
  border-radius: 30px;
  border: 2px solid var(--light-green);
`
export const Month = styled.table`
  width: 330px;
  height: 330px;
  border: none;
`
export const Dates = styled.tbody`
  text-align: center;
`
export const Week = styled.ul`
  width: 100%;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  font-size: var(--mid);
`
export const DayOfWeek = styled.li`
  &:nth-child(1) {
    color: var(--red);
  }
  &:last-child {
    color: var(--blue);
  }
`
export const CheckToday = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--light-gray);
  margin-left: 8px;
  margin-top: 5px;
`
export const Day = styled.td``
