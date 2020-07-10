<template>
  <div>
    <div class="im-bg">
      <router-link v-if="!open_edit" to="/list" tag="button" class="navigation-button left fixed">
        <span class="mdi mdi-arrow-left"></span>
      </router-link>

      <button v-else @click="edit_m" class="navigation-button left fixed">
        <span class="mdi mdi-close"></span>
      </button>

      <div class="container mx-auto" style="max-width: 920px;margin-top:8vh;">
        <div class="im-card" style="min-height: 100vh">
          <!-- 取得資料中 -->
          <div v-if="loading" class="im-card__content">
            <loading-spinner style="margin-top: 5vh;margin-bottom: 5vh;"></loading-spinner>
          </div>

          <!-- 取得成功 -->
          <div v-else class="im-card__content">
            <im-avator
              :src="user_data.avator_url"
              :borderColor="user_data.user_avator_color"
              width="120px"
              style="margin: 0 auto;"
            ></im-avator>

            <h3 class="mt-2 text-center display-1 im-font">{{ user_data.profile.name }}</h3>

            <div class="mt-4">
              <div class>使用者名稱</div>
              <div class="im-font">@{{ user_data.profile.screen_name }}</div>
            </div>

            <div class="mt-4">
              <div class>電子郵件</div>
              <div class="im-font">{{ user_data.profile.email }}</div>
            </div>

            <div class="mt-4">
              <div class>更改密碼</div>
              <p class="im-font">Coming soon...</p>
            </div>

            <div class="mt-4">
              <div class>顯示語言</div>
              <div class="im-font">
                Coming soon...
                <!--{{ $t('screen_lang' )}}
							<select v-model="$i18n.locale">
							<option
							v-for="(lang, i) in langs"
							:key="`Lang${i}`"
							:value="lang.value"
							>{{ lang.name }}</option>
                </select>-->
              </div>
            </div>

            <div class="mt-4 d-flex">
              <button @click="edit_m" class="button outlined">編輯個人資料</button>
              <button @click="logout" class="button outlined ml-auto">登出帳號</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- edit modal -->
    <div v-if="!loading" class="im-modal" style="overflow-y: auto" :class="{'active': open_edit}">
      <div class="im-modal-bg"></div>
      <div class="im-modal__card">
        <div class="im-card">
          <div class="im-card__content" style="min-height: 50vh">
            <h3>編輯資訊</h3>

            <div class="im-setting user-avator mx-auto" :style="`max-width: 120px`">
              <div
                class="user-avator__container"
                :style="`height: 120px;min-width: 120px;width: 120px;border: 2px solid ${new_settings.user_avator_color};`"
              >
                <div style="max-width: 100%;">
                  <div class="user-avator__sizer" style="padding-bottom: 100%;"></div>
                  <div
                    class="user-avator__image"
                    :style="`background-image: url('${preview_avator}');background-position: center center;`"
                  ></div>
                </div>
                <div class="im-file__content">
                  <input type="file" @change="fileOnChange" />
                  <div class="im-file__info text-center">
                    <span class="mdi mdi-plus" style="font-size: 2em"></span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="have_new_photo" class="text-center mt-4">
              <button @click="updateAvator" class="button outlined">更新圖片</button>
            </div>

            <div class="mt-1">名稱</div>

            <input class="im-textarea mt-2" placeholder="使用者名稱" v-model="new_settings.profile.name" />

            <div class="mt-1">Email</div>

            <input
              class="im-textarea mt-2"
              placeholder="Email"
              v-model="new_settings.profile.email"
            />

            <div class="d-flex">
              <button class="button outlined mt-2 ml-auto" @click="clickUpdate">編輯完成</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    error: false,

    user_data: null,

    open_edit: false,
    new_settings: null,

    new_avator_file: null,
    preview_avator: null,
    dragging: false,
    have_new_photo: false,

    langs: [
      {
        name: "English",
        value: "en"
      },
      {
        name: "中文（台灣）",
        value: "tw"
      }
    ]
  }),
  methods: {
    edit_m() {
      let open_edit = this.open_edit;
      //反轉
      this.open_edit = !open_edit;

      //如果打開 新文章 --- modal 鎖定滾動
      if (open_edit) document.body.style = "overflow-y: auto;";
      else document.body.style = "overflow-y: hidden;";
    },
    fileOnChange(e) {
      // get file
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0]);
    },
    createFile(file) {
      if (file.type.match("image/png.*")) {
        // png
        this.dragging = false;
      } else if (file.type.match("image/jpeg.*")) {
        //jpg
        this.dragging = false;
      } else {
        alert("不支援此類型檔案");
        return;
      }

      if (file.size > 5000000) {
        alert("檔案大小不能超過 5 MB.");
        this.dragging = false;
        return;
      }

      this.have_new_photo = true;
      this.new_avator_file = file;

      // image preview
      let reader = new FileReader();
      let self = this;

      reader.onload = e => {
        self.preview_avator = e.target.result;
      };

      reader.readAsDataURL(file);

      //drag false
      this.dragging = false;
    },
    // 更新設定
    async clickUpdate() {
      var formData = new FormData();
      formData.append("name", this.new_settings.profile.name);
      formData.append("email", this.new_settings.profile.email);

      let response = await this.axios.post(
        "/api/change-profile-api.php",
        formData
      );
      let data = response.data;

      if (data.message === "success") {
        self.user_data = { ...self.user_data, ...self.new_settings };
      } else if (data.message === "error") {
        alert("資料未填寫完整");
      }

      //關閉請求
      this.edit_m();
    },
    // 更新 avator
    updateAvator() {
      let avator_file = this.new_avator_file;
      // form 處理
      let formData = new FormData();

      if (avator_file) {
        formData.append("file", avator_file);
      }

      this.axios
        .post("/api/change-profile-photo.php", formData)
        .then(response => {
          if (response.data.message === "圖片已更新") {
            this.file = null;
            this.have_new_photo = false;
            this.edit_m();
            location.reload();
          }
        })
        .catch(console.log)
        .then(function() {
          // always executed
        });
    },
    // 登出
    logout() {
      let self = this;

      this.axios
        .post("/api/logout-api.php")
        .then(function(response) {
          let data = response.data;

          //staus is ok
          if (data.message === "ok") {
            //set data 到 store
            self.$store.state.user_profile = null;
            self.$router.push("/");
          } else {
            alert("發生錯誤");
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
      //
    }
  },
  computed: {
    /*user_data() {
			return this.$store.state.user_data
		}*/
  },
  mounted() {
    //console.log(this.$i18n.locale);

    let self = this;

    // 取得 profile 資料
    this.axios
      .get("/api/profile-api.php")
      .then(function(response) {
        let data = response.data;

        self.loading = false;

        self.user_data = data;
        self.new_settings = data;
        self.preview_avator = data.avator_url;
      })
      .catch(function() {
        self.error = true;
      })
      .then(function() {
        // always executed
      });
    //
  }
};
</script>

<style>
.user-avator.im-setting:hover {
  cursor: pointer;
}
.user-avator.im-setting:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
