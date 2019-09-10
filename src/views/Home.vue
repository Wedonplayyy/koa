<template>
  <div>
    <div class="title"><i class="el-icon-message"></i>首页</div>
    <div class="graph">
      <div class="card">
        <div>本月营收</div>
        <div style="width:50px;height:50px;background-color: red"></div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="card">待回款</div>
      <el-divider direction="vertical"></el-divider>
      <div class="card">合同</div>
    </div>
    <div style="display: flex;">
      <el-card class="charts" shadow="hover">
        <div slot="header" class="card-head">
          <span>利润</span>
        </div>
        <div>

        </div>
      </el-card>
      <el-card class="updating" shadow="hover">
        <div slot="header" class="card-head">
          <span>个人动态</span>
          <el-button style="float: right;padding:5px 10px;" type="primary"  @click="dialogFormVisible = true">添加动态</el-button>
        </div>
        <div class="card-body">
          <div class="date-picker">
            <el-date-picker
              v-model="value"
              align="left"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="update-item">
            <div>123</div>
            <div>123</div>
            <div>123</div>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="invest" shadow="hover">
      <div slot="header" class="card-head">
        <span>网站调查问卷</span>
      </div>
      <div>
      </div>
    </el-card>

<!--    添加动态对话框-->
    <el-dialog title="添加动态" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="动态类型" :label-width="formLabelWidth">
          <el-select v-model="form.option" placeholder="请选择动态类型" style="width: 100%;">
            <el-option label="个人心情" value="个人心情"></el-option>
            <el-option label="工作汇报" value="工作汇报"></el-option>
            <el-option label="公司相关" value="公司相关"></el-option>
            <el-option label="其他事物" value="其他事物"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content" autocomplete="off" style="width:100%" placeholder="请输入内容"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDynamic">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
      value:"",//日期
      pickerOptions: {// 日期选择
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dialogFormVisible: false, // 添加动态对话框
      form: {// 添加动态
        option: '',
        content:"",
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getHome(){
      this.$axios.req('api/home').then(res =>{
        // console.log(res.data);
        if(res.data.code!==200){
          this.$router.push('/login');
        }
      }).catch(err =>{
        console.log(err);
      });
    },
    addDynamic(){
      this.$axios.req('api/addDynamic',{}).then(res =>{

      }).catch(err =>{
        console.log(err);
      });
      this.dialogFormVisible = false;
    }
  },

  mounted() {
    this.getHome();
  },
  created() {

  },
  filters: {},
  computed: {},
  watch: {},
  directives: {},
};
</script>

<style scoped>
  .title{
    /*标题*/
    width:50px;
    padding:15px;
  }
  .graph{
    /*首页柱状图*/
    width:90%;
    height:150px;
    margin:1%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card{
    /*柱状图*/
    width:30%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .charts{
    /*利润词云图*/
    width:44%;
    height:320px;
    margin:1%;
    background-color: white;
  }
  .updating{
    /*个人动态*/
    display: flow;
    width:44%;
    height:100%;
    margin:1%;
    background-color: white;
  }
  .invest{
    /*网站调查问卷*/
    width:90%;
    height:300px;
    margin:1%;
    background-color: white;
  }
  .card-head{
    display: flex;
    justify-content: space-between;
  }
  .card-body {
    padding: 1%;
    width: 100%;
  }
  .date-picker{
    width:100%;
    display: flex;
  }
  .update-item{
    width:100%;
    height:
  }
</style>
