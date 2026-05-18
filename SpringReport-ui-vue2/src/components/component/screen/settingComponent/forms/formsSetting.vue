<!-- 数据设置组件 -->
<template>
  <div>
        <el-form ref="settingForm" class="demo-form-inline" :model="component" label-position="top" size="mini">
          <el-form-item  label="宽度">
            <el-input v-model.number="component.width" />
          </el-form-item>
          <el-form-item  label="按钮文本" v-if="component.type=='formsButton'">
            <el-input v-model="component.btnText" />
          </el-form-item>
          <el-form-item v-if="component.type == 'formsDate' || component.type == 'formsDateRange'" label="日期格式">
            <el-select v-model="component.dateFormat" placeholder="日期格式">
              <el-option
                v-for="item in selectUtil.dateFormat2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item  label="参数编码" v-if="component.type != 'formsButton'">
            <el-input v-model="component.paramCode" />
          </el-form-item>
          <el-form-item  label="默认值" v-if="component.type != 'formsDateRange' && component.type != 'formsButton'">
            <el-input v-model="component.paramDefault" />
            <el-link v-if="component.type == 'formsDate'" :underline="false" type="warning" href="https://gitee.com/springreport/springreport/wikis/pages?sort_id=13973093&doc_id=5747656" target="_blank">点击查看日期默认值设置规则</el-link>
            <el-link v-if="component.type == 'formsMultiselect'" :underline="false" type="warning" target="_blank">多个默认值用逗号(,)分隔，例如:1,2</el-link>
          </el-form-item>
          <el-form-item  label="开始时间默认值" v-if="component.type == 'formsDateRange'">
            <el-input v-model="component.paramDefaultStart" />
          </el-form-item>
          <el-form-item  label="结束时间默认值" v-if="component.type == 'formsDateRange'">
            <el-input v-model="component.paramDefaultEnd" />
            <el-link :underline="false" type="warning" href="https://gitee.com/springreport/springreport/wikis/pages?sort_id=13973093&doc_id=5747656" target="_blank">点击查看日期默认值设置规则</el-link>
          </el-form-item>
          <el-form-item label="组件大小">
            <el-select v-model="component.style.size" placeholder="组件大小">
              <el-option
                v-for="item in selectUtil.componentSize"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="触发时机" v-if="component.type != 'formsButton'">
            <el-select v-model="component.triggerTiming" placeholder="触发时机">
              <el-option
                v-for="item in selectUtil.triggerTiming"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型" v-show="component.type=='formsSelect' || component.type=='formsMultiselect' || component.type=='formsTreeselect' || component.type=='formsMultitree'">
            <el-select v-model="component.dataType" placeholder="数据类型" @change="changeDataType">
              <el-option
                v-for="item in selectUtil.dataType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="(component.type=='formsSelect' || component.type=='formsMultiselect' || component.type=='formsTreeselect' || component.type=='formsMultitree' || component.type=='formsCascader') && component.dataType == '2'"
            label="数据源"
          >
          <el-select
            v-model="component.datasourceId"
            placeholder="选择数据源"
            clearable
          >
            <el-option
              v-for="op in dataSource"
              :key="op.datasourceId"
              :label="op.dataSourceName"
              :value="op.datasourceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="父子联动" v-if="component.type=='formsMultitree'">
        <el-switch
              v-model="component.checkStrictly"
              active-text="不联动"
              inactive-text="联动"
          />
        </el-form-item>
        <el-form-item  label="数据内容" v-if="(component.type=='formsSelect' || component.type=='formsMultiselect'|| component.type=='formsTreeselect' || component.type=='formsMultitree' || component.type=='formsCascader')">
            <el-input v-model="component.dataContent" type="textarea" :rows="2" @change="changeDataContent()"/>
            <el-link v-if="(component.type=='formsSelect' || component.type=='formsMultiselect')&&component.dataType == '1'" :underline="false" type="warning">自定义数据格式：[{"value":"value1","name":"name1"},{"value":"value2","name":"name2"}] 注意：两个key必须是value 和 name</el-link>
            <el-link v-if="(component.type=='formsSelect' || component.type=='formsMultiselect')&&component.dataType == '2'" :underline="false" type="warning">sql语句格式：select code as value, name as name from table 注意：返回的属性中必须有 value 和 name</el-link>
            <el-link v-if="(component.type=='formsTreeselect' || component.type=='formsMultitree')&&component.dataType == '1'" :underline="false" type="warning">自定义数据格式：[{"id":"1","name":"name","pid":"0"},{"id":"2","name":"name2","pid":"1"}] 注意：属性中必须有 id,name和pid</el-link>
            <el-link v-if="(component.type=='formsTreeselect' || component.type=='formsMultitree')&&component.dataType == '2'" :underline="false" type="warning">sql语句格式：select deptId as id, deptName as name,parentId as pid from table 注意：返回的属性中必须有 id,name和pid</el-link>
            <el-link v-if="(component.type=='formsCascader')&&component.dataType == '2'" :underline="false" type="warning">sql语句格式：select code as value, area_name as name from table 注意：返回的属性中必须有 value和name</el-link>
          </el-form-item>
          <el-form-item label="按钮颜色" v-if="component.type=='formsButton'">
            <input-color-picker :input-width="152" :value="component.style.btnColor" @change="(val)=>{component.style.btnColor=val;changeColor(2)}" />
          </el-form-item>
          <el-form-item label="字体颜色" v-if="component.type=='formsButton'">
            <input-color-picker :input-width="152" :value="component.style.fontColor" @change="(val)=>{component.style.fontColor=val;changeColor(3)}" />
          </el-form-item>
          <el-form-item  label="字体大小" v-if="component.type=='formsButton'">
            <el-input v-model.number="component.style.fontSize" />
          </el-form-item>
          <el-form-item label="背景色">
            <input-color-picker :input-width="152" :value="component.style.background" @change="(val)=>{component.style.background=val;changeColor(1)}" />
          </el-form-item>
          
        </el-form>
  </div>
