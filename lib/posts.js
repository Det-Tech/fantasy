import axios from 'axios'
import {BASE_URL, APP_ID} from './constants'

export const getPostsList = async () => {
  const posts = await axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID } })
  .then(({data}) => {
    return data
  })

  return posts
}