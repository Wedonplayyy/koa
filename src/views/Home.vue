<template>
  <div style="width: 1400px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>首页</div>
    <div class="graph">
      <div class="card">
        <div>本月营收</div>
        <el-progress type="circle" :percentage="25"></el-progress>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="card">
        <div>待回款</div>
        <el-progress type="circle" :percentage="25"></el-progress>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="card">
        <div>合同</div>
        <el-progress type="circle" :percentage="25"></el-progress>
      </div>
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
              value-format="yyyy-MM-dd"
              @change="getDynamic"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="dynamic">
            <div v-if="Object.keys(this.dynamic).length==0" style="display: flex;padding:2%;">暂无数据</div>

            <div v-else style="overflow-y:scroll;height:245px;">
              <div v-for="item in this.dynamic" :key="item._id" style="padding:1% 2%;margin: 1% 0%;background-color: #eeeeee;">
                <div class="dynamic-item">
                  <div>{{item.classification}}</div>
                  <div>{{item.username}}</div>
                </div>
                <div>
                  <div v-if="item.reportUsers.length===0">
                    <div style="visibility: hidden">隐藏的div</div>
                  </div>
                  <div v-else class="dynamic-item">
                    <div  style="display: flex;">
                      汇报人:<div v-for="(user,index) in item.reportUsers" :key="index">{{user}}</div>
                    </div>
                  </div>
                </div>
                <div class="dynamic-item">
                  <div>动态:{{item.dynamic}}</div>
                  <div>发布于{{dateFormat(item.date)}}</div>
                </div>
              </div>
            </div>
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
        <el-form-item
          v-if="form.option==='工作汇报'"
          label="相关汇报人" :label-width="formLabelWidth">
          <el-select v-model="Person.option" placeholder="请选择汇报人" style="width: 100%;" multiple @change="show">
            <el-option label="张三" value="张三"></el-option>
            <el-option label="李四" value="李四"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content" autocomplete="off" style="width:100%" placeholder="请输入内容"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
      user:{},//用户
      value:null,//日期
      pickerOptions: {// 日期选择
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dialogFormVisible: false, // 添加动态对话框
      form: {// 添加动态
        option: null,
        content:null,
      },
      Person: {// 汇报人
        option: null,
      },
      formLabelWidth: '120px',
      dynamic:{},// get获取的动态
    }
  },
  methods: {
    cancel(){
      this.dialogFormVisible = false;
      this.clearForm();
    },
    clearForm(){
      this.form.option =null;
      this.form.content=null;
      this.Person.option=null;
    },
    dateFormat(times){// 日期格式化
      let da = new Date(times);
      let year = da.getFullYear()+'年';
      let month = da.getMonth()+1+'月';
      let day = da.getDate()+'日';
      return [year,month,day].join('');
    },
    getHome(){//验证是否登陆
      this.$axios.req('api/home').then(res =>{
        // console.log(res.data);
        if(res.data.code!==200){
          this.$router.push('/login');
        }
        else{
          this.user = res.data.data;
          console.log(res.data);
          console.log(this.user);
          // this.getDynamic(this.value);
        }
      }).catch(err =>{
        console.log(err);
      });
    },
    addDynamic(){//添加动态
      this.$axios.req('api/addDynamic',{
        //发布人
        username: this.user.username,
        // 发布时间
        date: Date.now,
        // 动态内容
        dynamic: this.form.content,
        // 动态分类
        classification: this.form.option,
        // 汇报人
        reportUsers: this.Person.option
      }).then(res =>{
        console.log(res.data);
        this.clearForm();
        this.getDynamic();
      }).catch(err =>{
        console.log(err);
        this.clearForm();
      });
      this.dialogFormVisible = false;
    },
    getDynamic(){//根据选中的时间获取动态
      this.$axios.req('api/getDynamic').then(res =>{
        this.dynamic=res.data.data;
        let str =String(this.value);
        console.log(str);
        this.dynamic = this.dynamic.filter(function(item){
          return item.date.slice(0,10)===str;
        })
        console.log(this.dynamic);
      }).catch(err =>{
        console.log(err);
      })
    },
    getTableData(){
      this.$axios.req('api/getTableData').then(res =>{
        console.log(res.data.data);
      }).catch(err =>{
        console.log(err);
      })
    },
  },

  mounted() {
    this.getHome();
    this.getTableData();
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
    width:100%;
    padding:15px;
    display: flex;
    align-items: center;
  }
  .graph{
    /*首页图*/
    width:90%;
    height:150px;
    margin:1%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card{
    /*图*/
    width:30%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .charts{
    /*利润词云图*/
    width:44%;
    height:400px;
    margin:1%;
    background-color: white;
  }
  .updating{
    /*个人动态*/
    display: flow;
    width:44%;
    height:100%;
    max-height:400px;
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
    max-height:100%;
    width: 100%;
  }
  .date-picker{
    width:100%;
    display: flex;
  }
  .dynamic{
    width:100%;
  }
  .dynamic-item{
    padding:2% 0%;
    display: flex;
    justify-content: space-between;
  }
</style>
