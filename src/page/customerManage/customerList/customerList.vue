<template>
  <div>
    <div class="nav-tab">
      <div class="tab-screen border-top">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-input
                placeholder="请输入"
                v-model="searchFilters.keyword"
                @keyup.native.13="startSearch"
                class="search-filters-screen"
              >
                <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                  <el-option
                    v-for="(item) in selectData.fieldSelect"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="性别:">
                <el-select
                  v-model="searchFilters.gender"
                  filterable
                  @change="startSearch"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item) in selectData.genderSelect"
                    :key="item._id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn text-right" v-if="false">
        <!-- <el-button type="primary" plain>导入</el-button> -->
        <!-- <el-button type="primary">导出</el-button> -->
        <el-button type="success" @click="newPage('add')">新增</el-button>
      </div>
      <div class="table-list mt-25">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          size="mini"
          v-loading="pageLoading"
          :class="{'tabal-height-500':!tableData.length}"
        >
          <el-table-column
            v-for="(item,key) in thTableList"
            :key="key"
            :prop="item.param"
            align="center"
            :label="item.title"
            :width="item.width"
          ></el-table-column>
          <el-table-column label="已购买服务" align="center">
            <template slot-scope="scope">
              <!-- <div :title="scope.row.packageStr">{{scope.row.packageStr}}</div> -->
              <div class="no-wrap" :title="scope.row.packageStr">{{scope.row.packageStr}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="newPage('add',scope.row)">购买服务包</el-button>
            </template>
          </el-table-column>
        </el-table>
        <noData v-if="!pageLoading && tableData.length==0"></noData>
      </div>
      <div class="page-list text-center">
        <el-pagination
          background
          layout="prev, pager, next,jumper"
          :total="pageData.totalCount"
          :page-size="pageData.pageSize"
          :current-page.sync="pageData.currentPage"
          @current-change="pageChange"
          v-if="!pageLoading && pageData.totalCount>10"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'partnerList',
  computed: {
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    }
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10
      },
      searchPostData: {}, // 搜索参数
      searchFilters: {
        gender: '',
        keyword: '',
        field: 'nick_name'
      },
      selectData: {
        genderSelect: [
          { id: '', value: '全部' },
          { id: '0', value: '女' },
          { id: '1', value: '男' },
          { id: '2', value: '未知' }
        ],
        fieldSelect: [
          { id: 'nick_name', value: '姓名' },
          { id: 'identity_card', value: '身份证号' },
          { id: 'mobile_number', value: '电话' }
        ]
      },
      thTableList: [
        {
          title: '姓名',
          param: 'nick_name',
          width: ''
        },
        {
          title: '性别',
          param: 'genderStr',
          width: ''
        },
        {
          title: '身份证号',
          param: 'identity_card',
          width: '180'
        },
        {
          title: '年龄',
          param: 'age',
          width: ''
        },
        {
          title: '电话',
          param: 'mobile_number',
          width: ''
        }
      ],
      tableData: []
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList()
      })
    },
    // 搜索
    startSearch() {
      this.pageData.currentPage = 1
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters)
      this.getList()
    },
    newPage(type, row) {
      if (type === 'add') {
        window.open(
          `/#/customerManage/customerList/customerEdit/${row._id}/?user=${
            row.user
          }`,
          '_blank'
        )
      }
    },
    // 列表
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        // enterpriseId: this.enterpriseId,
        gender: this.searchPostData.gender
      }
      postData.search_type = this.searchPostData.field
      postData.search = this.searchPostData.keyword

      postData = this.pbFunc.fifterObjIsNull(postData)
      this.$$http('consumersList', postData)
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.tableData = results.data.content.instances
            this.tableData.forEach(item => {
              item.packageStr = ''
              item.genderStr = ''
              if (item.gender === '0') {
                item.genderStr = '女'
              } else if (item.gender === '1') {
                item.genderStr = '男'
              } else {
                item.genderStr = '未知'
              }
              item.package_list.forEach((packages, index) => {
                item.packageStr +=
                  packages.package_name +
                  '(' +
                  packages.package_type +
                  ')' +
                  (index < item.package_list.length - 1 ? '，' : '')
              })
            })
            this.pageData.totalCount = results.data.content.count
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.$message({
            message: '获取列表失败',
            type: 'error'
          })
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style>
</style>
