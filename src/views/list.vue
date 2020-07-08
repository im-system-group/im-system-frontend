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

            <div class="container mx-auto" style="max-width: 1028px;margin-top:8vh;min-height: 100vh;">

                <div v-if="loading" class="post-control">
                    <div class="post-card">
                        <div class="driver"></div>

                        <div class="post-card__content" style="display: flex">
                            <loading-spinner style="margin-top: 5vh;margin-bottom: 5vh;"></loading-spinner>
                        </div>
                    </div>
                </div>

                <div v-else class="post-control" v-for="(item, index) in post_list" :key="index">

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



        <div class="im-modal" style="overflow-y: scroll" :class="{'active': open_compose}">
            <div class="im-modal-bg">
            </div>
            <div class="im-modal__card">
                <div class="im-card">

                    <div class="im-card__content" style="min-height: 50vh">
                        <h2>新文章</h2>

                        <input
                            v-model="compose_title"
                            class="im-textarea mt-2"
                            placeholder="標題"
                        />

                        <textarea
                            v-model="compose_content"
                            class="im-textarea mt-2"
                            rows="4"
                            cols="50"
                            placeholder="在想些什麼？"
                        >
                        </textarea>

                        <div class="file-preview text-center" v-if="previewUrl">
                            <div>
                                <img :src="previewUrl" style="width: 100%; max-width: 420px;"/>
                            </div>
                            <button class="button mt-1" @click="removeFile">刪除</button>
                        </div>

                        <div
                            :class="['dropZone', dragging ? 'dropping' : '']"
                            @dragenter="dragging = true"
                            @dragleave="dragging = false"
                            class="im-file mx-auto mt-2"
                            style="max-width: 220px;"
                        >
                            <div class="im-file__content">
                                <input type="file" @change="fileOnChange"/>
                                <div class="im-file__info text-center">
                                    <span class="mdi mdi-plus" style="font-size: 2em"></span>
                                    <!--<p>拖動檔案或是點擊此處上傳檔案</p>
                                    <p>最大檔案大小： 5MB</p>-->
                                </div>
                            </div>
                        </div>
                        <div class="text-center mb-1">上傳檔案</div>

                        <div class="d-flex">
                            <button class="button im-post-button mt-2 ml-auto">POST</button>
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
        post_list: null,

        open_compose: false,
        compose_title: '',
        compose_content: '',
        dragging: false,
        previewUrl: ''
    }),
    methods: {
        compose_m() {
            let open_compose = this.open_compose;
            this.open_compose = !open_compose;

            //如果打開 新文章 modal 鎖定滾動
            if(open_compose)
                document.body.style = 'overflow-y: scroll;'
            else
                document.body.style = 'overflow-y: hidden;'
        },
        fileOnChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            console.log(files)
            if (!files.length) {
                this.dragging = false;
                return;
            }

            this.createFile(files[0]);
        },
        createFile(file) {
            console.log(file.type)
            if (file.type.match('image/png.*')) {
                this.dragging = false;

            }else if (file.type.match('image/jpeg.*')) {
                this.dragging = false;

            }else {
                alert('不支援此類型檔案')
                return
            }

            if (file.size > 5000000) {
                alert('please check file size no over 5 MB.')
                this.dragging = false;
                return;
            }

            this.file = file;
            console.log(this.file);

            let reader = new FileReader()
            let self = this
            reader.onload = function (e) {
                self.previewUrl = e.target.result
                console.log(e)
            }
            reader.readAsDataURL(file)


            this.dragging = false;
        },
        removeFile() {
            this.file = '';
            this.previewUrl = ''
        }
    },
    computed: {
        extension() {
            return (this.file) ? this.file.name.split('.').pop() : '';
        }
    },
    mounted() {
        let self = this;

        this.axios.get('/api/list.json')
            .then(function (response) {
                let data = response.data

                self.loading = false
                self.post_list = data

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
}
</script>

<style>

.im-post-button {
    background: rgba(119, 119, 119, 0.2);
    border: 2px solid #fff;
    box-shadow: none;
    transition: .2s;
}

.im-post-button:hover {
    background: rgba(177, 177, 177, 0.2);
}

.im-post-button:active {
    background: rgba(119, 119, 119, 0.2);
    transform: scale(.95);
}




.im-file {
    display: block;
    margin-bottom: .7em;
    color: #fff;
    width: 100%;
    min-width: 0;
    min-height: 10vh;
    border: 2px solid #fff;
    border-radius: 8px;
    background: rgba(119, 119, 119, 0.2);
    transition: .1s;
}

.im-file:hover {
    background: rgba(119, 119, 119, 0.4);
}

.im-file.dropping {
    color:rgb(217, 221, 226);
    background: rgba(119, 119, 119, 0.5);
    border-color: rgb(171, 216, 253);
}
.im-file__content {
    position: relative;
}

.im-file__info {
    padding: 1em;
}


.im-file input {
    position: absolute;
    cursor: pointer;
    width: 100%;
    min-height: 100%;
    opacity: 0;
}

/** compose ui **/





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
    backdrop-filter: saturate(180%) blur(20px);
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