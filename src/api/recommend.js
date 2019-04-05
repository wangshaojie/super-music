import axios from './http'
import {commonParams} from './conf'

const recommend = {
  async getRecommend() {
    const data = Object.assign({}, commonParams, {
      platform: 'h5',
      uin: 0
    })

    const res = await axios.get('/api/recommend', {
      params: data
    })

    return Promise.resolve(res.data)
  }
}

export default recommend