<template>
  <div style="width: 1400px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb></div>
    <div class="graph">
      <div class="card">
        <div>
          <div style="color: lightgrey;">本月营收</div>
          <div style="font-size: 18px;">￥{{data0.number}}</div>
        </div>
        <el-progress :width="width" type="circle" :percentage="data0.percent"></el-progress>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="card">
        <div>
          <div style="color: lightgrey;">待回款</div>
          <div style="font-size: 18px;">￥{{data1.number}}</div>
        </div>
        <el-progress :width="width" type="circle" :percentage="data1.percent"></el-progress>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="card">
        <div>
          <div style="color: lightgrey;">合同</div>
          <div style="font-size: 18px;">￥{{data2.number}}</div>
        </div>
        <el-progress :width="width" type="circle" :percentage="data2.percent"></el-progress>
      </div>
    </div>
    <div style="display: flex;">
      <el-card class="charts" shadow="hover">
        <div slot="header" class="card-head">
          <span>利润</span>
        </div>
        <div>
          <ve-wordcloud :data="chartData" sizeMax="30"></ve-wordcloud>
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
        <el-table
          :data="tableData"
          style="width: 100%;"
          :header-cell-style="isCenter"
          :cell-style="isCenter">
          <el-table-column
            prop="name"
            label="问卷名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="问卷描述"
            width="180">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="截止时间">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="问卷主题">
            <template slot-scope="scope">
              <el-tag>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="web"
            label="网站名称">
            <template slot-scope="scope">
              <el-tag
                :type="tagReturn(scope.row.web)">{{scope.row.web}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" style="padding: 10px 20px;" @click="showDialog">查看网站详情</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    <el-dialog :visible.sync="dialogVisible">
      <div id="qrcode" style="width: 560px;height: 560px;background-color: white;"></div>
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
      qrcode: 'www.baidu.com',
      chartData: {
        columns: ['word', 'count'],
        rows: []
      },
      data:[],
      data0:{},//首页数据
      data1:{},//首页数据
      data2:{},//首页数据
      width:80,
      user:{},//用户
      value:null,//日期
      pickerOptions: {// 日期选择
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dialogVisible:false,
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
      tableData:[],// 问卷数据
    }
  },
  methods: {
    showDialog(){
      this.dialogVisible = true;
    },
    getChartData(){
      this.$axios.req('api/getChartData').then(res =>{
        console.log(res.data.data);
        this.chartData.rows=res.data.data;
      }).catch(err =>{
        console.log(err);
      })
    },
    tagReturn(para){
      switch (para) {
        case '百度':
          return 'success'
          break;
        case 'Github':
          return 'info';
          break;
        case '豆瓣':
          return 'danger';
          break;
        case '掘金':
          return 'warning';
          break;
        default:
      }
    },
    isCenter(){//回调样式
      return "text-align:center"
    },
    cancel(){// 取消
      this.dialogFormVisible = false;
      this.clearForm();
    },
    clearForm(){ //清除表格
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
          this.$store.commit('setUser', res.data.data);
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
        // console.log(str);
        this.dynamic = this.dynamic.filter(function(item){
          return item.date.slice(0,10)===str;
        })
        console.log(this.dynamic);
      }).catch(err =>{
        console.log(err);
      })
    },
    getTableData(){// 获取问卷数据
      this.$axios.req('api/getTableData').then(res =>{
        this.tableData=res.data.data;
        console.log(res.data.data);
      }).catch(err =>{
        console.log(err);
      })
    },
    getHomeData(){
      this.$axios.req('api/getHomeData').then(res =>{
        this.data = res.data.data;
        this.data0 = this.data[0];
        this.data1 = this.data[1];
        this.data2 = this.data[2];
        console.log(this.data);
      }).catch(err =>{
        console.log(err);
      })
    },
  },

  mounted() {
    this.getHome();
    this.getTableData();
    this.getHomeData();
    this.getChartData();
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
    height:500px;
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
    /*height:300px;*/
    margin:1%;
    background-color: white;
  }
  .card-head{
    display: flex;
    justify-content: space-between;
  }
  .card-body {
    padding: 1%;
    /*max-height:100%;*/
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
  .text-center{
    text-align: center;
  }
  html,.body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
</style>
