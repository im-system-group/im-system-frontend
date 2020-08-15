<template>
  <div class="container">

    <!-- loading -->
    <template v-if="isItemsLoading">
      取得 iM 文章列表中...
    </template>

    <!-- loaded -->
    <template v-else>

      <div class="d-flex">
        <button @click.prevent="setPage(currPage - 1)">上一頁</button>
        <button class="ml-auto" @click.prevent="setPage(currPage + 1)">下一頁</button>
      </div>

      <input v-model="filter_name" type="text" />

      <!-- articles -->
      <pre style="white-space: pre-wrap">
        <div v-for="(item, index) in filteredRows.slice(pageStart, pageStart + maxViewPage)" style="margin-top: 1em;" :key="index">
            <div class="title" v-text="item">
            </div>
        </div>
      </pre>

      <!-- pagination -->
      <div class="d-flex">
        <button @click.prevent="setPage(currPage - 1)">上一頁</button>
        <button class="ml-auto" @click.prevent="setPage(currPage + 1)">下一頁</button>
      </div>
  
    </template>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  data: () => ({
    // 每頁最大顯示 10 列
    maxViewPage: 10,

    // 當前頁數
    currPage: 1,

    // 過濾名稱
    filter_name: ''
  }),
  computed: {
    // store state: articles
    ...mapState("articles", [
      "items",
      "isItemsLoading",
      "isItemsLoaded"
    ]),

    pageStart: function(){
      return (this.currPage - 1) * this.maxViewPage;
    },

    // 總頁數 除以 每頁顯示最大幾列
    totalPage: function(){
      // 我們需要後端回傳文章數
      //return Math.ceil(this.filteredRows.length / this.maxViewPage);
      // 目前設定 100 列資料
      return Math.ceil(100 / this.maxViewPage);
    },

    filteredRows: function(){
      // 因為 JavaScript 的 filter 有分大小寫，
      // 所以這裡將 filter_name 與 rows[n].name 通通轉小寫方便比對。
      let filter_name = this.filter_name.toLowerCase();

      // 如果 filter_name 有內容，回傳過濾後的資料，否則將原本的 rows 回傳。
      return ( this.filter_name.trim() !== '' ) ?
        this.items.filter(function(data){
          if(data.poster_name !== null){
            return data.poster_name.toLowerCase().indexOf(filter_name) > -1;
          }
        }) :
      this.items;
    },
  },
  watch: {
    // 如果 currPage 值有變
    currPage(page) {
      this.loadItemsByPage(page)
      console.log('watch: ' + page)
      console.log(this.items)
    }
  },
  methods: {
    // store actions: articles
    ...mapActions("articles", ["loadItems"]),

    // 載入 items 請求
    loadItemsByPage(viewPage) {
      this.loadItems({ page: viewPage })
    },

    // 設定 page
    setPage: function(page) {
      console.log('setpage: ' + page)
      // page 值不能小於 0 不能大於總頁數
      if( page <= 0 || page > this.totalPage ){
        console.log('return')
        return;
      }
      this.currPage = page;
    }
  },
  async mounted() {
    // init load items
    this.loadItemsByPage(this.currPage)

    // router: /articles/:page
    // 設定當前 page 
    //this.currPage = this.$route.params.page
    //if (!this.isItemsLoaded) {
    //  let viewPage = this.$route.params.page
    //
    //  this.loadItemsByPage(viewPage)
    //}
  }
}
</script>
