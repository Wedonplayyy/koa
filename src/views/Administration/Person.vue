<template>
  <div style="width: 1500px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织员工</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/person' }">人员信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:98%;padding:1%;">

      <div style="width:96%;padding:0 2%;">
        <div style="display: flex;justify-content: space-between;margin:0 0 5px 0;">
          <div style="display: flex;font-size: 16px;font-weight: bold;margin:0 0 15px 0;">
            <div style="background-color: #41d740;width:22px;height:22px;">
              <i class="el-icon-user" style="color: white;"></i>
            </div>
            <div style="padding: 0 2px;">人员信息</div>
          </div>
          <el-row>
            <el-button size="small" type="primary">
              批量转正申请
            </el-button>
            <el-button size="small" type="primary">导出</el-button>
          </el-row>
        </div>
        <el-card class="box-card">
          <div slot="header" style="display: flex;">
            <el-row>
                <el-button type="primary" round size="small" plain @click="getAll">全部员工</el-button>
                <el-button type="primary" round size="small" plain @click="unsatisfiedData">考核中员工</el-button>
                <el-button type="primary" round size="small" plain @click="satisfiedData">已转正员工</el-button>
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
              prop="number"
              :show-overflow-tooltip="true"
              label="工号">
            </el-table-column>
            <el-table-column
              prop="jg"
              label="机构">
            </el-table-column>
            <el-table-column
              prop="dept"
              :show-overflow-tooltip="true"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="试用期开始日期">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="试用期结束日期">
            </el-table-column>
            <el-table-column
              label="转正审批状态"
              :show-overflow-tooltip="true">
              <template slot-scope="scope"><div style="color:#409EFF">{{ scope.row.status}}</div></template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              label="操作">
              <el-button type="primary" size="small"  @click="">编辑试用期</el-button>
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
        data:[],
        allData: [],
        multipleSelection: [],
        total: 0,
        pagesize:10,
        currentPage:1
      }
    },
    methods: {
      getAll(){//全部员工
        this.data=[...this.allData];
        this.total = this.data.length;
        // console.log(this.data);
        // this.getOfferData();
      },
      unsatisfiedData(){
        let temp=this.allData.filter((item) =>{return item.status==='审批中'});
        this.data=[...temp];
        this.total= this.data.length;
        // console.log(temp);
      },
      satisfiedData(){
        let temp=this.allData.filter((item) =>{return item.status==='审批通过'});
        this.data=[...temp];
        this.total= this.data.length;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
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
        this.$axios.req('api/getPersonData').then(res =>{
          this.allData=res.data.data;
          console.log(this.allData);
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
