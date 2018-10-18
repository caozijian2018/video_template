<template>
    <div class="taglist_box" v-loading.fullscreen.lock="fullscreenLoading">
        <div>
            <div class="width_100 photntsback" :class="{top0:isScrollBottom}">
                <div class="phtonsbase overflow_scroll nscrol" id="sdcss">
                    <div :style="{width:arr.length * (pcOrPhone?200:100)+'px'}" class="taglibox">
                        <div :class="{dsfx:index==INDEX}" :style="{width:(pcOrPhone ? 200 : 100)+'px'}" v-for="(item,index) in arr" @click="moves($event,index,item.id)" class="float_left text_center ittemstage" :key="item.id">
                            {{item.name}}
                            <div class="cate_border_bottom" :class="{selected_cate :  select_index == index}"></div>
                        </div>
                    </div>
                    <!-- <classfication @chostype="chostype"></classfication> -->
                </div>
            </div>
            <div class="text_center font_size_20 margin_top_50px" style="height:30px;line-height:30px">
                {{arr[INDEX].name}}
            </div>
            <div class="pc_flex  margin_bottom_3">
                <video-div v-for="item in list" :item="item" :key="item.id"></video-div>
            </div>
        </div>
        <video-footer></video-footer>
    </div>
</template>

<script>
    import glo_axios from "../../../../util/glo_request";
    
    import videoDiv from "../../../../components/video_div";
    import pcOrPhone from "../../../../util/get_pc_or_phone";
    import getLang from "../../../../util/get_lang";
    import videoFooter from "../../../../components/footer";
    
    export default {
        components: {
            videoDiv,
            videoFooter
        },
        async asyncData({
            store
        }) {
            var lang = store.state.locale;
            console.log("lang");
            console.log(lang);
            return Promise.all([
                glo_axios("tag", "get", {
                    ordering: "-create_time",
                    lang
                })
            ]).then(res => {
                return {
                    arr: res[0]
                }
                //   return {
    
                // list: res[0].results,
                // total: res[0].count,
                // banner: res[1],
                // classification_list: res[2]
                //   };
            });
        },
        data() {
            return {
                arr: [],
                INDEX: 0,
                list: [],
                pcOrPhone: false,
                fullscreenLoading: false,
                select_index: 0,
                country: ''
            }
        },
        props:{
            isScrollBottom:{
                type:Boolean
            }
        },
        mounted() {
            this.setLang();
            this.getList();
            this.pcOrPhone = pcOrPhone();
        },
        methods: {
            setLang() {
                this.country = getLang();
            },
            moves(e, index, idd) {
                this.select_index = index;
                this.INDEX = index;
                var screleft = e.target.offsetLeft - this.$jquery("#sdcss")[0].scrollLeft;
                var scrolx = e.target.offsetLeft - (window.innerWidth / 2 - 50);
                this.$jquery("#sdcss").animate({
                    "scrollLeft": scrolx
                }, 200);
                // this.$emit("cswt", {
                //     typed:idd
                // });
                this.getList(idd);
            },
            getList(tag_id = this.arr[0].id) {
                this.fullscreenLoading = true;
                this.$http("album", "get", {
                    tag_id,
                    capacity: 10000,
                    lang: this.country
                }).then(res => {
                    this.fullscreenLoading = false;
                    this.list = res.results;
                })
            }
        }
    }
</script>

<style lang='less'>
    .taglist_box {
        .margin_top_50px {
            margin-top: 50px;
        }
        .cate_border_bottom {
            width: 100%;
            transition: .5s;
            position: absolute;
            bottom: 0px;
            height: 3px;
            background: transparent;
        }
        .photntsback {
            &.top0{
                top:0;
            }
            z-index: 10003;
            position: fixed;
            top: 50px;
            .dsfx {
                //color:@glore;
                font-weight: 600;
            }
            .ittemstage {
                .selected_cate {
                    background: orange;
                }
                &:hover {
                    .cate_border_bottom {
                        background: orange;
                    }
                }
                cursor: pointer;
                position: relative;
                width: 200px;
                background: rgba(82, 82, 82, 1.0);
                color: #fff;
                font-size: 16px;
            }
            .taglibox {
                height: 50px;
                line-height: 50px;
            }
        }
        @media screen and (max-width:800px) {
            // .cate_border_bottom {
            //      display: none;
            // }
        }
    }
</style>