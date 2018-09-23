<template>
    <div>
        <mp4 class="width_100" :mp4-src="mp4_src"></mp4>
    </div>
</template>

<script>
    import mp4 from "../../../components/mp4"
    export default {
        components: {
            mp4
        },
        data(){
            return {
                mp4_src:''
            }
        },
        mounted(){
            this.getMp4src();
        },
        methods: {
            getMp4src() {
                var mp4id = this.$route.params.mp4id;
                this.$http(`album/${mp4id}/`).then(res => {
                    if (res.resources.length) {
                        var src = res.resources[0].url;
                        this.mp4_src = src;
                    } else {
                        // this.$msg(this.$t('words.vip_be_overdue'), 'warning');
                        // this.$router.go(-1);
                    }
                }).catch(err => {
                    if (err.code == '401') {
                        this.$msg('token overdue please login again!', 'warning');
                        localStorage.video_token = "";
                        init_token();
                    }
                    this.$router.go(-1);
                })
            }
    
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../assets/css/current_theme.less";
    body {
        background: @light_gray
    }
</style>