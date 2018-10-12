<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <video-banner :current-banner="current_banner"></video-banner>
    <category-box @ordering="getOrdering"></category-box>
    <div class="pc_flex">
      <video-div v-for="item in list" :item="item" :key="item.id"></video-div>
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
  import glo_axios from "../../../util/glo_request";
  import get_banner from "../../../util/get_banner";
  import getCountry from "../../../util/get_country";
  import bus from "../../../util/bus";
  import init_token from "../../../util/init_token";
  export default {
    async asyncData({
      store,
      query
    }) {
      var lang = query.lang || "en";
      store.state.locale = lang;
      return Promise.all([
        glo_axios("album", "get", {
          capacity: 16,
          ordering: "-create_time",
          page:1,
          lang
        }),
        glo_axios("site", "get", {
          
        })
      ]).then(res => {
        return {
          list: res[0].results,
          total: res[0].count,
          banner: res[1],
        }
      });
    },
    components: {
      videoDiv,
      videoHead,
      videoFooter,
      videoBanner,
      categoryBox
    },
    data() {
      return {
        list: [],
        banner: [],
        current_banner: {}, 
        total: 0,
        glo_ordering: "-create_time",
        page_: 0,
        fullscreenLoading: false,
      }
    },
    mounted() {
      this.initBanner();
      this.watchHeadOrdering();
      this.getSearch();
      this.storeSearchWatch();
      this.saveInfo();
      this.fromMp4page();
    },
    methods: {
      storeSearchWatch(){
        var word = this.$store.state.search_word;
        if(word){
          this.getList({search:word});
          this.$store.commit("search",'');
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
      saveInfo(){
        var query = this.$route.query;
        var phone = query.phone;
        var from_ = query.op;
        if( phone && from_) this.login(phone,from_);
      },
      login(phone,from_){
         this.$http('login', 'post', {
                    username: phone,
                    password:'123456'
                }).then(res=>{
                    localStorage.video_token = res.token;
                    localStorage.phone = phone;
                    localStorage.from_ = from_;
                    init_token();
                }).finally(()=>{
                  var new_url = location.href.replace(/[?&]phone=\d*/, '');
                  new_url = new_url.replace(/[?&]from=\w*/, '');
                  location.href = new_url;
                })
      },
      getSearch(){
        bus.$on('search',(res)=>{
          this.getList({search:res});
        })
      },
      getOrdering(ordering){
        this.getList({
            ordering
          })
      },
      getPage(page) {
        this.getList({
          page,
          ordering: this.glo_ordering
        });
      },
      watchHeadOrdering() {
        bus.$on("ordering", (ordering) => {
          this.getList({
            ordering
          })
        })
      },
      getList({
        ordering = "-create_time",
        page = 1,
        capacity = 16,
        search=''
      }) {
        this.fullscreenLoading = true;
        this.glo_ordering = ordering;
        this.$http("album", "get", {
          ordering,
          page,
          capacity,
          search,
          lang:getCountry(),
        }).then(res => {
          this.list = res.results;
          this.total = res.count;
          this.fullscreenLoading = false;
        }).catch(res=>{
        })
      },
      initBanner() {
        var banner = get_banner(this.banner);
        this.current_banner = banner;

      },
    }
  };
</script>

<style lang='less'>
  @import "../../../assets/css/current_theme.less";
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