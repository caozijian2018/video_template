<template>
    <div @click="goWatchMp4(item.id)" class="width_100 video_box margin_bottom_1">
        <div class="hover_img position_relative text_center margin_bottom-1 overflow_hidden" :style="{height:boxheight+'px'}">
            <i class="pcs iconfont icon-weibiaoti1 white play pc_none"></i>
            <div class="width_100 height_100 img_box">
                <img @load="loadImg($event)" :src="item.cover" class="pcs video_img_box" style="" alt="">
            </div>
        </div>
        <div class="padding_1 font back_white">
            <div class="title_text display_flex">
                {{item.title|first10}}
            </div>
            <div class="button_play width_100 text_center font_size_8 margin_top_1 white">
                Play It
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object
            }
        },
        data() {
            return {
                boxheight: "",
                boxwidth: ""
            }
        },
        mounted() {
            this.setWidthandHeight();
        },
        filters: {
            yearMonthDay(val) {
                try {
                    return val.split("T")[0]
                } catch (error) {
                    return "time error"
                }
            },
            secendToTime(s) {
                var H = String(Math.floor(s / 3600)).padStart(2, 0);
                var m = String(Math.floor(s / 60) % 60).padStart(2, 0);
                var S = String(s % 60).padStart(2, 0);
                var time = H + ":" + m + ":" + S;
                return time;
            }
        },
        methods: {
            goWatchMp4(id) {
                this.$router.push({
                    path: "/" + id
                });
            },
            loadImg(e) {
                var img = e.target;
                this.$set(this.item, 'showloading', true);
                this.$nextTick(() => {
                    var divbox = this.$jquery(img.parentNode);
                    var imgtoheightratio = parseFloat(img.width) / parseFloat(img.height);
                    var divtoheightratio = this.boxwidth / this.boxheight;
                    imgtoheightratio / divtoheightratio > 1 ? this.$jquery(img).css("height", "100%") : this.$jquery(img).css("width", "100%");
                });
            },
            setWidthandHeight() {
                var boxwidth;
                try { 
                    boxwidth = this.$jquery(".video_box")[1].offsetWidth;
                } catch (error) {
                    boxwidth = parseFloat(this.$jquery(this.$jquery('.video_box')[this.$jquery(".video_box").length - 1]).css('width'));
                }
                this.boxwidth = boxwidth; // 
                var boxheight = this.boxwidth / 1.2;
                this.boxheight = boxheight
            }
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme";
    .video_box {
        .button_play{
            height:40px;
            line-height: 40px;
            background:@app_orange;
        }
        .title_text {
            font-size: 19px;
            color:@app_font_color;
            height:40px;
            align-items: center;
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
        .pc_none {
            z-index: 10001;
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
            z-index: 9999;
            background: @light_gray;
        }
        .play {
            font-size: 40px;
        }
        .box_footer {
            color: @font_gray;
        }
        @media screen and (min-width:800px) {
            .pc_none {
                display: none;
            }
            &:hover {
                box-shadow: 5px 5px 10px rgba(30, 30, 30, 1.0);
            }
            .hover_img {
                &:hover .mp4hover {
                    display: block;
                    z-index: 10002;
                }
                &:hover img {
                    transform-origin: 50% 50%;
                    transform: translate(-50%, -50%) scale(1.4, 1.4);
                    transition: .3s;
                }
            }
        }
    }
</style>