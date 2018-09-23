<template>
    <div class="">
        <video id="mp4" autoplay class="pcs width_100" controls="controls" preload  :src="mp4Src"></video>
    </div>
</template>

<script>
    export default {
        props:{
            mp4Src:{
                type:String
            }
        },
        data() {
            return {
               
            }
        },
        mounted() {
            this.controlTime();
        },
        methods: {
            controlTime(){
               var videoNode = document.getElementById("mp4")
                 videoNode.addEventListener("timeupdate", (res)=>{
                    var play_time = res.target.currentTime
                    var duration = res.target.duration;
                 });
            }

        }
    }
</script>

<style lang="less">
    
    
</style>
