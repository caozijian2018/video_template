<template>
    <div class="bigbox">
         
    </div>
</template>

<script>
    import videoButton from "../button"
    import getCountry from "../../util/get_country";
    import bus from "../../util/bus"
    
    export default {
        data() {
            return {
                search_word: "",
                clickSelect: '',
                selectOrder: '',
                showWhich: '',
                arr: [{
                        name: this.$t('words.most_recent'),
                        id: "-create_time",
                    },
                    {
                        name: this.$t('words.most_liked'),
                        id: "-favor_num",
                    },
                    {
                        name: this.$t('words.most_viewed'),
                        id: "-show_num",
                    }
                ]
            }
        },
        components: {
            videoButton
        },
        methods: {
            Search() {
                bus.$emit("search", this.search_word);
                this.showWhich = ""
                this.$store.commit("search", this.search_word);
                this.search_word = "";
                this.$router.push({
                    path: "/"
                })
            },
            goHome() {
                this.$router.push({
                    path: "/?country=" + getCountry()
                })
            },
            showLogin() {
                this.$emit("showLogin");
            },
            toCate() {
                this.showWhich = "";
                this.$router.push({
                    name: "index-index-categaray"
                })
            },
            orderselect(ordering) {
                this.clickSelect = "";
                this.selectOrder = ordering;
                // alert(ordering);
            },
            getList(ordering, pc_ph) {
                if (pc_ph == "pc") {
                    this.clickSelect = ordering;
                } else if (pc_ph == "ph") {
                    this.showWhich = "";
                }
                if (this.$route.name != "index-index") {
                    this.$router.push({
                        name: "index-index"
                    });
                }
                bus.$emit("ordering", ordering);
            },
            showWichbox(type, mouse) {
                if (mouse) {
                    if (screen.width < 800) {
                        return
                    }
                    this.showWhich = ""
                } else {
                    this.showWhich = type == this.showWhich ? "" : type;
                }
            },
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme";
    .bigbox {
        height:10px;
        background: @app_orange;
    }
</style>