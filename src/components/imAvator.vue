<template>
    <div class="user-avator" :style="`max-width: ${width}`">
        <div class="user-avator__container" :style="`height: ${width};min-width: ${width};width: ${width};`">
            <div style="max-width: 100%;">
                <div class="user-avator__sizer" style="padding-bottom: 100%;">
                </div>
                <div class="user-avator__image" :style="`background-image: url('${image}');background-position: center center;`"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'im-avator',
    data: () => ({
        image: '',
        imageUrl: ''
    }),
    props: {
        //image width
        width: String,
        //image url
        src: String
    },
    mounted() {
        if(this.width === ''){
            this.width = '60px'
        }

        this.setImage()
    },
    methods: {
        //當圖片跑完在顯示圖片
        setImage() {
            let self = this
            //來源 image
            this.imageUrl = this.src

            this.image = ''

            let highResImage = new Image()



            highResImage.onload = function(){
                self.image = self.imageUrl
            }

            highResImage.src = this.imageUrl
        }
    }
}
</script>