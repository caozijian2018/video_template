<template>
    <div>
        <el-select v-model="value" placeholder="请选择" class="lang_div" style="width:114px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // value:'en',
                options: [{
                        value: "zh-tw",
                        label: "中文繁体"
                    },
                    {
                        value: "en",
                        label: "English"
                    }
                ]
            }
        },
        computed: {
            value: {
                get() {
                    return this.selectWhatLang
                },
                set(val) {
                    this.$emit('selectLang', val);
                }
            }
        },
        props: {
            selectWhatLang: {
                default: 'en',
                type: String
            }
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme";
    .lang_div {
        .el-input__inner {
            background: @app_gray;
        }
        width: 114px;

    }
</style>