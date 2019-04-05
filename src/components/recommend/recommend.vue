<template>
    <div class="recommend">
        <scroll class="recommend-content" :data="discList" ref="scroll">
          <div>
            <div v-if="recommends.length" class="slider-wrapper">
              <slider>
                <div v-for="item in recommends" :key="item.id">
                  <a :href="item.linkUrl">
                    <img :load="LoadImg" :src="item.picUrl">
                  </a>
                </div>
              </slider>
            </div>
            <div class="recommend-list">
              <h1 class="list-title">热门歌单推荐</h1>
              <ul>
                <li v-for="item in discList" :key="item.content_id" class="item">
                  <div class="icon">
                    <img width="60" height="60" v-lazy="item.cover" />
                  </div>
                  <div class="text">
                    <h2 class="name">{{item.title}}</h2>
                    <p class="desc">{{item.username}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="loading-container" v-show="!discList.length">
            <loading></loading>
          </div>
        </scroll>
    </div>
</template>

<script>
import Slider from 'base/slider/slider'
import {ERR_OK} from '@/api/conf'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created() {
    this.getReommend()
    this.getPlayList()
  },
  mounted() {

  },
  methods: {
    getReommend() {
      this.$api.recommend.getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    getPlayList() {
      this.$api.playlist.getPlayList().then((res) => {
        console.log(res.recomPlaylist.data)
        if (res.recomPlaylist.code === ERR_OK) {
          this.discList = res.recomPlaylist.data.v_hot
        }
      })
    },
    LoadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider-wrapper
    position: relative
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>