<template>
    <div class="describeBox text_center font_size_15">
        <!-- <a :href="'http://sex-garden.com/?country='+platform"  class="white">{{$t('words.home')}}</a> -
        <a class="white"  :href="'http://static.sex-garden.com/'+platform+'/terms.html'">{{$t('words.terms')}}</a>
        <a href="#" class="white" @click="cancelSub"> - {{$t('words.cancel')}}</a> -->
        <span>All Right Reserved</span>
    </div>
</template>

<script>
    import getCountry from "../../util/get_country"
    import go4url from "../../util/go4url"

    export default {
        data() {
            return {
                platform: ""
            }
        },
        mounted() {
            this.setCountry();
        },
        methods: {
            setCountry() {
                this.$nextTick(()=>{
                    this.platform = getCountry();
                })
            },
            cancelSub(terms) {
                var phone = localStorage.phone;
                var platform = localStorage.country;
                var href_;
                if (phone) {
                    href_ = "http://static.sex-garden.com/" + platform + "/cancel.html?phone=" + phone;
                    location.href = href_;
                } else {
                    debugger;
                    location.href = go4url("unlogin");
                }
            },
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme.less";
    .describeBox {
        background: @light_gray;
        padding: 10px;
        color: #fff;
    }
</style>