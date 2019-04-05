<template>
    <div class="singer">
        <list-view :data="singers" @select="selectSinger">
        </list-view>
        <router-view></router-view>
    </div>
</template>

<script>
import { ERR_OK } from '@/api/conf'
import utils from '@/assets/js/utils'
import Singer from '@/assets/js/Singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'

const SINGER_HOT_NAME = '热门'
const SINGER_HOT_NUMBER = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this.getSingerList()
  },
  components: {
    ListView
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    getSingerList() {
      this.$api.singer.getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = res.singerList.data.singerlist
        }

        // 给数据李添加name的首拼
        for (let i = 0; i < this.singers.length; i++) {
          this.singers[i].fIndex = utils.piny(this.singers[i].singer_name)
        }

        this.singers = this.normalizeSinger()
        // console.log(this.singers)
      })
    },
    normalizeSinger() {
      const data = this.singers
      const map = {
        hot: {
          title: SINGER_HOT_NAME,
          items: []
        }
      }
      data.forEach((item, index) => {
        if (index <= SINGER_HOT_NUMBER) {
          map.hot.items.push(new Singer({
            id: item.singer_mid,
            name: item.singer_name
          }))
        }

        const key = item.fIndex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.singer_mid,
          name: item.singer_name
        }))
      })

      // 为了排序
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
