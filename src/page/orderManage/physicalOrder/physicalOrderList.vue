<template>
  <div>
    <div class="nav-tab">
      <div class="tab-screen border-top">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-input placeholder="请输入" v-model="searchFilters.keyword"  class="search-filters-screen">
                <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" ></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="性别:">
                <el-select v-model="searchFilters.complete_status"  placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.perfectSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签约属性:">
                <el-select v-model="searchFilters.complete_status"  placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.select1" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" plain>导入</el-button> -->
        <!-- <el-button type="primary">导出</el-button> -->
        <el-button type="success" @click="goAddLink">新增</el-button>
      </div>
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleMenuClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <noData v-if="!pageLoading && tableData.length==0"></noData>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'healthRecordList',
  computed: {

  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      searchPostData: {}, //搜索参数
      searchFilters: {
        complete_status: '',
        keyword: '',
        field: 'tractor_plate_number',
      },
      selectData: {
        perfectSelect: [
          { id: '', value: '全部' },
          { id: false, value: '男' },
          { id: true, value: '女' }
        ],
        select1: [
          { id: '', value: '全部' },
          { id: false, value: '已签约' },
          { id: true, value: '未签约' }
        ],
        fieldSelect: [
          { id: 'tractor_plate_number', value: '姓名' },
          { id: 'semitrailer_plate_number', value: '身份证' },
          { id: 'semitrailer_plate_number', value: '电话' },
        ]
      },
      thTableList: [{
        title: '体检订单号',
        param: 'tractor.plate_number',
        width: ''
      }, {
        title: '体检用户姓名',
        param: 'semitrailer.plate_number',
        width: ''
      }, {
        title: '身份证号',
        param: 'master_driver.name',
        width: ''
      },{
        title: '体检内容',
        param: 'tractor.carrier.name',
        width: ''
      }, {
        title: '订单分配对象',
        param: 'master_driver.id_number',
        width: ''
      }, {
        title: '下单时间',
        param: 'master_driver.id_number',
        width: ''
      }, {
        title: '订单同步时间',
        param: 'master_driver.id_number',
        width: ''
      }, {
        title: '订单状态',
        param: 'master_driver.id_number',
        width: ''
      }, {
        title: '验证码',
        param: 'master_driver.id_number',
        width: ''
      }],
      tableData: []
    }
  },
  methods: {
    goAddLink(){
      window.open(`/#/nstitutionalRating/rating/ratingEdit`,'_blank');
    }
    
  },
  created() {
  }

}

</script>
<style>


</style>
