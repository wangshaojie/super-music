<template>
  <transition name="slide">
    <music-list :songs="songs" :bj-image="bjImage" :title="title">

    </music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/conf'
import { createSong } from '@/assets/js/Song'

export default {
  computed: {
    bjImage() {
      return this.singer.avatar
    },
    title() {
      return this.singer.name
    },
    ...mapGetters([
      'singer'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  created() {
    this.singerList()
  },
  methods: {
    singerList() {
      var id = this.singer.id // 从vuex里获取
      if (!id) {
        this.$router.push({
          path: '/singer'
        })
        return
      }
      this.$api.singer.getSingerDetail(id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.songs = this.normalizeSinger(res.data.list)
        }
      })
    },
    normalizeSinger(list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }

}
</script>

<style scopod lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";

  .singer-detail
    position fixed
    z-index:100
    top:0
    right:0
    bottom:0
    left:0
    background-color : $color-background

  .slide-enter-active, .slide-leave-active
    transition : all 0.3s

  .slide-enter, .slide-leave-to
    transform : translate3d(100%, 0, 0)
</style>
