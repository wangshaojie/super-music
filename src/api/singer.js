import axios from './http'
import {commonParams} from './conf'

const singer = {
  async getSingerList() {
    const data = Object.assign({}, commonParams, {
      platform: 'yqq.json',
      uin: 0,
      data: JSON.stringify({'comm': {'ct': 24, 'cv': 0}, 'singerList': {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1}}})
    })

    const res = await axios.get('/api/singerList', {
      params: data
    })

    return Promise.resolve(res.data)
  }
}

export default singer