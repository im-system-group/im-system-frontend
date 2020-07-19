<template>
  <article-view :article="item" :comments="comments" @back="$router.push('/articles')" />
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState("article", [
      "item",
      "comments",
      "isItemLoading",
      "isCommentsLoading",
      "isItemLoaded",
      "isCommentsLoaded"
    ])
  },
  methods: {
    ...mapActions("article", [
      "loadItem",
      "loadComments",
      "dropItemAndComments"
    ]),
    ...mapMutations("article", ["set"])
  },
  async mounted() {
    // const { id } = this.$route.params
    // await this.loadItem({ id })
    // await this.loadComments({ id })

    this.set({
      item: {
        id: 6,
        posterName: "JOEZ Cafe",
        title: "Check this OOOOOut!",
        content:
          "YOYOYO~<br>全新的JOEZ CAFE在經過一番波折之後終於要在近期<br>重。新。開。張。啦!!!<br>我們是原址重建喔<br>而且感謝大家的幫忙<br>有錢出錢有力出力(喔抱歉螢幕前面的你只有鍵盤重建沒錯就是在說你)<br>進度一整個就是比預期快很多啊<br>我本來還很擔心會錯過山本釀酒廠的新口味啤酒上市活動呢<br><br>總之<br>明天開始試營運<br>歡迎舊雨新知來捧場<br>打卡就送酒一瓶<br>Happy Hour消費最高的客人可以免費點歌<br>讓最強BASS手幫你演奏一曲<br><br>以上<br>JOE OUT!(Mic Drop",
        likesCount: 353
      },
      comments: [
        {
          id: 0,
          commenterName: "moonin",
          content: "終於等到了 細菌王的回歸"
        },
        {
          id: 1,
          commenterName: "Xzavis",
          content: "還有Yamameto的回歸"
        },
        {
          id: 2,
          commenterName: "MatsuyamaC",
          content: "Yamameto救了老闆一命耶，感覺欠了山本釀酒場很大的人情wwwww"
        },
        {
          id: 3,
          commenterName: "foreheadless",
          content: "那天去JOEZ的話可以看到PAFF、NEKO、Xenon"
        },
        {
          id: 4,
          commenterName: "JOE",
          content: "暴雷你們就不會來了吧<br>我才不會透漏咧<br>薛丁格的特別來賓啦"
        },
        {
          id: 5,
          commenterName: "Xenon",
          content: "你真的知道薛丁格是誰嗎?"
        },
        {
          id: 6,
          commenterName: "Duncan128",
          content: "來了wwww 高知識分子的暴擊"
        },
        {
          id: 7,
          commenterName: "ConneR",
          content: "他會說是馬丁尼的好朋友。"
        },
        {
          id: 8,
          commenterName: "TobeTobe",
          content: "對細菌王來說這連番攻擊太殘酷了XDDD"
        },
        {
          id: 9,
          commenterName: "KamiCherry",
          content: "ConneR老師怎麼會出現在這裡wwwwwww"
        },
        {
          id: 10,
          commenterName: "Uxi",
          content: "天阿表示那天也會看到ConneR老師嗎<br>根本一次滿足一堆願望啊!!!!"
        },
        {
          id: 11,
          commenterName: "JOE",
          content: "ConneR我要把你的橄欖換成鬼椒"
        },
        {
          id: 12,
          commenterName: "RyanRii",
          content: "撞球桌還在吧? 紀錄重置了我要挑戰!!!"
        },
        {
          id: 13,
          commenterName: "JaneHikaru",
          content: "我發現沒人敢問新口味的酒是甚麼<br>XDDDDDDDD"
        },
        {
          id: 14,
          commenterName: "Ulxy_34RTH",
          content: "畢竟前一款實在太Hardcore了....."
        },
        {
          id: 15,
          commenterName: "FreeFinder",
          content: "只有BASS演奏嗎沒有其他人??"
        }
      ]
    });
  },
  beforeDestroy() {
    // this.dropItemAndComments()
  }
};
</script>
