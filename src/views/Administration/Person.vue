<template>
  <div style="width: 1500px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织员工</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/administration/person' }">人员信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:98%;padding:1%;">

      <div style="width:96%;padding:0 2%;">
        <div style="display: flex;justify-content: space-between;margin:0 0 5px 0;">
          <div style="display: flex;font-size: 16px;font-weight: bold;margin:0 0 15px 0;">
            <div style="background-color: #41d740;width:22px;height:22px;">
              <i class="el-icon-folder-opened" style="color: white;"></i>
            </div>
            <div style="padding: 0 2px;">人员信息</div>
          </div>
          <el-row>
            <el-button size="small" type="primary">新建offer</el-button>
            <el-button size="small" type="primary">转移状态</el-button>
            <el-button size="small" type="primary">导出</el-button>
          </el-row>
        </div>
        <el-card class="box-card">
          <div slot="header" style="display: flex;">
            <el-row>
              <el-button type="primary" round size="small">待发offer</el-button>
              <el-button type="primary" round size="small">已发offer</el-button>
              <el-button type="primary" round size="small">已接受offer</el-button>
              <el-button type="primary" round size="small">已拒绝offer</el-button>
              <el-button type="primary" round size="small">已入职offer</el-button>
            </el-row>
          </div>
          <el-table
            ref="multipleTable"
            :header-cell-style="isCenter"
            :cell-style="isCenter"
            :data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange">

            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="email"
              :show-overflow-tooltip="true"
              label="个人邮箱">
            </el-table-column>
            <el-table-column
              prop="type"
              label="证件类型">
            </el-table-column>
            <el-table-column
              prop="number"
              :show-overflow-tooltip="true"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="position"
              label="职位">
            </el-table-column>
            <el-table-column
              label="籍贯"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.region }}</template>
            </el-table-column>
            <el-table-column
              prop="QQ"
              :show-overflow-tooltip="true"
              label="qq">
            </el-table-column>
            <el-table-column
              prop="date"
              label="入职时间"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-card>


      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Person",
    components: {},
    props: {},
    data() {
      return {
        data:{},
        tableData: [],
        multipleSelection: [],
        total: 0,
        pagesize:10,
        currentPage:1
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      isCenter(){//回调样式
        return "text-align:center;"
      },
      getOfferData(){//获得数据
        this.$axios.req('api/getOfferData').then(res =>{
          this.data=res.data.data;
          this.total = this.data.length;
          console.log(this.data);
        }).catch(err =>{
          console.log(err);
        });
      }
    },
    mounted() {
      this.getOfferData();
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped>
  .title{
    /*标题*/
    /*width:100%;*/
    padding:15px;
    display: flex;
    align-items: center;
  }
</style>
