<style scoped lang="less">

</style>
<template>
  <div>
    <div class="nav-tab">
        <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
                <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="托运方:">
                    <el-select v-model="searchFilters.agreements__carrier" :loading="shipperLoading" clearable @change="startSearch" filterable placeholder="请输入选择">
                        <el-option v-for="(item,key) in selectData.shipperSelect" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="液厂:">
                    <el-select v-model="searchFilters.agreements__fluid" :loading="fluidLoading" clearable filterable @change="startSearch" placeholder="请输入选择">
                        <el-option v-for="(item,key) in selectData.liquidSelect" :key="item.id" :label="item.fluid_name" :value="item.id">
                        <span>{{ item.fluid_name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.customer_info">{{ item.customer_info.name }}</span>
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                </el-row>
            </el-form>
            </div>
            <div class="operation-btn text-right" v-if="false">
            <el-button type="success" >新增</el-button>
            </div>
            <div class="table-list mt-25">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" max-height="600" v-loading="pageLoading" border :class="{'tabal-height-500':!tableData.length}">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :width="item.width?item.width:140" :label="item.title">
                </el-table-column>
                <el-table-column label="操作" align="center" width="140" fixed="right">
                <template slot-scope="scope">
                    
                </template>
                </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
            </div>
            <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'freightDataList',
  computed: {
    employmentTypeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      pageLoading: false,
      siteLoading: false,
      fluidLoading: false,
      shipperLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'freight',
      searchFilters: {
        agreements__carrier: '',
        agreements__fluid: '',
        // keyword: '',
        // field: 'name',
      },
      selectData: {
        shipperSelect: [], //承运商
        liquidSelect: [] //液厂
      },
      thTableList: [{
        title: '起点里程（公里）',
        param: 'start_mileage',
        width: ''
      }, {
        title: '终点里程（公里）',
        param: 'end_mileage',
        width: ''
      }, {
        title: '起步价（元/吨）',
        param: 'initial_price',
        width: ''
      }, {
        title: '变动费率（元/吨/公里）',
        param: 'change_rate',
        width: '200'
      }, {
        title: '变动值',
        param: 'change_number',
        width: ''
      }, {
        title: '生效托运方',
        param: 'company_name',
        width: '200'
      }, {
        title: '生效液厂',
        param: 'fluid_name',
        width: ''
      }, {
        title: '生效时间',
        param: 'effective_time',
        width: '200'
      }, {
        title: '失效时间',
        param: 'dead_time',
        width: '200'
      }, {
        title: '添加时间',
        param: 'created_at',
        width: '200'
      }],
      tableData: []
    }
  },
  methods: {
   
  },
  activated() {
    
  },
  created: function() {
    
  }
}

</script>