import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: '推荐',
      component: Recommend
    },
    {
      path: '/singer',
      name: '歌手',
      component: Singer,
      children: [
        {
          path: ':id',
          name: '歌手详情',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: '排行榜',
      component: Rank
    },
    {
      path: '/search',
      name: '搜索',
      component: Search
    }
  ]
})
