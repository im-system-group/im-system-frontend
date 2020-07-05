<template>
    <div class="im-bg">

        <button class="navigation-button post fixed">
            <span class="mdi mdi-pencil-outline"></span>
        </button>

        <button class="navigation-button setting fixed">
            <span class="mdi mdi-cog-outline"></span>
        </button>

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
                        <div class="post-card__text">
                            <div class="title">{{ item.title }}</div>
                        </div>

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
</template>

<script>
export default {
    data: () => ({
        loading: false,
        post_list: null
    }),
    mounted() {
        this.post_list = [
            {
                id: 'qoMNXifnq',
                title: 'Sdqw SDcw',
                author: 'Raincity',
                author_avator: 'https://imsystem.site/upload/f6b12f046d1fcbe362d5a62204806cef.png',
                thumbsup: 1231
            },
            {
                id: 'wacqwr',
                title: 'SAv WDsac Ccqwd',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 12
            },
            {
                id: 'usdbvwq',
                title: '還有人嗎:3',
                author: 'Yu',
                author_avator: 'https://imsystem.site/upload/0b01f1a3a19e210347f5481791452938.jpg',
                thumbsup: 65
            },
            {
                id: 'qwdcvwger',
                title: '姆咪姆咪',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 11
            },
            {
                id: 'qoMNXifnq',
                title: '最近正在嘗試畫iL',
                author: 'Raincity',
                author_avator: 'https://imsystem.site/upload/f6b12f046d1fcbe362d5a62204806cef.png',
                thumbsup: 1231
            },
            {
                id: 'wacqwr',
                title: '文字測試sadsada',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 12
            },
            {
                id: 'usdbvwq',
                title: '還有人嗎:3',
                author: 'Yu',
                author_avator: 'https://imsystem.site/upload/0b01f1a3a19e210347f5481791452938.jpg',
                thumbsup: 65
            },
            {
                id: 'qwdcvwger',
                title: '姆咪姆咪',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 11
            },
            {
                id: 'qoMNXifnq',
                title: '最近正在嘗試畫iL',
                author: 'Raincity',
                author_avator: 'https://imsystem.site/upload/f6b12f046d1fcbe362d5a62204806cef.png',
                thumbsup: 1231
            },
            {
                id: 'qoMNXifnq',
                title: '最近正在嘗試畫iL',
                author: 'Raincity',
                author_avator: 'https://imsystem.site/upload/f6b12f046d1fcbe362d5a62204806cef.png',
                thumbsup: 1231
            },
            {
                id: 'wacqwr',
                title: '文字測試sadsada',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 12
            },
            {
                id: 'usdbvwq',
                title: '還有人嗎:3',
                author: 'Yu',
                author_avator: 'https://imsystem.site/upload/0b01f1a3a19e210347f5481791452938.jpg',
                thumbsup: 65
            },
            {
                id: 'qwdcvwger',
                title: '姆咪姆咪',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 11
            },
            {
                id: 'qoMNXifnq',
                title: '最近正在嘗試畫iL',
                author: 'Raincity',
                author_avator: 'https://imsystem.site/upload/f6b12f046d1fcbe362d5a62204806cef.png',
                thumbsup: 1231
            },
            {
                id: 'wacqwr',
                title: '文字測試sadsada',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 12
            },
            {
                id: 'usdbvwq',
                title: '還有人嗎:3',
                author: 'Yu',
                author_avator: 'https://imsystem.site/upload/0b01f1a3a19e210347f5481791452938.jpg',
                thumbsup: 65
            },
            {
                id: 'qwdcvwger',
                title: '姆咪姆咪',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 11
            },
            {
                id: 'qoMNXifnq',
                title: '最近正在嘗試畫iL',
                author: 'Raincity',
                author_avator: 'https://imsystem.site/upload/f6b12f046d1fcbe362d5a62204806cef.png',
                thumbsup: 1231
            },
            {
                id: 'wacqwr',
                title: '文字測試sadsada',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 12
            },
            {
                id: 'usdbvwq',
                title: '還有人嗎:3',
                author: 'Yu',
                author_avator: 'https://imsystem.site/upload/0b01f1a3a19e210347f5481791452938.jpg',
                thumbsup: 65
            },
            {
                id: 'qwdcvwger',
                title: '姆咪姆咪',
                author: 'SnowFireWolf',
                author_avator: 'https://imsystem.site/image/def_picture.jpg',
                thumbsup: 11
            }
        ]
    }
}
</script>

<style>
button:focus {
    outline: none;
}

.button {
    background: rgb(134, 132, 127);
    outline: none;
    color: white;
    border: none;
    border-radius: 0.25em;
    padding: 0.75em 2em;
    line-height: 1;
    box-shadow: 0 0 0.25em rgba(0,0,0,0.5);
    text-shadow: 0 0 0.25em rgba(0,0,0,0.5);
    font-size: 1.1rem;
    outline: 0;
}

.button.icon {
    padding: .5em .5em;
    border-radius: 50%;
    color: #9CFFFF;
    background-color: #50808E;
    transition: .1s;
}

.button.icon:active {
    transform: scale(.9);
}



.navigation-button {
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    background: rgb(255, 255, 255, 0.2);
    outline: none;
    color: white;
    border: 2px solid #ffffff;
    border-radius: 55%;
    padding: .5em .5em;
    line-height: 1;
    box-shadow: 0 0 0.25em rgba(0,0,0,0.5);
    text-shadow: 0 0 0.25em rgba(0,0,0,0.5);
    font-size: 2em;
    outline: 0;
    transition: .1s;
}
.navigation-button:active {
    transform: scale(.95);
}

.navigation-button.post.fixed {
    z-index: 1;
    position: fixed;
    top: 80%;
    left: 5%;
}

.navigation-button.setting.fixed {
    z-index: 1;
    position: fixed;
    top: 80%;
    right: 5%;
}




.im-bg {
    background: url('/img/background.jpg') no-repeat center center fixed;
    background-size: cover;
    height: 100%;
    overflow: hidden;
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