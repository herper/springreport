<!--
 * @Description:
 * @Version: 1.0
 * @Autor: caiyang
 * @Date: 2021-09-18 08:49:59
 * @LastEditors: caiyang caiyang90@163.com
 * @LastEditTime: 2022-07-05 18:51:03
-->
<template>
  <div class="container">
    <div class="left">
      <el-tree
        :data="pageData.treeData"
        :props="pageData.defaultProps"
        @node-click="handleNodeClick"
        default-expand-all
      >
      <template #default="{ node, data }">
        <div class="set-group df-c" @click="groupSetVisible = true" style="fontSize:14px">
                <img
                  v-if="data.id != '1'"
                  src="@/assets/img/sheet/del.png"
                  width="14px"
                  height="14px"
                  @click="() => removeNode(node, data)"
                >
                <div class="setting-text">{{ node.label }}</div>
              </div>
      </template>
      </el-tree>
    </div>
    <div class="_tablepage">
      <searchForm :search-form="pageData.searchForm" :search-data="pageData.queryData" :search-handle="pageData.searchHandle" :table-handles="pageData.tableHandles" />
      <cusTable
        ref="custable"
        :is-selection="false"
        :is-index="true"
        :is-pagination="true"
        :is-handle="true"
        :table-cols="pageData.tableCols"
        :table-data="pageData.tableData"
        :table-page="pageData.tablePage"
        :lazy="pageData.lazy"
        @handleCurrentChange="searchtablelist()"
        @selectChange="selectChange"
      />
      <modal
        ref="modalRef"
        :modal-config="pageData.modalConfig"
        :modal-form="pageData.modalForm"
        :modal-data="pageData.modalData"
        :modal-handles="pageData.modalHandles"
        @closeModal="closeModal()"
      />
      <modal
        ref="copyModalRef"
        :modal-config="pageData.copyModalConfig"
        :modal-form="pageData.copyModalForm"
        :modal-data="pageData.copyModalData"
        :modal-handles="pageData.copyModalHandles"
        @closeModal="closeCopyModal()"
      />
      <modal
        ref="changePwd"
        :modal-config="pageData.changePwdConfig"
        :modal-form="pageData.changePwdForm"
        :modal-data="pageData.changePwdModalData"
        :modal-handles="pageData.changePwdModalHandles"
        @closeModal="closePwdModal()"
      />
      <modal
        ref="shareReport"
        :modal-config="pageData.shareReportConfig"
        :modal-form="pageData.shareReportForm"
        :modal-data="pageData.shareReportModalData"
        :modal-handles="pageData.shareReportModalHandles"
        @closeModal="closeShareReportModal()"
      />
      <modal
        ref="folderModalRef"
        :modal-config="pageData.folderModalConfig"
        :modal-form="pageData.folderModalForm"
        :modal-data="pageData.folderModalData"
        :modal-handles="pageData.folderModalHandles"
        @closeModal="closeFolderModal()"
      />
      <textarea id="clipboradInput" style="opacity:0;position:absolute" />
    </div>
  </div>
</template>
<script src="./excelTemplate.js"></script>
<style scoped>
.container {
  display: flex;
}
.left {
  box-sizing: border-box;
  width: 232px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 6px;
  margin-right: 16px;
  padding: 6px;
}
._tablepage {
  width: 100%;
  flex: 1;
}
</style>
