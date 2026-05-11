<template>
  <div>
    <div class="btn-group df-c">
      <div
        v-for="(item, index) in ['基础','组件']"
        :key="index"
        class="btn"
        :class="{ 'btn-active': currentIndex === index }"
        @click="currentIndex = index"
      >
        {{ item }}
      </div>
    </div>
    <site v-if="currentIndex==0" :component="component" :charts-components="chartsComponents" />
    <formsSetting v-if="currentIndex==1" :component="component" :charts-components="chartsComponents"></formsSetting>
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/erlang-dark.css'

import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/selection/active-line'
import site from '../settingComponent/site/site.vue'
import formsSetting from '../settingComponent/forms/formsSetting.vue'
export default {
  name: 'TableSettingComponent',
  components: {
    site,
    formsSetting,
  },
  props: {
    component: {
      type: Object,
      default: () => ({})
    },
    components: {
      type: Array,
      default: () => []
    },
    chartsComponents: {
      type: Object,
      default: () => ({})
    }
  },
  mounted(){
  },
  data() {
    return {
      currentIndex: 0
    }
  }
}
</script>

<style  scoped>
 ::v-deep .el-collapse-item__header{
    border-top: 0px !important;
 }

</style>
