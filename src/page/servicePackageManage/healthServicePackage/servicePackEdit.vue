<style scoped lang="less">
/deep/ .code {
  input {
    border-color: #dcdfe6 !important;
  }
  i {
    display: none;
  }
}
.table-list {
  border: 0;
  margin-bottom: 20px;
}
/deep/.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
.management-table .el-table {
  /deep/ td {
    padding: 0;
    font-size: 13px;
  }
  /deep/ .cell {
    padding: 0 !important;
  }
  td {
    vertical-align: middle;
    display: table-cell;

    li {
      padding: 6px 10px;
      min-height: 24px;
      border-bottom: 1px solid #e4e7ed;

      &:last-child {
        border-bottom: 0;
      }

      /deep/ .el-checkbox__label {
        font-size: 13px;
      }
    }
  }
  .el-checkbox {
    margin-top: 10px;
  }
}
.number-item .el-form-item {
  margin-bottom: 0;
}
.inp-number {
  padding-top: 4px;
  input {
    width: 180px;
    height: 26px;
    padding: 0 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #dcdfe6;
  }
}
/deep/.table-list .el-table--mini th {
  padding: 0 !important;
}
</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div>
            <div class="detail-form-title text-center">基础信息</div>
            <el-form
              class="addheaduserform detail-form"
              label-width="120px"
              ref="addFormSetpOne"
              :rules="rules"
              :model="editMsgForm"
              status-icon
            >
              <el-row :gutter="40">
                <!-- <el-col :span="8">
                  <el-form-item label="合作方名称:" prop="enterprise_name">
                    <el-input
                      placeholder="请输入"
                      type="text"
                      v-model.trim="editMsgForm.enterprise_name"
                    ></el-input>
                  </el-form-item>
                </el-col>-->
                <el-col :span="10" v-if="type!=='management'">
                  <el-form-item label="服务包合作方:" prop="service_agencies">
                    <el-select
                      v-model="editMsgForm.service_agencies"
                      clearable
                      placeholder="请选择"
                      @change="selectService"
                    >
                      <el-option
                        v-for="(item) in partnersList"
                        :key="item._id"
                        :label="item.enterprise_name"
                        :value="item._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-if="type!=='outsource'">
                  <el-form-item label="服务性别:" prop="service_sex">
                    <el-select v-model="editMsgForm.service_sex" clearable placeholder="请选择">
                      <el-option
                        v-for="(item) in genderList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40" v-if="type==='medical'">
                <el-col :span="24">
                  <el-form-item label prop="selectProjects" label-width="0px">
                    <div class="table-list">
                      <el-table
                        :data="editMsgForm.showProjects"
                        stripe
                        style="width: 100%"
                        size="mini"
                        v-loading="categoryLoading"
                        border
                        :class="{'tabal-height-500':editMsgForm.showProjects&&!editMsgForm.showProjects.length}"
                      >
                        <el-table-column
                          v-for="(item,key) in thTableList"
                          :key="key"
                          :prop="item.param"
                          :width="item.width?item.width:''"
                          :label="item.title"
                          :align="item.align"
                        >
                          <template slot-scope="scope">
                            <div v-if="item.param === 'sub_projects'">
                              <el-checkbox-group
                                v-model="editMsgForm.selectProjects"
                                @change="calculatedSettlementPrice"
                              >
                                <el-checkbox
                                  v-for="(projects) in scope.row.sub_projects"
                                  :key="projects._id"
                                  :label="projects.selectId"
                                >{{projects.project_name}}</el-checkbox>
                              </el-checkbox-group>
                            </div>
                            <div v-else>{{scope.row[item.param]}}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                      <no-data
                        v-if="!categoryLoading && editMsgForm.showProjects&&!editMsgForm.showProjects.length"
                      ></no-data>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算价格:" label-width="80px">
                    <div>{{editMsgForm.settlement_price}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40" v-else-if="type==='management'">
                <el-col :span="24">
                  <el-form-item label prop="selectProjects" label-width="0px">
                    <div class="table-list management-table">
                      <el-table
                        :data="editMsgForm.showProjects"
                        stripe
                        style="width: 100%"
                        size="mini"
                        v-loading="categoryLoading"
                        border
                        :class="{'tabal-height-500':editMsgForm.showProjects&&!editMsgForm.showProjects.length}"
                      >
                        <el-table-column
                          v-for="(item,key) in thTableList"
                          :key="key"
                          :prop="item.param"
                          :width="item.width?item.width:''"
                          :label="item.title"
                          :align="item.align"
                        >
                          <template slot-scope="scope">
                            <div v-if="item.param === 'sub_projects'">
                              <ul class="power-op">
                                <li v-for="(projects,index) in scope.row.sub_projects" :key="index">
                                  <el-row>
                                    <el-col :span="4">
                                      <el-checkbox-group v-model="editMsgForm.selectProjects">
                                        <el-checkbox
                                          :label="projects.selectId"
                                        >{{projects.project_name}}</el-checkbox>
                                      </el-checkbox-group>
                                    </el-col>
                                    <el-col :span="8" class="number-item">
                                      <div class="inp-number">
                                        <span>次数：</span>
                                        <input
                                          placeholder="请输入1~999数字"
                                          type="text"
                                          v-model="projects.number"
                                        >
                                      </div>
                                    </el-col>
                                  </el-row>
                                </li>
                              </ul>
                            </div>
                            <div v-else>{{scope.row[item.param]}}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                      <no-data v-if="!categoryLoading &&  !editMsgForm.showProjects.length"></no-data>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="10">
                  <el-form-item label="服务包名称:" prop="package_name">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.package_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="服务包价格:" prop="package_price">
                    <el-input
                      placeholder="请输入"
                      type="text"
                      v-model.trim="editMsgForm.package_price"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="服务包说明:" prop="package_description">
                    <el-input
                      placeholder="请输入"
                      type="textarea"
                      :rows="5"
                      v-model.trim="editMsgForm.package_description"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="有效时间:" prop="effectTime">
                    <el-date-picker
                      v-model="editMsgForm.effectTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :default-time="['00:00:00', '23:59:59']"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button
                    type="primary"
                    @click="editBasics(saveBasicAndReviewBtn,'out')"
                    :loading="saveBasicAndReviewBtn.isLoading"
                    :disabled="saveBasicAndReviewBtn.isDisabled"
                  >{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'ratingEdit',
  computed: {
    id: function() {
      return this.$route.query.id
    },
    typeId: function() {
      return this.$route.params.typeId || ''
    },
    type: function() {
      return this.$route.params.type || ''
    },
    titleType: function() {
      let type = this.$route.params.type
      let title = ''
      if (type === 'medical') {
        title = '体检类'
      } else if (type === 'management') {
        title = '健康管理类'
      } else {
        title = '健康管理外包类'
      }
      return this.$route.query.id
        ? '编辑' + title + '服务包'
        : '新增' + title + '服务包'
    },
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    }
  },
  data() {
    return {
      dimension: 0,
      pageLoading: false,
      categoryLoading: false, // 检查项Loading
      genderList: [
        {
          id: '2',
          value: '不限'
        },
        {
          id: '1',
          value: '男'
        },
        {
          id: '0',
          value: '女'
        }
      ],
      addType: '默认新增',
      partnersList: '', // 合作方列表
      editMsgForm: {
        service_agencies: '',
        effectTime: [],
        settlement_price: 0,
        service_sex: '',
        package_name: '',
        package_description: '',
        package_price: '',
        selectProjects: [],
        showProjects: [],
        projects: []
      },
      categoryList: [], // 检查项
      selectData: {
        partnerType: [
          { id: 'license_code', value: '医疗机构' },
          { id: 'organization_code', value: '第三方服务机构' }
        ]
      },
      thTableList: [
        {
          title: '类别',
          param: 'project_name',
          width: '200',
          align: 'center'
        },
        {
          title: '小项',
          param: 'sub_projects',
          width: '',
          align: ''
        }
      ],
      rules: {
        package_name: [
          { required: true, message: '请输入服务包名称', trigger: 'blur' },
          { min: 1, max: 20, message: '名称由1~20个字符组成', trigger: 'blur' }
        ],
        service_agencies: [
          { required: true, message: '请选择服务包合作方', trigger: 'change' }
        ],
        selectProjects: [
          { required: true, message: '请勾选小项', trigger: 'change' }
        ],
        service_sex: [
          { required: true, message: '请选择服务性别', trigger: 'change' }
        ],
        package_price: [
          { required: true, message: '请输入服务包价格', trigger: 'blur' },
          {
            pattern: this.$store.state.common.regular.price.match,
            message: this.$store.state.common.regular.price.tips,
            trigger: 'blur'
          }
        ],
        package_description: [
          {
            required: true,
            message: '请输入服务包说明',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 200,
            message: '请输入200字以内说明',
            trigger: 'blur'
          }
        ],
        effectTime: [
          { required: true, message: '请选择有效时间', trigger: 'change' }
        ]
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存',
        isDisabled: false
      },
      // nextStepBtn: {
      //   isLoading: false,
      //   btnText: '保存并下一步',
      //   isDisabled: false,
      // },
      detail: {},
      btnNew: {}
    }
  },
  created() {
    if (this.id) {
      this.getCategoryList().then(results => {
        if (results.data && results.data.code === 0) {
          this.getDetail(this.editMsgForm.showProjects)
        }
      })
    } else {
      if (this.type === 'medical' || (this.type === 'management' && !this.id)) {
        this.getCategoryList()
      }
    }
    this.getPartnersList()
  },
  methods: {
    returnToPage: function() {
      if (this.$route.query.id) {
        this.$router.push({
          path: `/servicePackageManage/healthServicePackage/servicePackDetail/${
            this.id
          }/`
        })
      } else {
        this.$router.push({
          path: '/servicePackageManage/healthServicePackage/servicePackList'
        })
      }
    },
    // 选择合作方
    selectService(query) {
      this.editMsgForm.settlement_price = 0
      this.editMsgForm.selectProjects = []
      if (query) {
        this.getCategoryList(query)
      } else {
        this.editMsgForm.showProjects = []
      }
    },
    // 合作方
    getPartnersList() {
      this.$$http('associatedPartnersList', {
        enterpriseId: this.enterpriseId,
        enterprise_type: 'hospital',
        need_all: true
      })
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.partnersList = results.data.content.instances
          }
        })
        // eslint-disable-next-line
        .catch(error => {
          this.$message({
            type: 'error',
            message: '获取服务包合作方列表失败'
          })
        })
    },
    // 计算结算价格
    calculatedSettlementPrice() {
      if (this.editMsgForm.service_agencies) {
        let ids = []
        this.editMsgForm.settlement_price = 0
        this.editMsgForm.showProjects.forEach(item => {
          item.sub_projects.forEach(project => {
            this.editMsgForm.selectProjects.forEach(id => {
              ids = id.split(',')
              if (ids[1] === project._id) {
                project.related_info.forEach(related => {
                  this.editMsgForm.settlement_price += parseFloat(
                    related.settlement_price
                  )
                })
              }
            })
          })
        })
      } else {
        this.editMsgForm.selectProjects = []
        this.$message.warning('请先选择服务包合作方！')
      }
    },
    // 详情
    getDetail(showProjects) {
      this.$$http('servicePackDetail', { id: this.id }).then(results => {
        if (results.data && results.data.code === 0) {
          this.detail = results.data.content
          this.editMsgForm = {
            service_agencies: this.detail.service_agencies._id,
            effectTime: [
              this.detail.effect_time_start,
              this.detail.effect_time_end
            ],
            settlement_price: this.detail.settlement_price,
            service_sex: this.detail.service_sex.key,
            package_name: this.detail.package_name,
            package_description: this.detail.package_description,
            package_price: this.detail.package_price,
            selectProjects: [],
            showProjects: showProjects.length ? showProjects : [],
            projects: []
          }
          this.editMsgForm.showProjects.forEach(showItem => {
            this.detail.projects.forEach(item => {
              if (showItem._id === item.project_id) {
                showItem.sub_projects.forEach(showProject => {
                  item.sub_projects.forEach(project => {
                    if (showProject._id === project.project_id) {
                      let projectStr =
                        item.project_id + ',' + project.project_id
                      this.editMsgForm.selectProjects.push(projectStr)
                      showProject.number = project.count
                    }
                  })
                })
              }
            })
          })
          // console.log(
          //   'this.editMsgForm.selectProjects',
          //   this.editMsgForm.selectProjects
          // )
        }
      })
    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      return new Promise((resolve, reject) => {
        let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText
        this.btnNew = {
          btnText: btnTextCopy,
          isDisabled: false,
          isLoading: false
        }
        let apiName = 'addServicePack'
        this.$refs[formName].validate(valid => {
          if (valid) {
            /* 如果id存在则为编辑 */
            if (this.id) {
              postData.id = this.id
              apiName = 'updateServicePack'
            } else {
              postData.enterprise = this.enterpriseId
            }
            postData.package_type = this.typeId

            btnObject = {
              btnText: '正在提交',
              isDisabled: true,
              isLoading: true
            }
            this.$$http(apiName, postData)
              .then(results => {
                if (
                  results.data &&
                  results.data.code === 0 &&
                  results.data.content
                ) {
                  if (this.id) {
                    this.$router.push({
                      path: `/servicePackageManage/healthServicePackage/servicePackDetail/${
                        this.id
                      }/`
                    })
                  } else {
                    this.$router.push({
                      path: `/servicePackageManage/healthServicePackage/servicePackList`
                    })
                  }
                  this.$message.success('提交成功！')
                  resolve(results.data.content)
                } else {
                  reject(results.data.content)
                  this.$message.error('提交失败！')
                }
              })
              // eslint-disable-next-line
              .catch(err => {
                btnObject = this.btnNew
                this.$message.error('提交失败！')
                reject(err)
              })
          }
        })
      })
    },

    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne'
      let btnObject = btn

      let keyArray = [
        'package_name',
        'package_price',
        'service_agencies',
        'package_description',
        'settlement_price',
        'effect_time_start',
        'effect_time_end'
      ]
      this.editMsgForm.effect_time_start = this.editMsgForm.effectTime[0]
      this.editMsgForm.effect_time_end = this.editMsgForm.effectTime[1]
      if (this.type !== 'outsource') {
        this.editMsgForm.projects = []
        keyArray.push('projects')
        keyArray.push('service_sex')
        this.editMsgForm.selectProjects.forEach(item => {
          let ids = item.split(',')
          this.editMsgForm.projects.push({
            first: ids[0],
            second: ids[1],
            count: ''
          })
        })
      }
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray)
      postData.settlement_price = postData.settlement_price
        ? parseFloat(postData.settlement_price)
        : 0
      postData.package_price = parseFloat(postData.package_price)
      if (this.type === 'management') {
        this.editMsgForm.service_agencies = this.enterpriseId
        this.editMsgForm.showProjects.forEach(item => {
          item.sub_projects.forEach(project => {
            postData.projects.forEach(list => {
              if (project._id === list.second) {
                list.count = parseInt(project.number)
              }
            })
          })
        })
        this.frequencyReg(this.editMsgForm.selectProjects).then(data => {
          if (data) {
            if (this.id) {
              this.editAjax(postData, formName, btnObject, null, true)
            } else {
              if (btnType === 'out') {
                this.editAjax(postData, formName, btnObject, null, true)
              }
            }
          }
        })
      } else {
        if (this.id) {
          this.editAjax(postData, formName, btnObject, null, true)
        } else {
          if (btnType === 'out') {
            this.editAjax(postData, formName, btnObject, null, true)
          }
        }
      }
    },
    // 次数验证
    frequencyReg(list) {
      return new Promise((resolve, reject) => {
        this.editMsgForm.showProjects.forEach(item => {
          item.sub_projects.forEach(project => {
            list.forEach(id => {
              let ids = id.split(',')
              if (project._id === ids[1]) {
                if (!project.number) {
                  this.$message.error('请输入次数！')
                  resolve(false)
                } else if (
                  this.$store.state.common.regular.frequency.match.test(
                    project.number
                  )
                  // project.number.match(
                  //   this.$store.state.common.regular.frequency.match
                  // )
                ) {
                  this.$message.error(
                    this.$store.state.common.regular.frequency.tips
                  )
                  resolve(false)
                } else if (project.number > 999) {
                  this.$message.error(
                    this.$store.state.common.regular.frequency.tips
                  )
                  resolve(false)
                }
              }
            })
          })
        })
        resolve(true)
      })
    },
    // 获取类别列表
    getCategoryList(partnerId) {
      return new Promise((resolve, reject) => {
        let postData = {
          enterprise: this.enterpriseId,
          package_type: this.type
        }
        if (partnerId) {
          postData.partner_id = partnerId
        }
        this.categoryLoading = true
        this.$$http('getProjectList', postData)
          .then(results => {
            this.categoryLoading = false
            if (results.data && results.data.code === 0) {
              this.editMsgForm.showProjects = results.data.content
              this.editMsgForm.showProjects.forEach(item => {
                item.sub_projects.forEach(project => {
                  project.selectId = item._id + ',' + project._id
                  project.number = ''
                })
              })
              resolve(results)
            } else {
              reject(results)
            }
          })
          // eslint-disable-next-line
          .catch(err => {
            this.categoryLoading = false
            reject(err)
            this.$message.error('获取检查项列表失败！')
          })
      })
    }
  }
}
</script>
