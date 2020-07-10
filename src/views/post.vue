<template>
  <div class="im-bg">
    <!-- navigation -->
    <button @click="$router.go(-1)" class="navigation-button left fixed">
      <span class="mdi mdi-arrow-left"></span>
    </button>

    <div class="container mx-auto" style="max-width: 1028px;margin-top:8vh;min-height: 100vh">
      <!-- 取得資料中 -->
      <div v-if="loading" class="row">
        <div class="col-sm-2">
          <div class="user-avator mx-auto" style="max-width: 60px">
            <div
              class="user-avator__container"
              style="height: 60px;min-width: 60px;width: 60px;; box-sizing: border-box;"
            >
              <div style="max-width: 100%;">
                <div class="user-avator__sizer" style="padding-bottom: 100%;"></div>
                <div
                  class="user-avator__image"
                  :style="`background-image: url('/img/default_avator.jpg');background-position: center center;`"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-10">
          <div class="im-card-dot left"></div>
          <div class="im-card-dot right"></div>

          <div class="im-card" style="min-height: 50vh">
            <div class="im-card__content">
              <div class="im-card__text">
                <loading-spinner style="margin-top: 5vh;margin-bottom: 5vh;"></loading-spinner>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 資料取得成功-->
      <div v-else class="row">
        <div class="col-sm-2">
          <im-avator
            :src="post_data.author_avator"
            :borderColor="post_data.author_avator_color"
            width="60px"
            style="margin: 0 auto;"
          ></im-avator>
          <div class="name text-center">{{ post_data.author }}</div>
        </div>

        <div class="col-sm-10">
          <div class="im-card-dot left"></div>
          <div class="im-card-dot right"></div>

          <div class="im-card" style="min-height: 50vh">
            <div class="im-card__header mt-4">
              <div class="im-card__title">{{ post_data.title }}</div>

              <div class="im-card__action">
                <button class="button icon">
                  <span class="mdi mdi-share-variant"></span>
                </button>
                <button class="button icon ml-2" @click="post_data.clickThumb">
                  <span class="mdi mdi-thumb-up"></span>
                </button>
                <div class="mt-2 ml-2" style="min-width: 4em">{{ post_data.thumbsup }}</div>
              </div>
            </div>

            <div class="im-card__content">
              <div class="im-card__text" v-html="post_data.content" style="white-space: pre-wrap;"></div>
              <img v-if="post_data.article_photo" :src="post_data.article_photo" width="100%" />
              <div
                v-for="(item, index) in post_data.display_comments"
                class="im-reply-card mt-4"
                :key="index"
              >
                <div class="im-reply-card__content d-flex">
                  <div class="user-avator" style="max-width: 60px">
                    <div
                      class="user-avator__container"
                      :style="`height: 60px;min-width: 60px;width: 60px;border: 2px solid ${item.author_avator_color}; box-sizing: border-box;`"
                    >
                      <div style="max-width: 100%;">
                        <div class="user-avator__sizer" style="padding-bottom: 100%;"></div>
                        <div
                          class="user-avator__image"
                          :style="`background-image: url('${item.author_avator}');background-position: center center;`"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div class="im-reply-card__text ml-2">
                    <div class="name">{{ item.author }}</div>
                    <div class="mt-2" v-html="item.content"></div>
                  </div>
                </div>
              </div>

              <div class="im-reply-card mt-4">
                <textarea
                  class="im-reply-textarea"
                  placeholder="回應..."
                  rows="2"
                  cols="50"
                  v-model="post_comment_text"
                  @keypress="postComment"
                  :disabled="is_post_comment_sending"
                ></textarea>
              </div>
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
    error: null,
    post_data: null,
    post_comment_text: "",
    is_post_comment_sending: false,
  }),
  methods: {
    postComment(event) {
      if (!this.is_post_comment_sending && !event.shiftKey && event.keyCode === 13) {
        event.preventDefault();
        this.is_post_comment_sending = true;

        var post_id = this.$route.params.id;
        var self = this;

        this.axios
          .post(
            "/api/post-comments-api.php?id=" + post_id,
            "textarea=" + encodeURI(this.post_comment_text),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(async function(response) {
            var data = response.data;

            if (data.message === "回覆已添加") {
              self.post_data.display_comments = await new Promise(resolve => {
                self.axios
                  .get("/api/article-comments-api.php?id=" + post_id)
                  .then(function(response) {
                    var data = response.data;

                    resolve(
                      data.comment_id.reduce(function(list, id, i) {
                        var text = data.text[i];
                        var author = data.author[i];
                        var author_avator = data.author_avator[i];
                        var author_avator_color = data.author_avator_color[i];

                        list.push({
                          id,
                          content: text,
                          author,
                          author_avator,
                          author_avator_color
                        });

                        return list;
                      }, [])
                    );
                  });
              });

              self.post_comment_text = "";
              self.is_post_comment_sending = false;
            }
          })
          .catch(() => {
              self.is_post_comment_sending = false;
          });
      }
    }
  },
  mounted() {
    let post_id = this.$route.params.id;

    let self = this;
    self.axios
      .get("/api/article-text-api.php?id=" + post_id)
      .then(async function(response) {
        let data = response.data;

        data.thumbsup = parseInt(data.thumbsup);

        data.clickThumb = function() {
          self.axios
            .post("/api/post-like-api.php", "id=" + post_id, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              let responseData = response.data;

              if (responseData.message === "已like") {
                data.thumbsup++;
              } else {
                data.thumbsup--;
              }
            });
        };

        data.display_comments = await new Promise(resolve => {
          self.axios
            .get("/api/article-comments-api.php?id=" + post_id)
            .then(function(response) {
              var data = response.data;

              resolve(
                data.comment_id.reduce(function(list, id, i) {
                  var text = data.text[i];
                  var author = data.author[i];
                  var author_avator = data.author_avator[i];
                  var author_avator_color = data.author_avator_color[i];

                  list.push({
                    id,
                    content: text,
                    author,
                    author_avator,
                    author_avator_color
                  });

                  return list;
                }, [])
              );
            });
        });

        self.post_data = data;
        self.loading = false;
      })
      .catch(function(error) {
        console.log(error);
        self.error = true;
      })
      .then(function() {
        // always executed
      });
    /*
        this.post_data = {
            title: '安安 這是測試文章',
            content: 'https://www.dcard.tw/f/dd52/p/233866262 \nowo',
            author: 'SnowFireWolf',
            author_avator: 'https://imsystem.site/image/def_picture.jpg',
            thumbsup: 111,
            reply_list: [
                {
                    content: '挖喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔',
                    author: 'SnowFireWolf',
                    author_avator: 'https://imsystem.site/image/def_picture.jpg'
                },
                {
                    content: '挖喔喔喔喔喔喔喔喔\n喔喔喔喔喔喔喔喔喔喔喔喔喔',
                    author: 'Phoenix (test)',
                    author_avator: 'https://imsystem.site/upload/9313e654702dc925d1384dbcaadc8d30.png'
                },
                {
                    content: '挖喔喔喔喔喔喔喔喔\n？？？？',
                    author: 'MuXia (test)',
                    author_avator: 'https://imsystem.site/upload/b2d69d5506bb6334ec739af0c56cef63.jpg'
                }
            ]
        }*/
  }
};
</script>

<style>
.im-reply-card .im-reply-textarea::placeholder {
  color: rgb(221, 221, 221);
  opacity: 1;
}

.im-reply-card .im-reply-textarea {
  width: 100%;
  color: #fff;
  background: transparent;
  border: none;
  margin-bottom: 1em;
  padding: 1em 1em;
  outline: 0;
}

.im-reply-card {
  background-color: rgb(0, 0, 0, 0.4);
  border-radius: 8px;
}

.im-reply-card__content {
  padding: 1em 1em;
}

.im-reply-card__text {
  white-space: pre-wrap;
}

.im-reply-card .name {
  color: #ffffff;
  letter-spacing: 0.05em;
  font-family: "Electrolize", sans-serif;
}
</style>