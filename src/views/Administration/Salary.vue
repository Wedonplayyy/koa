<template>
  <div style="width: 1500px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织员工</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/salary' }">薪酬管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:98%;padding:1%;">

      <div style="width:96%;padding:0 2%;">
        <div style="display: flex;justify-content: space-between;margin:0 0 5px 0;">
          <div style="display: flex;font-size: 16px;font-weight: bold;margin:0 0 15px 0;">
            <div style="background-color: #41d740;width:22px;height:22px;">
              <i class="el-icon-price-tag" style="color: white;"></i>
            </div>
            <div style="padding: 0 2px;">薪酬管理</div>
          </div>
        </div>
        <div style="display: flex;background-color: white;justify-content: space-between;padding:10px;">
          <div style="font-size: 20px;font-weight: bold;display: flex;align-items: center">{{dateFormat(this.value)}}   薪酬预算</div>
          <div>
            <el-date-picker
              v-model="value"
              type="month"
              placeholder="选择月"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div style="background-color: #d4efbc;padding:10px;display: flex;">如果有更多的渠道请自行添加</div>
        <el-card class="box-card">
          <div slot="header" style="display: flex;font-size: 22px;font-weight: bold;">
            薪资结构
          </div>
          <el-table
            stripe
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              prop="name"
              label="薪资构成"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="planCost"
              label="计划支出（元）"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="actualCost"
              label="实际支出（元）"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column>
            </el-table-column>
            <el-table-column
              prop="planCostLastM"
              label="上月计划（元）"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="actualCostLastM"
              label="上月实际（元）"
              align="center"
              width="180">
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between">
            <div style="display: flex;color: #409EFF;">
              <div style="width: 180px;">总计</div>
              <div style="width: 180px;"></div>
              <div style="width: 180px;"></div>
            </div>
            <div style="display: flex">
              <div style="width: 180px;"></div>
              <div style="width: 180px;"></div>
            </div>

          </div>
        </el-card>


      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Salary",
    components: {},
    props: {},
    data() {
      return {
        tableData:[],//表格数据
        value:new Date(),//月份
        pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },{
            text: '上月',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime()-3600 * 1000 * 24 * 30)
              picker.$emit('pick', date);
            }
          }]},
      }
    },
    methods: {
      getData(){
        this.$axios.req('api/getSalaryData').then(res =>{
          console.log(res);
          this.tableData=res.data.data;
        }).catch(err =>{
          console.log(err);
        })
      },
      dateFormat(times){// 日期格式化
        let da = new Date(times);
        let year = da.getFullYear()+'年';
        let month = da.getMonth()+1+'月';
        return [year,month].join('');
      },
    },
    mounted() {
      this.getData();
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
