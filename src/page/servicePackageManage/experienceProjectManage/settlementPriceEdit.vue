<style scoped lang="less">
/deep/ .code {
  input {
    border-color: #dcdfe6 !important;
  }
  i {
    display: none;
  }
}
.detail-main .detail-btn .el-button {
  width: auto;
  font-size: 12px;
}
.price-list{
  margin-bottom: 20px;
}
</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="设置结算价" name="edit">
        <div id="addPerson" class="detail-main border-top-clear">
          <el-container v-loading="pageLoading">
            <el-header>
              <el-row>
                <el-col :span="2" class="left-arrow-d">
                  <div class="go-return icon-back" @click="returnToPage"></div>
                  <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span> -->
                </el-col>
                <el-col :span="20">
                  <p>{{title}}</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main v-show="!pageLoading" class="mt-30">
              <!-- <transition name="el-fade-in-linear"> -->
              <el-form
                label-width="120px"
                ref="addFormSetpOne"
                :rules="rules"
                :model="editMsgForm"
                status-icon
              >
                <div v-for="(item,index) in editMsgForm.prices" :key="item.key" class="price-list">
                  <div class="detail-form-title text-center">
                    <el-row>
                      <el-col :span="12" :offset="6">价格{{index+1}}</el-col>
                      <el-col :span="6" class="text-right">
                        <el-button type="success" size="mini" @click="addPrice" v-if="!index">新增价格</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40" class="addheaduserform detail-form">
                    <el-col :span="10">
                      <el-form-item label="价格:" :prop="'prices.' + index + '.settlement_price'" :rules='[
                             { required: true, message: "请输入价格", trigger: "blur" },
                             { pattern:$store.state.common.regular.price.match, message: $store.state.common.regular.price.tips, trigger: "blur" }
                          ]'>
                        <el-input
                          placeholder="请输入"
                          type="text"
                          v-model.trim="item.settlement_price"
                          v-if="item.isEdit"
                        ></el-input>

                        <div v-else>{{item.settlement_price}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="适用医院:" :prop="'prices.' + index + '.partners'" :rules='[
                             { required: true, message: "请选择适用医院", trigger: "change" },
                          ]'>
                        <el-select
                          v-model="item.partners"
                          clearable
                          multiple
                          placeholder="请选择"
                          v-if="item.isEdit"
                        >
                          <el-option
                            v-for="(hospital,key) in hospitalList"
                            :key="hospital._id"
                            :label="hospital.enterprise_name"
                            :value="hospital._id"
                          ></el-option>
                        </el-select>
                        <!-- <div v-else>{{item.partners}}</div> -->
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div class="detail-btn">
                    <el-row>
                      <el-col :span="10" :offset="14" class="text-right">
                        <div v-if="item.isEdit">
                          <el-button
                            type="info"
                            size="mini"
                            @click="editBasics(saveBasicAndReviewBtn,'out')"
                          >取消</el-button>
                          <el-button type="primary" size="mini" @click="sureBtn(item)">保存</el-button>
                        </div>
                        <div v-else>
                          <el-button
                            type="danger"
                            size="mini"
                            @click="editBasics(saveBasicAndReviewBtn,'out')"
                          >删除</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="editInfo(saveBasicAndReviewBtn,'out')"
                          >编辑</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form>
              <!-- </transition> -->
            </el-main>
          </el-container>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "ratingEdit",
  computed: {
    // titleType: function() {
    //   return this.$route.query.id ? "编辑合作方" : "新增合作方";
    // },

    id: function() {
      return this.$route.params.id || "";
    },
    returnPage: function() {
      return this.$route.query.id ? "详情页" : "列表页";
    },
    enterpriseId() {
      let users = this.pbFunc.getLocalData("users", true);
      return users.enterprise._id;
    }
  },
  data() {
    return {
      dimension: 0,
      pageLoading: false,
      activeName: "edit",
      title: "",
      partnerTypeList: "", //合作方类型
      editMsgForm: {
        prices: [
          {
            id: "",
            settlement_price: "",
            partners: [],
            isEdit: true
          }
        ],
        // enterprise_name: "91",
        // enterprise_type: "",
        // contact: "离",
        // contact_phone: "17313126861",
        // credit_code: "26353637363736376F",
        // address: "四川省成都市"
        enterprise_name: "",
        enterprise_type: "",
        contact: "",
        contact_phone: "",
        credit_code: "",
        address: ""
      },
      selectData: {
        partnerType: [
          { id: "license_code", value: "医疗机构" },
          { id: "organization_code", value: "第三方服务机构" }
        ]
      },
      rules: {
        enterprise_name: [
          { required: true, message: "请输入合作方名称", trigger: "blur" },
          { min: 1, max: 20, message: "名称由1~20个字符组成", trigger: "blur" }
        ],
        enterprise_type: [
          { required: true, message: "请选择合作方类型", trigger: "change" }
        ],
        contact: [
          { required: true, message: "请输入合作联系人", trigger: "blur" },
          { min: 1, max: 5, message: "联系人由1~5个字符组成", trigger: "blur" }
        ],
        contact_phone: [
          { required: true, message: "请输入合作联系电话", trigger: "blur" },
          {
            pattern: this.$store.state.common.regular.contactPhone.match,
            message: this.$store.state.common.regular.contactPhone.tips,
            trigger: "blur"
          }
        ],
        credit_code: [
          {
            required: true,
            message: "请输入机构三合一信用码",
            trigger: "blur"
          },
          {
            pattern: this.$store.state.common.regular.creditCode.match,
            message: this.$store.state.common.regular.creditCode.tips,
            trigger: "blur"
          }
        ],
        address: [
          { required: true, message: "请输入合作方地址", trigger: "blur" }
        ]
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: "保存并退出",
        isDisabled: false
      },
      // nextStepBtn: {
      //   isLoading: false,
      //   btnText: '保存并下一步',
      //   isDisabled: false,
      // },
      detail: [
        {
          settlement_price: "",
          partners: [],
          isEdit: true
        }
      ],
      btnNew: {},
      hospitalList: [] //医院列表
    };
  },
  created() {
    if (this.id) {
      this.getDetail();
      this.getHospitalList();
    }
  },
  methods: {
    handleClick() {},
    //编辑
    editInfo(row) {
      row.isEdit = true;
    },
    // 新增价格
    addPrice() {
      this.editMsgForm.prices.forEach((item,index)=>{
        if(item.isEdit){
          this.$message({
              type: "warning",
              message: "请先保存编辑的价格！"
            });
        }
      });
      this.editMsgForm.prices.push({
        id: "",
        settlement_price: "",
        partners: [],
        isEdit: true
      });
    },
    returnToPage: function() {
      if (this.$route.query.id) {
        this.$router.push({
          path: `/basicDataManage/supplierManage/carrierManage/carrierDetail/${
            this.$route.query.id
          }/`
        });
      } else {
        this.$router.push({
          path:
            "/basicDataManage/supplierManage/carrierManage/carrierManagelist"
        });
      }
    },
    // 医院列表
    getHospitalList() {
      let postData = {
        enterpriseId: this.enterpriseId
      };
      this.$$http("associatedPartnersList", postData)
        .then(results => {
          if (results.data && results.data.code == 0) {
            this.hospitalList = results.data.content;
          }
        })
        .catch(err => {});
    },
    getDetail: function() {
      this.$$http("getProjectDetail", { id: this.id }).then(results => {
        if (results.data && results.data.code == 0) {
          if (
            results.data.content &&
            results.data.content.related_info.length
          ) {
            this.title = results.data.content.project_name;
            this.detail = results.data.content.related_info;
          } else {
            this.detail = this.editMsgForm.prices;
          }
         
        }
      });
    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      return new Promise((resolve, reject) => {
        let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
        this.btnNew = {
          btnText: btnTextCopy,
          isDisabled: false,
          isLoading: false
        };
        let apiName = "addPartner";
        this.$refs[formName].validate(valid => {
          if (valid) {
            /* 如果id存在则为编辑 */
            if (this.id) {
              postData.id = this.id;
              apiName = "updatePartner";
            }

            btnObject = {
              btnText: "正在提交",
              isDisabled: true,
              isLoading: true
            };
            this.$$http(apiName, postData)
              .then(results => {
                if (
                  results.data &&
                  results.data.code == 0 &&
                  results.data.content
                ) {
                  if (this.id) {
                    this.$router.push({
                      path: `/partnerManage/partner/partnerDetail/${this.id}/`
                    });
                  }
                  resolve(results.data.content);
                } else {
                  reject(results.data.content);
                }
              })
              .catch(err => {
                btnObject = this.btnNew;
                reject(err);
              });
          }
        });
      });
    },
    associatedPartners(btn, id) {
      let postData = {
        partner: id,
        enterpriseId: this.enterpriseId
      };
      this.$$http("associatedPartners", postData)
        .then(results => {
          this.btnObject = btn;
          console.log(results);
          if (results.data && results.data.code == 0) {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$router.push({
              path: "/partnerManage/partner/partnerList"
            });
          }
        })
        .catch(err => {
          btnObject = btn;
        });
    },
    editBasics(btn, btnType) {
      let formName = "addFormSetpOne";
      let btnObject = btn;

      let keyArray = [
        "enterprise_name",
        "enterprise_type",
        "contact",
        "contact_phone",
        "position",
        "credit_code"
      ];
      this.editMsgForm.position = {
        address: this.editMsgForm.address
      };
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      if (this.id) {
        this.editAjax(postData, formName, btnObject, null, true);
      } else {
        if (btnType === "out") {
          this.editAjax(postData, formName, btnObject, null, true).then(
            results => {
              this.associatedPartners(this.btnObject, results._id);
            }
          );
        }
      }
    }
  }
};
</script>