</template>

<script>
import InputColorPicker from '../../colorpicker/inputColorPicker.vue'
export default {
  components: {
    InputColorPicker
  },
  props: {
    component: {
      type: Object,
      default: () => ({})
    },
    chartsComponents: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dataSource:[]
    }
  },
  mounted() {
    if(this.component.dataType == '2'){
      this.getScreenTplDateSource();
    }
  },
  methods: {
    changeColor(type) {
      if (type == 1) {
        if (this.component.style.background == null) {
          this.component.style.background = 'rgba(128, 128, 128, 0.0)'
        }
      } else if (type == 2) {
        if (this.component.style.btnColor == null) {
          this.component.style.btnColor = 'rgba(128, 128, 128, 0.0)'
        }
      }else if (type == 3) {
        if (this.component.style.fontColor == null) {
          this.component.style.fontColor = 'rgba(128, 128, 128, 0.0)'
        }
      }
    },
    getScreenTplDateSource() {
      const tplId = this.$route.query.tplId // tplId
      const obj = {
        url: this.apis.reportDesign.getReportTplDateSourceApi,
        params: { tplId: tplId },
        removeEmpty: false
      }
      this.commonUtil.doPost(obj).then((response) => {
        if (response.code == '200') {
          this.dataSource = response.responseData
        }
      })
    },
    changeDataType(){
      if(this.component.dataType == '2'){
        this.getScreenTplDateSource();
      }
    },
    changeDataContent(){
      if(this.component.dataType == '2'){
        if(this.component.type=="formsSelect" || this.component.type=="formsMultiselect"){
          this.getSelectData(this.component)
        }else if(this.component.type=="formsMultitree" || this.component.type=="formsTreeselect"){
          this.getTreeSelectData(this.component)
        }
      }else{
        if(this.component.type=="formsSelect" || this.component.type=="formsMultiselect"){
          if(this.component.dataContent){
            this.component.selectContent = JSON.parse(this.component.dataContent)
          }else{
            this.component.selectContent = []
          }
        }else if(this.component.type=="formsMultitree" || this.component.type=="formsTreeselect"){
            this.component.selectContent = this.commonUtil.arrayToTree(JSON.parse(this.component.dataContent))
        }else{
            this.component.selectContent = []
        }
        
      }
    },
    getSelectData(item) {
      if(item.dataContent){
        var params = {
            selectContent: item.dataContent,
            datasourceId: item.datasourceId,
            params: {}
          }
          var obj = {
            url: '/api/reportTplDataset/getSelectData',
            params: params
          }
          this.commonUtil.doPost(obj).then((response) => {
            if (response.code == '200') {
              item.selectContent = response.responseData
            }
          })
      }
    },
    getTreeSelectData(item) {
      if(item.dataContent){
        var params = {
            selectContent: item.dataContent,
            datasourceId: item.datasourceId,
            params: {}
          }
          var obj = {
            url: '/api/reportTplDataset/getTreeSelectData',
            params: params
          }
          this.commonUtil.doPost(obj).then((response) => {
            if (response.code == '200') {
              item.selectContent = response.responseData
            }
          })
      }
    },
  }
}
</script>
<style scoped>
.el-form-item{
  margin-bottom:2px !important
}
::v-deep .el-form-item__label-wrap{
    margin-left:0px !important
  }
</style>
