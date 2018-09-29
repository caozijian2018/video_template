<template>
    <div class="fixd">
        <div class="width_40 pcs loginbox">
            <i class="iconfont icon-chacha white cancelLogin position_absolute cursor" @click="close"></i>
            <div class="width_65 margin_auto">
                <div class="display_block margin_bottom_1 font_size_20 text_center white"> {{$t("words.login")}}</div>
                <el-input :clearable="true" v-model="phone" class="login width_100" :placeholder="$t('words.phone_number')"></el-input>
                <video-button class="margin_top_20 width_100" button-text="Login"  @click="regist2login"></video-button>
                <div class="white margin_top_20 text_center">
                    {{$t("words.not_register_yet")}} ? <a :href="'http://static.humorboom.com/'+platform+'/lp.html'"  class="white underline cursor">{{$t("words.click_here")}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import glo_request from "../../util/glo_request";
    import axios_creater from "../../util/axios_creater";
    import videoButton from "../../components/button";
    import init_token from "../../util/init_token";
    import getCountry from "../../util/get_country";

    export default {
        data() {
            return {
                phone: '',
                platform:''
            }
        },
        mounted(){
            this.platform = getCountry();
        },
        methods: {
            
            close(){
                this.$emit('close');
            },
            regist2login() {
                this.$http('login', 'post', {
                    username: this.phone,
                    password:'123456'
                }).then(res=>{
                    this.saveToken(res.token,this.phone);
                    this.$emit('close');
                    this.$msg('login success');
                })
            },
             saveToken(token,phone){
                    localStorage.video_token = token;
                    localStorage.phone = phone;
                    init_token();
            },
        },
        components: {
            videoButton
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/glo";
    @import "../../assets/css/current_theme";
 
    .fixd {
        @media screen and (max-width: 900px) {
            .loginbox {
                width:90%;
            }
        }
        .loginbox {
            .cancelLogin {
                right: 20px;
                top: 20px;
                transition-duration: .2s;
                &:hover {
                    color: @light_gray;
                }
            }
            .underline {
                text-decoration: underline;
            }
            .login input {
                background: @body_color;
                border: 1px solid #464646;
                color: #fff;
            }
            background:@head_bottom_color;
            border-radius:10px;
            padding:40px 0 40px;
        }
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        z-index:10005;
        background: rgba(50, 50, 50, 0.6);
    }
</style>