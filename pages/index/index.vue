<template>
    <div class="container display_flex flex_column" :style="{height:height_}">
        <video-head @showLogin="showLogin"></video-head>
        <div class="flex_1 overflow_scroll" style="">
            <login-box v-if="show_login"  @close="show_login=false"></login-box>
            <nuxt-child></nuxt-child>
        </div>
    </div>
</template>

<script>
    import videoHead from "../../components/videoHead"
    import loginBox from "../../components/loginBox"
    
    
    export default {
        components: {
            videoHead,
            loginBox
        },
        data() {
            return {
                height_: "",
                show_login:false,
            }
        },
        mounted() {
            this.setHeight();
            this.watchOnresize()
        },
        methods: {
            showLogin(){
                console.log(2222);
                this.show_login = true;
            },
            watchOnresize() {
                window.onresize = this.setHeight;
            },
            setHeight() {
                this.height_ = innerHeight + "px";
            }
        }
    }
</script>

<style lang='less'>
    
</style>