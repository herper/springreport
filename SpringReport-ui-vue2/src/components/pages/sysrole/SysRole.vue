<template>
  <div class="_tablepage">
    <searchForm :search-form="pageData.searchForm" :search-data="pageData.queryData" :search-handle="pageData.searchHandle" :table-handles="pageData.tableHandles" />
    <cusTable
      ref="custable"
      :is-selection="true"
      :is-index="true"
      :is-pagination="true"
      :is-handle="true"
      :table-cols="pageData.tableCols"
      :table-data="pageData.tableData"
      :table-page="pageData.tablePage"
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
      ref="authRef"
      :modal-config="pageData.authDialogParam"
      :modal-form="pageData.authModalForm"
      :modal-handles="pageData.authModalHandles"
      @closeModal="closeAuthModal()"
    />
    <modal
      ref="reportAuthRef"
      :modal-config="pageData.reportAuthDialogParam"
      :modal-form="pageData.reportAuthModalForm"
      :modal-handles="pageData.reportAuthModalHandles"
      @closeModal="closeReportAuthModal()"
    />
  </div>
</template>
<script src="./SysRole.js"></script>
