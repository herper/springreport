export default {
  name: 'screenTpl',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [],
      pageData: {
        // 查询表单内容 start
        searchForm: [
          { type: 'Input', label: '模板标识', prop: 'tplCode' },
          { type: 'Input', label: '模板名称', prop: 'tplName' }
        ],
        // 查询表单内容 end
        // 查询条件 start
        queryData: {
          tplCode: '', // 模板标识
          tplName: '' // 模板名称
        },
        // 查询条件 end
        // 查询表单按钮start
        searchHandle: [
          { label: '查询', type: 'primary', handle: () => this.searchtablelist(), auth: 'screenTpl_search' },
          { label: '重置', type: '', handle: () => this.resetSearch(), auth: 'screenTpl_search' }
        ],
        // 查询表单按钮end
        // 表格数据start
        lazy: true,
        tableData: [],
        // 表格数据end
        // 表格工具栏按钮 start
        tableHandles: [
          { label: '报表模板', type: 'primary', position: 'right', iconClass: 'action-icon-template', handle: () => this.goTemStore(), auth: 'template_market' },
          { label: '新建目录', type: 'primary', position: 'right', iconClass: 'action-icon-add', handle: () => this.showModal(this.commonConstants.modalType.insert, null, '1'), auth: 'screenTpl_folder' },
          { label: '新建文档', type: 'info', position: 'right', iconClass: 'action-icon-add', handle: () => this.showModal(this.commonConstants.modalType.insert, null, '2'), auth: 'screenTpl_insert' },
          { label: '刷新', type: 'danger', position: 'left', iconClass: 'action-icon-refresh', handle: () => this.searchtablelist(), auth: 'screenTpl_search' }
        ],
        // 表格工具栏按钮 end
        selectList: [], // 表格选中的数据
        // 表格分页信息start
        tablePage: {
          currentPage: 1,
          pageSize: 12,
          pageTotal: 0,
          pageSizeRange: [12, 24, 36]
        },
        // 表格分页信息end
        // 表格列表头start
        tableCols: [
          { label: '操作', prop: 'operation', align: 'center', type: 'dropdown', width: 54, btnList: [
            { label: '查看', type: 'text', auth: 'screenTpl_getDetail', handle: (row) => this.showModal(this.commonConstants.modalType.detail, row.id), show: (row) => this.isShowBtn(row) },
            { label: '编辑', type: 'text', auth: 'screenTpl_update', handle: (row) => this.showModal(this.commonConstants.modalType.update, row.id, row.type) },
            { label: '大屏设计', type: 'text', auth: 'screenTpl_screenDesign', handle: (row) => this.screenDesign(row), show: (row) => this.isShowBtn(row) },
            { label: '查看大屏', type: 'text', auth: 'screenTpl_viewScreen', handle: (row) => this.screenView(row), show: (row) => this.isShowBtn(row) },
            { label: '复制大屏', type: 'text', auth: 'screenTpl_copy', handle: (row) => this.doCopy(row)},
            { label: '大屏分享', type: 'text', auth: 'screenTpl_share', handle: (row) => this.showShareReport(row) },
            { label: '删除', type: 'text', auth: 'screenTpl_delete', handle: (row) => this.deleteOne(row.id, row.type) }
          ] },
          { label: '模板标识', prop: 'tplCode', align: 'left', overflow: true, icon: true },
          { label: '模板名称', prop: 'tplName', align: 'center', overflow: true },
          { label: '大屏宽度', prop: 'width', align: 'center', overflow: true },
          { label: '大屏高度', prop: 'height', align: 'center', overflow: true }
          // { label: '背景图', prop: 'imgUrl', align: 'center', type: 'image', popover: true},
        ],
        // 表格列表头end
        // modal配置 start
        modalConfig: {
          title: '新增', // 弹窗标题,值为:新增，查看，编辑
          show: false, // 弹框显示
          formEditDisabled: false, // 编辑弹窗是否可编辑
          width: '700px', // 弹出框宽度
          modalRef: 'modalRef', // modal标识
          type: '1'// 类型 1新增 2编辑 3保存
        },
        // modal配置 end
        // modal表单 start
        modalForm: [
          { type: 'Input', label: '模板标识', prop: 'tplCode', rules: { required: true, maxLength: 40 }},
          { type: 'Input', label: '模板名称', prop: 'tplName', rules: { required: true, maxLength: 40 }},
          { type: 'Input', label: '大屏宽度', prop: 'width', rules: { required: true, type: 'number' }},
          { type: 'Input', label: '大屏高度', prop: 'height', rules: { required: true, type: 'number' }},
          { type: 'Select', label: '大屏数据源', prop: 'dataSource', rules: { required: false }, multiple: true, props: { label: 'name', value: 'id' }},
          { type: 'Select', label: '所属目录', prop: 'reportType', rules: { required: true }, props: { label: 'reportTypeName', value: 'id' }}
        ],
        // modal表单 end
        // modal 数据 start
        modalData: { // modal页面数据
          tplCode: '', // 模板标识
          tplName: '', // 模板名称
          width: '', // 大屏宽度
          height: '', // 大屏高度
          reportType: ''
        },
        // modal 数据 end
        // modal 按钮 start
        modalHandles: [
          { label: '取消', type: 'default', handle: () => this.closeModal() },
          { label: '提交', type: 'primary', handle: () => this.save() }
        ],
        // modal 按钮 end
        // modal配置 start
        copyModalConfig: {
          title: '复制模板', // 弹窗标题,值为:新增，查看，编辑
          show: false, // 弹框显示
          formEditDisabled: false, // 编辑弹窗是否可编辑
          width: '700px', // 弹出框宽度
          modalRef: 'modalRef', // modal标识
          type: '1'// 类型 1新增 2编辑 3保存
        },
        // modal配置 end
        // modal表单 start
        copyModalForm: [
          { type: 'Input', label: '模板标识', prop: 'tplCode', rules: { required: true, maxLength: 40 }},
          { type: 'Input', label: '模板名称', prop: 'tplName', rules: { required: true, maxLength: 40 }},
          { type: 'Input', label: '大屏宽度', prop: 'width', rules: { required: true, type: 'number' }},
          { type: 'Input', label: '大屏高度', prop: 'height', rules: { required: true, type: 'number' }},
          { type: 'Select', label: '大屏数据源', prop: 'dataSource', disabled: this.commonUtil.disabled, rules: { required: false }, multiple: true, props: { label: 'code', value: 'id' }}
        ],
        // modal表单 end
        // modal 数据 start
        copyModalData: { // modal页面数据
          tplCode: '', // 模板标识
          tplName: '', // 模板名称
          width: '', // 大屏宽度
          height: '' // 大屏高度
        },
        // modal 数据 end
        // modal 按钮 start
        copyModalHandles: [
          { label: '取消', type: 'default', handle: () => this.closeCopyModal() },
          { label: '提交', type: 'primary', handle: () => this.doCopy() }
        ],
        // modal 按钮 end
        folderModalConfig: {
          title: '新增文件夹', // 弹窗标题,值为:新增，查看，编辑
          show: false, // 弹框显示
          formEditDisabled: false, // 编辑弹窗是否可编辑
          width: '700px', // 弹出框宽度
          modalRef: 'modalRef', // modal标识
          type: '1'// 类型 1新增 2编辑 3保存
        },
        // modal配置 end
        // modal表单 start
        folderModalForm: [
          { type: 'Input', label: '目录名称', prop: 'reportTypeName', rules: { required: true, maxLength: 50 }}
        ],
        // modal表单 end
        // modal 数据 start
        folderModalData: { // modal页面数据
          reportTypeName: ''// 类型名称
        },
        // modal 数据 end
        // modal 按钮 start
        folderModalHandles: [
          { label: '取消', type: 'default', handle: () => this.closeFolderModal() },
          { label: '提交', type: 'primary', handle: () => this.saveFolder() }
        ],
        shareReportConfig: {
          title: '报表分享', // 弹窗标题,值为:新增，查看，编辑
          show: false, // 弹框显示
          formEditDisabled: false, // 编辑弹窗是否可编辑
          width: '700px', // 弹出框宽度
          modalRef: 'modalRef', // modal标识
          type: '1'// 类型 1新增 2编辑 3保存
        },
        shareReportForm: [
          { type: 'Select', label: '分享时长设置', prop: 'isShareForever', rules: { required: true }, options: this.selectUtil.shareTime,change: this.changeShareTimeType},
          { type: 'Input', label: '有效时长(分)', prop: 'shareTime', rules: { required: true, type: 'integer'}},
        ],
        shareReportModalData: { // modal页面数据
          tplId: null,
          shareTime: '', // 有效时长(分)
          isShareForever:null,
        },
        shareReportModalHandles: [
          { label: '取消', type: 'default', handle: () => this.closeShareReportModal() },
          { label: '获取分享链接', type: 'primary', handle: () => this.getShareUrl() }
        ],
      },
      requestLoading: false // 请求loading
      
    }
  },
  activated() {
    const thirdPartyType = localStorage.getItem(this.commonConstants.sessionItem.thirdPartyType)
    if (!thirdPartyType) {
      this.pageData.tableData = []
      this.searchtablelist()
      this.getReportDatasource()
      this.getReportType()
      this.getReportTypeTree()
    }
  },
  mounted() {
    const thirdPartyType = localStorage.getItem(this.commonConstants.sessionItem.thirdPartyType)
    if (thirdPartyType) {
      this.pageData.tableData = []
      this.searchtablelist()
      this.getReportDatasource()
      this.getReportType()
      this.getReportTypeTree()
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageData.tablePage.currentPage = val
      this.searchtablelist()
    },
    handleSizeChange(val) {
      this.pageData.tablePage.pageSize = val
      this.searchtablelist()
    },
    goTemStore() {
      window.open(this.$router.resolve(
        {
          name: 'templateStore',
          query: {
            temType: 'screen'
          }
        }
      ).href, '_blank')
    },
    /**
     * @description: 获取表格数据
     * @param {type}
     * @return:
     * @author: caiyang
     */
    searchtablelist() {
      this.requestLoading = true
      var obj = {
        url: this.apis.screenTpl.listApi,
        params: Object.assign({}, this.pageData.queryData, this.pageData.tablePage)
      }
      var that = this
      that.pageData.tableData = []
      this.commonUtil.getTableList(obj).then(response => {
        this.commonUtil.tableAssignment(response, this.pageData.tablePage, this.pageData.tableData)
        this.requestLoading = false
      })
    },
    resetSearch() {
      this.commonUtil.clearObj(this.pageData.queryData)
      this.searchtablelist()
    },
    /**
     * @description: modal显示
     * @param {type} 类型 1新增，2编辑 3详情
     * @param {id} 数据唯一标识
     * @return:
     * @author: caiyang
     */
    showModal(type, id, docType) {
      this.commonUtil.showModal(docType == '1' ? this.pageData.folderModalConfig : this.pageData.modalConfig, type)
      if (type == this.commonConstants.modalType.insert) {
        docType == '1' ? this.pageData.folderModalConfig.title = '新增目录' : this.pageData.modalConfig.title = '新增文档'
      } else {
        docType == '1' ? this.pageData.folderModalConfig.title = '编辑目录' : this.pageData.modalConfig.title = '编辑文档'
      }
      if (type != this.commonConstants.modalType.insert) {
        this.getDetail(id, docType)
      }
    },
    /**
     * @description: 获取详细数据
     * @param {id} 数据唯一标识
     * @return:
     * @author: caiyang
     */
    getDetail(id, docType) {
      var obj = {
        url: docType == '1' ? this.apis.reportType.getDetailApi : this.apis.screenTpl.getDetailApi,
        params: { id: id }
      }
      this.commonUtil.doGet(obj).then(response => {
        if (response.responseData.reportType == 0) {
          response.responseData.reportType = null
        }
        response.responseData.width = response.responseData.width + ''
        response.responseData.height = response.responseData.height + ''
        this.commonUtil.coperyProperties(this.pageData.modalData, response.responseData)// 数据赋值
      })
    },
    /**
     * @description: 关闭modal
     * @param
     * @return:
     * @author: caiyang
     */
    closeModal() {
      this.$refs['modalRef'].$refs['modalFormRef'].resetFields()// 校验重置
      this.pageData.modalConfig.show = false// 关闭modal
      this.commonUtil.clearObj(this.pageData.modalData)// 清空modalData
    },
    closeFolderModal() {
      this.$refs['folderModalRef'].$refs['modalFormRef'].resetFields()// 校验重置
      this.pageData.folderModalConfig.show = false// 关闭modal
      this.commonUtil.clearObj(this.pageData.folderModalData)// 清空modalData
    },
    /**
     * @description: 保存数据
     * @param {type}
     * @return:
     * @author: caiyang
     */
    save() {
      this.$refs['modalRef'].$refs['modalFormRef'].validate((valid) => {
        if (valid) {
          var obj = {
            params: this.pageData.modalData,
            removeEmpty: false
          }
          if (this.pageData.modalConfig.type == this.commonConstants.modalType.insert) {
            obj.url = this.apis.screenTpl.insertApi
          } else {
            obj.url = this.apis.screenTpl.updateApi
          }
          this.commonUtil.doPost(obj).then(response => {
            if (response.code == '200') {
              this.closeModal()
              this.searchtablelist()
            }
          })
        } else {
          return false
        }
      })
    },
    saveFolder() {
      this.$refs['folderModalRef'].$refs['modalFormRef'].validate((valid) => {
        if (valid) {
          this.pageData.folderModalData.type = 4
          var obj = {
            params: this.pageData.folderModalData,
            removeEmpty: false
          }
          if (this.pageData.folderModalConfig.type == this.commonConstants.modalType.insert) {
            obj.url = this.apis.reportType.insertApi
          } else {
            obj.url = this.apis.reportType.updateApi
          }
          this.commonUtil.doPost(obj).then(response => {
            if (response.code == '200') {
              this.closeFolderModal()
              this.searchtablelist()
              this.getReportType()
              this.getReportTypeTree()
            }
          })
        } else {
          return false
        }
      })
    },
    /**
     * @description: 删除一条数据
     * @param {id} 数据唯一标识
     * @return:
     * @author: caiyang
     */
    deleteOne(id, type) {
      const obj = {
        url: this.apis.screenTpl.deleteOneApi,
        messageContent: this.commonUtil.getMessageFromList('confirm.delete', null),
        callback: this.searchtablelist,
        params: { id: id },
        type: 'get'
      }
      if (type == 1) {
        obj.url = this.apis.reportType.deleteOneApi
        // 删除前确认是否有文件，如果有文件则不允许删除
        var checkObj = {
          params: { reportType: id },
          url: this.apis.screenTpl.getChildrenApi
        }
        this.commonUtil.doPost(checkObj).then(response => {
          if (response.code == '200') {
            if (response.responseData && response.responseData.length > 0) {
              this.commonUtil.showMessage({ message: '该目录下有文档，不允许删除！', type: this.commonConstants.messageType.error })
            } else {
              // 弹出删除确认框
              this.commonUtil.showConfirm(obj)
            }
          }
        })
      } else {
        // 弹出删除确认框
        this.commonUtil.showConfirm(obj)
      }
    },
    /**
     * @description: 批量删除
     * @param {type}
     * @return:
     * @author: caiyang
     */
    deleteBatch() {
      const length = this.pageData.selectList.length
      if (length == 0) {
        this.commonUtil.showMessage({ message: this.commonUtil.getMessageFromList('error.batchdelete.empty', null), type: this.commonConstants.messageType.error })
      } else {
        const ids = new Array()
        for (let i = 0; i < length; i++) {
          ids.push(this.pageData.selectList[i].id)
        }
        const obj = {
          url: this.apis.screenTpl.deleteBatchApi,
          messageContent: this.commonUtil.getMessageFromList('confirm.delete', null),
          callback: this.searchtablelist,
          params: ids,
          type: 'post'
        }
        this.commonUtil.showConfirm(obj)
      }
    },
    selectChange(rows) {
      this.pageData.selectList = rows
    },
    screenDesign(row) {
      const viewReport = this.$router.resolve({ name: 'screenDesign', query: { tplId: row.id, thirdPartyType: localStorage.getItem(this.commonConstants.sessionItem.thirdPartyType) }})
      window.open(viewReport.href, '_blank')
    },
    // 获取数据源
    getReportDatasource() {
      var obj = {
        params: {},
        url: this.apis.reportDatasource.getReportDatasourceApi
      }
      this.commonUtil.doPost(obj).then(response => {
        if (response.code == '200') {
          this.pageData.modalForm[4].options = response.responseData
          this.pageData.copyModalForm[4].options = response.responseData
        }
      })
    },
    // 通过socket刷新大屏
    refreshScreen(row) {
      var obj = {
        url: this.apis.screenTpl.refreshScreenApi,
        params: { id: row.id }
      }
      this.commonUtil.doPost(obj).then(response => {
      })
    },
    routerTo(row) {
      this.$store.commit('setParameters', { key: 'screenTplId', value: row.id })
      this.$router.push({ name: 'screenContent' })
    },
    screenView(row) {
      const viewReport = this.$router.resolve({ name: 'screenView', query: { tplId: row.id, sendRequest: 1 }})
      window.open(viewReport.href, '_blank')
    },
    copyTpl(row) {
      var obj = {
        url: this.apis.screenTpl.getDetailApi,
        params: { id: row.id }
      }
      var that = this
      this.commonUtil.doGet(obj).then(response => {
        this.commonUtil.coperyProperties(that.pageData.copyModalData, response.responseData)// 数据赋值
        that.pageData.copyModalData.tplCode = ''
        that.pageData.copyModalData.tplName = ''
      })
      this.pageData.copyModalConfig.show = true
    },
    closeCopyModal() {
      this.pageData.copyModalConfig.show = false
    },
    doCopy(row) {
      const obj = {
        url: this.apis.screenTpl.doCopyScreenApi,
        messageContent: this.commonUtil.getMessageFromList('confirm.screenCopy', null),
        callback: this.removeNodeCallBack,
        params: { id: row.id },
        type: 'post'
      }
      this.commonUtil.showConfirm(obj)
    },
    loadData(tree, treeNode, resolve) {
      var obj = {
        params: { reportType: tree.id },
        url: this.apis.screenTpl.getChildrenApi
      }
      this.commonUtil.doPost(obj).then(response => {
        if (response.code == '200') {
          resolve(response.responseData)
        }
      })
    },
    isShowBtn(row) {
      if (row.type == '1') {
        return false
      } else {
        return true
      }
    },
    // 获取报表类型
    getReportType() {
      var obj = {
        params: { type: 4 },
        url: this.apis.reportType.getReportTypeApi
      }
      this.commonUtil.doPost(obj).then(response => {
        if (response.code == '200') {
          this.pageData.modalForm[5].options = response.responseData
        }
      })
    },
    getReportTypeTree() {
      var obj = {
        params: { 'type': '4' },
        removeEmpty: false,
        url: this.apis.reportType.getReportTypeTreeApi
      }
      this.commonUtil.doPost(obj).then(response => {
        if (response.code == '200') {
          this.pageData.treeData = response.responseData
          this.$forceUpdate()
        }
      })
    },
    handleNodeClick(data) {
      if (data.id == '1') {
        this.pageData.queryData.reportType = ''
      } else {
        this.pageData.queryData.reportType = data.id
      }
      this.searchtablelist()
    },
    removeNode(node, data) {
      const obj = {
        url: this.apis.reportType.deleteOneApi,
        messageContent: this.commonUtil.getMessageFromList('confirm.delete', null),
        callback: this.removeNodeCallBack,
        params: { id: data.id },
        type: 'get'
      }
      var checkObj = {
        params: { reportType: data.id },
        url: this.apis.screenTpl.getChildrenApi
      }
      this.commonUtil.doPost(checkObj).then(response => {
        if (response.code == '200') {
          if (response.responseData && response.responseData.length > 0) {
            this.commonUtil.showMessage({ message: '该目录下有文档，不允许删除！', type: this.commonConstants.messageType.error })
          } else {
            // 弹出删除确认框
            this.commonUtil.showConfirm(obj)
          }
        }
      })
    },
    removeNodeCallBack() {
      this.searchtablelist()
      this.getReportType()
      this.getReportTypeTree()
    },
    showShareReport(row) {
      this.pageData.shareReportConfig.show = true
      this.pageData.shareReportModalData.tplId = row.id
      this.pageData.shareReportModalData.tplType = row.tplType
    },
    getShareUrl() {
      this.$refs['shareReport'].$refs['modalFormRef'].validate((valid) => {
        if (valid) {
          var extraParam = {}
          if (localStorage.getItem(this.commonConstants.sessionItem.thirdPartyType)) {
            extraParam.thirdPartyType = localStorage.getItem(this.commonConstants.sessionItem.thirdPartyType)
          }
          var obj = {
            params: Object.assign({}, this.pageData.shareReportModalData, extraParam),
            removeEmpty: false
          }
          obj.url = this.apis.screenTpl.getShareUrlApi
          this.commonUtil.doPost(obj).then(response => {
            if (response.code == '200') {
              const input = document.getElementById('clipboradInput') // 承载复制内容
              input.value = response.responseData.shareMsg // 修改文本框的内容
              input.select() // 选中文本
              document.execCommand('copy') // 执行浏览器复制命令
              this.commonUtil.showMessage({ message: '分享链接已经添加到剪贴板。', type: this.commonConstants.messageType.success })
              this.closeShareReportModal()
            }
          })
        } else {
          return false
        }
      })
    },
    closeShareReportModal() {
      this.pageData.shareReportConfig.show = false
      this.commonUtil.clearObj(this.pageData.shareReportModalData)// 清空modalData
      this.$refs['shareReport'].$refs['modalFormRef'].resetFields()// 校验重置
    },
    changeShareTimeType(){
      if(this.pageData.shareReportModalData.isShareForever == 1){
        this.pageData.shareReportForm[1].show = false
        this.pageData.shareReportForm[1].rules.required = false
      }else{
        this.pageData.shareReportForm[1].show = true
        this.pageData.shareReportForm[1].rules.required = true
      }
    }
  }
}
