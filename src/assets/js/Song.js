export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${musicData.singer[0].mid}.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C400003Iw2zz2vyLv9.m4a?guid=7318853336&vkey=D8678E8F210F4909F1718AA8E732D5E40F37430EE6AFD208FCCA2B22C28E5C2A0E402BE9BCF3930A4EE431B877176CB7F0FC21A996C6BC99&uin=0&fromtag=66`
    // ws.stream.qqmusic.qq.com${musicData.songmid}.m4a?fromtag=46`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) return ''
  singer.forEach((s) => {
    ret.push(s.name)
  })

  return ret.join('/')
}