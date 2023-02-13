import { API_URL } from '../src/constant'
import axios from 'axios'

export const getMainFarm = (userId: string | null, token: number) => {
  return axios
    .get(`${API_URL}/crop/this-month-user-crops/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data.result.growingCrops
    })
}

export const checkPostToday = (token: string) => {
  return axios
    .get(`${API_URL}/post/check-today-post`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data.result.canWritePost
    })
}
