<template>
  <div style="width: 1400px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/calendar' }">日程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:98%;padding:1%;">
      <el-calendar v-model="value">
        <template
          slot="dateCell"
          slot-scope="{date, data}">
          <div style="width: 100%;height: 100%;" @click="addDynamic(data.day)">
            <div :class="data.isSelected ? 'is-selected' : ''" style="float: left;">
              {{ data.day.slice(8)}} {{ data.isSelected ? '✔️' : ''}}
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Calendar",
        components: {},
        props: {},
        data() {
            return {
              value:new Date(),
            }
        },
        methods: {
          addDynamic(dateSelected){
            let da = new Date();
            let year = da.getFullYear()+'-';
            let month = da.getMonth()+1+'-';
            let day = da.getDate();
            let today = [year,month,day].join('');
            console.log(today);
            console.log(dateSelected);
            if(this.validTime(today,dateSelected)){
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
              });
            }else{
              this.$message({
                showClose: true,
                message: '错了哦，这是一条错误消息',
                type: 'error'
              });
            }
          },
          validTime(startTime,endTime){
            let arr1 = startTime.split("-");
            let arr2 = endTime.split("-");
            let date1=new Date(parseInt(arr1[0]),parseInt(arr1[1])-1,parseInt(arr1[2]),0,0,0);
            let date2=new Date(parseInt(arr2[0]),parseInt(arr2[1])-1,parseInt(arr2[2]),0,0,0);
            if(date1.getTime()>date2.getTime()) {
              return false;
            }else{
              return true;
            }
            return false;
          },
        },
        mounted() {

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
    width:100%;
    padding:15px;
    display: flex;
    align-items: center;
  }
  .is-selected {
    color: #1989FA;
  }
</style>
