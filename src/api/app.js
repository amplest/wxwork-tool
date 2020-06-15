import axios from '@/util/axios'

export const getToken = () => {
  return axios.request({
    url: '/v3/api-uaa/oauth/user/token',
    method: 'post',
    isToken: true,
    headers: {
      Authorization: 'Basic d2ViQXBwOndlYkFwcA=='
    },
    params: {
      username: 'admin',
      password: '123456'
    }
  })
}
