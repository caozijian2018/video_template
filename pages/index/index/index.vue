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
  // hallo
  import videoDiv from "../../../components/video_div";
  import videoHead from "../../../components/videoHead";
  import categoryBox from "../../../components/category_box";
  import videoFooter from "../../../components/footer";
  import videoBanner from "../../../components/banner";
  import glo_axios from "../../../util/glo_request";
  import get_banner from "../../../util/get_banner";
  
  import bus from "../../../util/bus";
  
  export default {
    async asyncData({
      store,
      query
    }) {
      var lang = "es";
      return Promise.all([
        glo_axios("album", "get", {
          capacity: 16,
          ordering: "-create_time",
          page: 1
        }),
        glo_axios("site", "get", {
          lang
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
    },
    methods: {
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
          // this.page_=0;
          this.getList({
            ordering
          })
        })
      },
      getList({
        ordering = "-create_time",
        page = 1,
        capacity = 16
      }) {
        this.fullscreenLoading = true;
        this.glo_ordering = ordering;
        this.$http("album", "get", {
  
          ordering,
          page,
          capacity
  
        }).then(res => {
          this.list = res.results;
          this.total = res.count;
          this.fullscreenLoading = false;
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