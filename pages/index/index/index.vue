<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <!-- <video-banner :current-banner="current_banner"></video-banner> -->
    <!-- <category-box @ordering="getOrdering"></category-box> -->
    <div class="width_60 margin_auto display_flex">
      <div class="width_25 left_cate_box">
        <div class="left_box_logo_head width_65 margin_auto">
          <lang-select :selectWhatLang="select_lang_val" @selectLang="selectLang"></lang-select>
          <img src="../../../static/img/html5games_logo.png" class="width_100 margin_top_10" alt="">
        </div>
        <!-- cate -->
        <div>
          <div class="width_100">
            <div class="cate_little_box display_flex" :class="{select_cate:0 === current_cate}" @click="selectCate({id:0})">
              <div class="height_100 cate_left_border"></div>
              <div class="flex_1 height_100">
                <div class="width_80 height_100 margin_auto right_box">
                  {{$t('words.home')}}
                </div>
              </div>
            </div>
            <div class="cate_little_box display_flex" v-for="item in tag_arr" :class="{select_cate:item.id == current_cate}" @click="selectCate(item)" :key="item.id">
              <div class="height_100 cate_left_border"></div>
              <div class="flex_1 height_100">
                <div class="width_80 height_100 margin_auto right_box">
                  {{item.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex_1">
        <div class="pc_flex  width_90 margin_auto">
          <video-div v-for="item in list" :item="item" :key="item.id"></video-div>
        </div>
      </div>
    </div>
    <div class="text_center margin_bottom_3 paging">
      <el-pagination class="" :current-page="page_" :page-size="16" @current-change="getPage" small layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <video-footer></video-footer>
  </div>
</template>

<script>
  import videoDiv from "../../../components/video_div";
  import videoHead from "../../../components/videoHead";
  import categoryBox from "../../../components/category_box";
  import videoFooter from "../../../components/footer";
  import videoBanner from "../../../components/banner";
  import langSelect from "../../../components/lang_select";
  
  import glo_axios from "../../../util/glo_request";
  import get_banner from "../../../util/get_banner";
  import getLang from "../../../util/get_lang";
  import bus from "../../../util/bus";
  import init_token from "../../../util/init_token";
  export default {
    async asyncData({
      store,
      query
    }) {
      var lang = query.lang || store.state.locale || "en";
      store.state.locale = lang;
      var page = store.getters.getPage;
  
      return Promise.all([
        glo_axios("album", "get", {
          capacity: 16,
          ordering: "-create_time",
          page,
          lang
        }),
        glo_axios("site", "get", {}),
        glo_axios("tag", 'get', {
          ordering: "-create_time",
          lang
        })
      ]).then(res => {
        return {
          list: res[0].results,
          total: res[0].count,
          banner: res[1],
          page_: page,
          tag_arr: res[2]
        };
      });
    },
    components: {
      videoDiv,
      videoHead,
      videoFooter,
      videoBanner,
      categoryBox,
      langSelect
    },
    data() {
      return {
        tag_arr: [],
        current_cate: 0,
        list: [],
        select_lang_val: "en",
        banner: [],
        current_banner: {},
        total: 0,
        glo_ordering: "-create_time",
        page_: 0,
        fullscreenLoading: false
      };
    },
    mounted() {
      console.log(this.tag_arr);
      this.initBanner();
      this.watchHeadOrdering();
      this.getSearch();
      this.storeSearchWatch();
      this.saveInfo();
      this.fromMp4page();
      this.setCurrentLangSelect();
    },
    methods: {
      getTagList(tag_id) {
        this.fullscreenLoading = true;
        this.$http("album", "get", {
          tag_id,
          capacity: 10000,
          lang: getLang()
        }).then(res => {
          this.fullscreenLoading = false;
          this.list = res.results;
          this.total = 1
        })
      },
      selectCate(item) {
        this.current_cate = item.id;
        if(item.id === 0){
          this.getPage(1)
        }else{
          this.getTagList(item.id);
        }
      },
      setCurrentLangSelect() {
        this.$nextTick(() => {
          this.select_lang_val = getLang();
        })
      },
      selectLang(val) {
        this.select_lang_val = val;
        location.href = location.host.match(/http/) ?
          "" :
          "http://" + `${location.host}/?lang=${val}`;
      },
      storeSearchWatch() {
        var word = this.$store.state.search_word;
        if (word) {
          this.getList({
            search: word
          });
          this.$store.commit("search", "");
        }
      },
      fromMp4page() {
        var mp4id = localStorage.mp4id;
        if (mp4id && localStorage.video_token) {
          localStorage.mp4id = "";
          this.$router.push({
            path: "/" + mp4id
          });
        }
      },
      saveInfo() {
        var query = this.$route.query;
        var phone = query.phone;
        var from_ = query.from;
        if (phone && from_) this.login(phone, from_);
      },
      login(phone, from_) {
        this.$http("login", "post", {
            username: phone,
            password: "123456"
          })
          .then(res => {
            localStorage.video_token = res.token;
            localStorage.phone = phone;
            localStorage.from_ = from_;
            init_token();
          })
          .finally(() => {
            var new_url = location.href.replace(/[?&]phone=\d*/, "");
            new_url = new_url.replace(/[?&]from=\w*/, "");
            location.href = new_url;
          });
      },
      getSearch() {
        bus.$on("search", res => {
          this.getList({
            search: res
          });
        });
      },
      getOrdering(ordering) {
        this.getList({
          ordering
        });
      },
      getPage(page) {
        this.getList({
          page,
          ordering: this.glo_ordering
        });
      },
      watchHeadOrdering() {
        bus.$on("ordering", ordering => {
          this.getList({
            ordering
          });
        });
      },
      getList({
        ordering = "-create_time",
        page = 1,
        capacity = 16,
        search = ""
      }) {
        this.fullscreenLoading = true;
        // alert(ordering);
        this.glo_ordering = ordering;
        this.$http("album", "get", {
            ordering,
            page,
            capacity,
            search,
            lang: getLang()
          })
          .then(res => {
            this.list = res.results;
            this.total = res.count;
            this.$store.commit("setPage", page);
            this.fullscreenLoading = false;
            document.querySelector(".scroll_box").scrollTop = "0";
          })
          .catch(res => {});
      },
      initBanner() {
        var banner = get_banner(this.banner);
        this.current_banner = banner;
      }
    }
  };
</script>

<style lang='less'>
  @import "../../../assets/css/current_theme.less";
  .left_cate_box {
    .left_box_logo_head {
      padding: 10px 0 20px;
    }
    background: @app_gray;
    .cate_little_box {
      &:hover {
        .cate_left_border {
          background: @app_font_color;
        }
      }
      &.select_cate {
        .cate_left_border {
          background: @app_orange;
        }
        color:@app_orange;
      }
      height: 50px;
      font-size: 20px;
      color: @app_font_color;
      .cate_left_border {
        width: 4px;
        background: transparent;
        transition: .3s;
      }
      .right_box {
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
      }
    }
  }
  
  .paging {
    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: @gray_back;
    }
    .el-pager li {
      background: @gray_back;
    }
  }
</style>