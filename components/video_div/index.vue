<template>
    <div @click="goWatchMp4(item.id)" class="width_100 video_box margin_bottom_1">
        <div class="hover_img position_relative text_center margin_bottom-1 overflow_hidden" :style="{height:boxheight+'px'}">
            <i class="pcs iconfont icon-weibiaoti1 white play pc_none"></i>
            <div class="width_100 height_100 img_box">
                <img @load="loadImg($event)" :src="item.cover" class="pcs width_100 video_img_box" style="" alt="">
            </div>
            <div class="hoverdiv mp4hover">
                <div class="white pcs">
                    WATCH IT <i class="iconfont icon-xiangyou"></i>
                </div>
            </div>
            <div class="video_box_icon white">
                <i class="iconfont icon-bofang"></i> VIDEO
            </div>
        </div>
        <div class="padding_1 font back_white">
            <div class="title_text">
               {{item.title}}
            </div>
            <div class="box_footer display_flex flex_align_center  margin_top_10">
                <i class="iconfont icon-shijian"></i> {{item.create_time | yearMonthDay}}
                <i class="padding_left_1 iconfont icon-kanguo"></i> {{item.show_num+1068}}
                <i class="padding_left_1 iconfont icon-xihuan"></i>  {{item.id}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            item:{
                type:Object
            }
        },
        data(){
            return {
                boxheight:"",
                boxwidth:""
            }
        },
        mounted(){
            this.setWidthandHeight();
        },
        filters:{
            yearMonthDay(val){
                return val.split("T")[0]
            }
        },
        methods:{
            goWatchMp4(id){
                this.$router.push({path:"/"+id});
            },
            loadImg(e){
                 var img=e.target;
                this.$set(this.item, 'showloading', true);
                this.$nextTick(() => {
                    var divbox = this.$jquery(img.parentNode);
                    var imgtoheightratio = parseFloat(img.width) / parseFloat(img.height);
                    var divtoheightratio = this.boxwidth / this.boxheight;
                    imgtoheightratio / divtoheightratio > 1 ? this.$jquery(img).css("height", "100%") : this.$jquery(img).css("width", "100%");
                });
            },
            setWidthandHeight(){
               this.boxwidth = this.$jquery(".video_box")[1].offsetWidth;
               var boxheight = this.boxwidth/1.2;
               this.boxheight= boxheight
            }
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme";
    .video_box {
        .title_text{
            font-size:19px;
        }
        transition-property: box-shadow;
        transition-duration: .4s;
        .img_box {
            //height:200px;
            position: relative;
            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .pc_none{
            z-index:10001;
        }
        .mp4hover {
            display: none;
        }
        .margin_bottom-1 {
            margin-bottom: -1px;
        }
        .video_box_icon {
            position: absolute;
            left: 0;
            bottom: 2px;
            padding: 4px 10px;
            color: #fff;
            z-index:100;
            background: @light_gray;
        }
        .play {
            font-size: 40px;
        }
        .box_footer {
            color: @font_gray;
        }
        @media screen and (min-width:800px) {
            .pc_none{
                display: none;
            }
            &:hover{
                box-shadow: 5px 5px 10px rgba(30, 30, 30, 1.0);
            }
            .hover_img {
            &:hover .mp4hover {
                display: block;
                z-index:10002;
            }
            &:hover img {
                transform-origin: 50% 50%;
                transform:translate(-50%, -50%) scale(1.4, 1.4);
                transition: .3s;
            }
        }
        }
    }
</style>