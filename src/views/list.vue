<template>
    <div>
        <div class="im-bg">

            <button @click="compose_m" class="navigation-button left fixed">
                <span v-if="!open_compose" class="mdi mdi-pencil-outline"></span>
                <span v-else class="mdi mdi-close"></span>
            </button>

            <router-link to="settings" tag="button" class="navigation-button right fixed">
                <span class="mdi mdi-cog-outline"></span>
            </router-link>

            <div class="container mx-auto" style="max-width: 1028px;margin-top:8vh;min-height: 100vh">

                <div class="post-control" v-for="(item, index) in post_list" :key="index">

                    <div class="user-avator" style="max-width: 60px">
                        <div class="user-avator__container" style="height: 60px;min-width: 60px;width: 60px;">
                            <div style="max-width: 100%;">
                                <div class="user-avator__sizer" style="padding-bottom: 100%;">
                                </div>
                                <div class="user-avator__image" :style="`background-image: url(${item.author_avator});background-position: center center;`"></div>
                            </div>
                        </div>

                        <div class="name text-center" style="">{{ item.author }}</div>
                    </div>



                    <div class="post-card">
                        <div class="driver"></div>

                        <div class="post-card__content" style="display: flex">
                            <router-link :to="`/post/${item.id}`" tag="div" class="post-card__text">
                                <div class="title">{{ item.title }}</div>
                            </router-link>

                            <div class="post-card__action">
                                <button class="button icon">
                                    <span class="mdi mdi-thumb-up"></span>
                                </button>
                            </div>

                            <div class="post-card__action">
                                <div  style="min-width: 4em">
                                    {{ item.thumbsup }}
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>



        <div class="im-modal" :class="{'active': open_compose}">
            <div class="im-modal-bg">
            </div>
            <div class="im-modal__card">
                <div class="im-card">

                    <div class="im-card__text" style="min-height: 50vh">
                        <h2>新文章</h2>
                        <textarea class="im-textarea mt-2" name="w3review" rows="4" cols="50">
                        At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                        </textarea>

                        <div class="im-file"></div>

                        <button class="button im-post-button mt-2">POST</button>
                    </div>

                </div>
            </div>
        </div>



    </div>
</template>

<script>
export default {
    data: () => ({
        loading: false,
        error: false,
        post_list: null,
        open_compose: false
    }),
    methods: {
        compose_m() {
            this.open_compose = !this.open_compose;
        }
    },
    mounted() {
        let self = this;

        this.axios.get('/api/post.json')
            .then(function (response) {
                console.log(response.data)
                self.loading = false
                self.post_list = response.data
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
    watch: {
    }
}
</script>

<style>
.im-textarea {
    width: 100%;
    color: #fff;
    background: rgba(119, 119, 119, 0.2);
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 1em 1em;
    outline: 0;
}

.im-post-button {
    background: rgba(119, 119, 119, 0.2);
    border: 2px solid #fff;
    box-shadow: none;
    transition: .2s;
}
.im-post-button:active {
    transform: scale(.95);
}


.im-file {
    color: #fff;
    width: 100%;
    height: 10vh;
    border: 2px solid #fff;
    border-radius: 8px;
    background: rgba(119, 119, 119, 0.2);
}



.user-avator {
    margin: 0 auto;
    margin-right: 16px;
}

.user-avator .name {
    margin-top: 6px;
    color: #FFFFFF;
    font-size:12px;
    letter-spacing: .05em;
    font-family: 'Electrolize', sans-serif;
}

.user-avator__container {
    align-items: center;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    line-height: normal;
    position: relative;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    align-self: flex-start;
}

.user-avator__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}





.post-control {
    display: flex;
    width: 100%;
    box-sizing: border-box;
}




.post-card {
    min-width: 0;
    color: #fff;
    width: 100%;
    margin-bottom: 24px;
    background: rgba(255,255,255,0.2);
    cursor: pointer;
    transition: .2s cubic-bezier(0.39, 0.575, 0.565, 1);
}

.post-card:hover {
    background: rgba(255,255,255,0.4);
}

.post-card .post-card__content {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    position: relative;
    text-decoration: none;
}

.post-card .post-card__text {
    user-select: none;
    align-items: center;
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    flex: 1 1;
    overflow: hidden;
    padding: 1.3rem 1rem;
    white-space:nowrap;
}

.post-card__text .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.4em;
    letter-spacing: .07em;
}

.post-card .post-card__action {
    display: inline-flex;
    padding: .5em;
    margin-left: auto;
    color: #A5F2F7;
    font-family: 'Electrolize', sans-serif;
}




.post-control .driver-line {
    margin: 0;
    padding: 0;
}
.post-control .driver-left {
    display: block;
    width: 3px;
    border-top: 2px solid #82C7CF;
}

.post-control .driver-right {
    display: inline-block;
    width: 3px;
    padding: 0;
    margin: 0;
    margin-left: 10%;
    border-top: 2px solid #82C7CF;
    box-sizing: border-box;
}

.post-control .driver {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    border-top: 2px solid #4dffff;
    box-sizing: border-box;
}

/*
.background {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -999;
}
.background img {
    min-height: 100%;
    width: 100%;
    height: auto;
}

.al-background {
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(255,255,255,0.7);
}

/*
.im-bg {
    display: block;
    min-height: 100%;
    background-image: url('/img/background.jpg') no-repeat;
    background-size: cover;
    background-size: 100%;
}*/

</style>