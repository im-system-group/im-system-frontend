<template>
    <div class="user-avator" :style="`max-width: ${width}`">
        <div class="user-avator__container" :style="`height: ${width};min-width: ${width};width: ${width};`">
            <div style="max-width: 100%;">
                <div class="user-avator__sizer" style="padding-bottom: 100%;">
                </div>
                <div class="user-avator__image" :style="`background-image: url('${src}');background-position: center center;`"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'im-avator',
    props: {
        width: String,
        src: String
    },
    mounted() {
        if(this.width === ''){
            this.width = '60px'
        }

        console.log(this.width, this.src)
    }
}
</script>