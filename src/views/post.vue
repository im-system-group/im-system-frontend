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
                    <div class="user-avator" style="max-width: 60px">
                        <div class="user-avator__container" style="height: 60px;min-width: 60px;width: 60px;">
                            <div style="max-width: 100%;">
                                <div class="user-avator__sizer" style="padding-bottom: 100%;">
                                </div>
                                <div class="user-avator__image" :style="`background-image: url('/img/default_avator.jpg');background-position: center center;`"></div>
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

                    <div class="user-avator" style="max-width: 60px">
                        <div class="user-avator__container" style="height: 60px;min-width: 60px;width: 60px;">
                            <div style="max-width: 100%;">
                                <div class="user-avator__sizer" style="padding-bottom: 100%;">
                                </div>
                                <div class="user-avator__image" :style="`background-image: url('${post_data.author_avator}');background-position: center center;`"></div>
                            </div>
                        </div>

                        <div class="name text-center">{{ post_data.author }}</div>
                    </div>

                </div>




                <div class="col-sm-10">

                    <div class="im-card-dot left"></div>
                    <div class="im-card-dot right"></div>

                    <div class="im-card" style="min-height: 50vh">


                        <div class="im-card__header mt-4">
                            <div class="im-card__title">
                                {{ post_data.title }}
                            </div>

                            <div class="im-card__action">
                                <button class="button icon">
                                    <span class="mdi mdi-share-variant"></span>
                                </button>
                                <button class="button icon ml-2">
                                    <span class="mdi mdi-thumb-up"></span>
                                </button>
                                <div class="mt-2 ml-2" style="min-width: 4em">
                                    {{ post_data.thumbsup }}
                                </div>
                            </div>
                        </div>

                        <div class="im-card__content">
                            <div class="im-card__text" v-text="post_data.content" style="white-space: pre-wrap;">
                            </div>

                            <div class="im-reply-card mt-4">
                                    <textarea
                                        class="im-reply-textarea"
                                        placeholder="回應..."
                                        rows="2"
                                        cols="50"
                                    ></textarea>
                            </div>


                            <div v-for="(item, index) in post_data.reply_list" class="im-reply-card mt-4" :key="index">
                                <div class="im-reply-card__content d-flex">


                                    <div class="user-avator" style="max-width: 60px">
                                        <div class="user-avator__container" style="height: 60px;min-width: 60px;width: 60px;">
                                            <div style="max-width: 100%;">
                                                <div class="user-avator__sizer" style="padding-bottom: 100%;">
                                                </div>
                                                <div class="user-avator__image" :style="`background-image: url('${item.author_avator}');background-position: center center;`"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="im-reply-card__text ml-2">
                                        <div class="name">{{ item.author }}</div>
                                        <div class="mt-2" v-text="item.content"></div>
                                    </div>

                                </div>
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
        post_data: null
    }),
    mounted() {
        let post_id = this.$route.params.id
        console.log(post_id)


        let self = this;
        this.axios.get('/api/post.json')
            .then(function (response) {
                let data = response.data

                self.loading = false
                self.post_data = data
            })
            .catch(function (error) {
                console.log(error);
                self.error = true;
            })
            .then(function () {
                // always executed
            });
        /*
        this.post_data = {
            title: '安安 這是測試文章',
            content: 'https://www.dcard.tw/f/dd52/p/233866262 \n 对我个人而言，中午吃什么不仅仅是一个重大的事件，不经意间这样说过，不要回避苦恼和困难，挺起身来向它挑战，进而克服它。这句话语虽然很短，但令我浮想联翩。 我们不得不面对一个非常尴尬的事实，那就是， 一般来讲，我们都必须务必慎重的考虑考虑。 中午吃什么，发生了会如何，不发生又会如何。 问题的关键究竟为何？ 中午吃什么因何而发生？ 卢梭在不经意间这样说过，浪费时间是一桩大罪过。我希望诸位也能好好地体会这句话。 带着这些问题，我们来审视一下中午吃什么。 罗素·贝克曾经提到过，一个人即使已登上顶峰，也仍要自强不息。带着这句话，我们还要更加慎重的审视这个问题： 每个人都不得不面对这些问题。 在面对这种问题时， 每个人都不得不面对这些问题。 在面对这种问题时， 生活中，若中午吃什么出现了，我们就不得不考虑它出现了的事实。 对我个人而言，中午吃什么不仅仅是一个重大的事件，还可能会改变我的人生。 这样看来， 吉格·金克拉曾经提到过，如果你能做梦，你就能实现它。这句话语虽然很短，但令我浮想联翩。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 带着这些问题，我们来审视一下中午吃什么。 卡耐基在不经意间这样说过，我们若已接受最坏的，就再没有什么损失。这似乎解答了我的疑惑。 了解清楚中午吃什么到底是一种怎么样的存在，是解决一切问题的关键。 经过上述讨论， 经过上述讨论， 中午吃什么的发生，到底需要如何做到，不中午吃什么的发生，又会如何产生。 我认为， 现在，解决中午吃什么的问题，是非常非常重要的。 所以， 中午吃什么的发生，到底需要如何做到，不中午吃什么的发生，又会如何产生。 从这个角度来看， 既然如何。',
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
}
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
    background-color: rgb(0, 0, 0, .4);
    border-radius: 8px;
}

.im-reply-card__content {
    padding: 1em 1em;
}

.im-reply-card__text {
    white-space : pre-wrap ;
}

.im-reply-card .name {
    color: #FFFFFF;
    letter-spacing: .05em;
    font-family: 'Electrolize', sans-serif;
}
</style>