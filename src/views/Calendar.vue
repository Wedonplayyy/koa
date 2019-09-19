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
          <div style="width: 100%;max-height: 100%;max-width: 100%;" >
            <div :class="data.isSelected ? 'is-selected' : ''" style="text-align: left;width: 100%;" @click="addDialog(data.day)">
              {{ data.day.slice(8)}} {{ data.isSelected ? '✔️' : ''}}
            </div>
            <div style="width: 100%;height:60px;overflow-y:auto;font-size:10px;" v-if="hasDynamic(data.day).length!==0">
              <div v-for="item in hasDynamic(data.day)"
                   :key="item._id"
                   @click="deleteCalendar(item._id,data.day)"
                   style="margin:0px 0px 5px 0px;padding:1px 2px;background-color: #e1f3d8;">
                <div class="leftText">{{dateFormat(item.startTime)}}-{{dateFormat(item.endTime)}}  {{item.schedule}}</div>
                <div class="leftText flex">
                  参与人：
                  <div v-for="(user,index) in item.users" :key="index">{{user}}</div>
                </div>
                <div class="leftText">参与人数：{{item.users.length}}</div>
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
        </template>
      </el-calendar>
    </div>


    <el-dialog title="添加日程" :visible.sync="outerVisible">
      <el-form :model="form">
        <el-form-item label="日程" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input placeholder="准备做什么..." v-model="form.content" style="display:flex;width: 80%;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <div style="width: 80%;display: flex;justify-content: space-between;">
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"

              :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'}">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime}">
            </el-time-select>
          </div>
        </el-form-item>
        <el-form-item label="参与人" :label-width="formLabelWidth">
          <div style="display: flex;width: 100%;height:40px;">
            <div v-for="item in this.form.person">{{item}}</div>
            <div>
              <i class="el-icon-circle-plus-outline" style="color: #409EFF;" @click="innerVisible = true" ></i>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <el-dialog
        width="30%"
        title="参与人"
        :visible.sync="innerVisible"
        append-to-body>
        <el-input placeholder="请输入参与人姓名..." v-model="name" :rules="[{ required: true, message: '年龄不能为空'},]"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelInner">取 消</el-button>
          <el-button type="primary"  @click="addPerson">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOuter">取 消</el-button>
        <el-button type="primary" @click="addDynamic">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      :visible.sync="deleteDialogVisible"
      append-to-body>
      <div style="text-align: center;font-size: 20px;">确定删除该日程吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDel">取 消</el-button>
        <el-button type="primary"  @click="delCalendar(id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "Calendar",
        components: {},
        props: {},
        data() {
            return {
              // user:{},
              id:null,//要删除的日程id
              arr:[],
              calendar:[],//日程数组
              dateSelected:'',//添加日程的日期
              value:new Date(),// 今天时间数据
              outerVisible: false,// 对话框
              innerVisible: false,// 参与人对话框
              deleteDialogVisible:false,// 删除日程对话框
              form: {
                content: '',//日程内容
                person: [],//参与人
              },
              formLabelWidth: '120px',
              startTime: '',
              endTime: '',
              name:'',//参与人姓名
            }

        },
        methods: {
          delCalendar(id){
            console.log(id);

            if(id!==null){
              this.$axios.req('api/delCalendar',{
                id:id
              }).then(res =>{
                // console.log(res.data);
                if(res.data.code===200){
                  this.getCalendar();
                  this.deleteDialogVisible=false;
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                  });
                }
              }).catch(err =>{
                console.log(err);
              });
            }
          },
          dateFormat(times){// 日期格式化
            let da = new Date(times);
            let h = da.getHours()+':';
            let m = da.getMinutes();
            return [h,m].join('');
          },
          hasDynamic(day){// 返回满足日期的日程
            return this.calendar.filter(function f(item) {
              return (String(item.startTime).slice(0, 10))===day? item:null;
              });
          },
          cancelInner(){// 取消
            this.innerVisible = false;
            this.name=null;
          },
          cancelOuter(){// 取消
            this.outerVisible = false;
            this.form.content = null;
            this.form.person = [];
            this.startTime=null;
            this.endTime=null;
          },
          cancelDel(){
            this.deleteDialogVisible=false;
            this.id=null;
          },
          addPerson(){//添加参与人
            if(this.name){
              this.form.person.push(this.name);
              this.innerVisible=false;
              this.name = null;
            }
            else{
              this.$message({
                showClose: true,
                message: '姓名不能为空',
                type: 'error'
              });
            }
          },
          getCalendar(){// 获取日程
            this.$axios.req('api/calendar').then(res =>{
              this.calendar=res.data.data;
              console.log(res.data.data);
            }).catch(err =>{
              console.log(err);
            })
          },
          addDynamic(){// 添加日程
            if(this.form.content&&this.startTime&&this.endTime&&this.person!==[]){
              let st = new String(this.dateSelected.concat(' '+this.startTime+':00'));
              let et = new String(this.dateSelected.concat(' '+this.endTime+':00'));
              // console.log(new Date(st));
              // console.log(new Date(et));
              // console.log(typeof(this.form.person));
              // console.log(typeof(this.form.content));
              this.$axios.req('api/calendar',{
                // 参与人
                users: this.form.person,
                // 开始时间
                startTime: new Date(st),
                // 结束时间
                endTime: new Date(et),
                // 日程内容
                schedule: this.form.content,
              }).then(res =>{
                // console.log(res.data);
                if(res.data.code===200){
                  this.getCalendar();
                  this.cancelOuter();
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                  });
                }
              }).catch(err =>{
                console.log(err);
              })
            }
            else{
              return
            }
          },
          addDialog(dateSelected){// 点击日期弹出添加日程对话框
            this.dateSelected = dateSelected;
            let da = new Date();
            let year = da.getFullYear()+'-';
            let month = da.getMonth()+1+'-';
            let day = da.getDate();
            let today = [year,month,day].join('');
            // console.log(today);
            // console.log(typeof(today));
            // console.log(typeof(this.dateSelected));
            console.log(dateSelected);
            if(this.validTime(today,dateSelected)){
              this.outerVisible = true;
              // this.$message({
              //   message: '恭喜你，这是一条成功消息',
              //   type: 'success'
              // });
            }else{
              this.$message({
                showClose: true,
                message: '不能安排今天之前的日程!',
                type: 'error'
              });
            }
          },
          deleteCalendar(tid,dateSelected){// 弹出删除日程对话框
            let da = new Date();
            let year = da.getFullYear()+'-';
            let month = da.getMonth()+1+'-';
            let day = da.getDate();
            let today = [year,month,day].join('');
            if(this.validTime(today,dateSelected)){
              this.id=tid;
              console.log(this.id);
              this.deleteDialogVisible = true;
            }else{
              this.$message({
                showClose: true,
                message: '不能修改今天之前的日程!',
                type: 'error'
              });
            }
          },
          validTime(startTime,endTime){// 比较时间
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
          getHome(){//验证是否登陆
            this.$axios.req('api/home').then(res =>{
              // console.log(res.data);
              if(res.data.code!==200){
                this.$router.push('/login');
              }
              else{
                // this.user = res.data.data;
                // console.log(this.user);
                // this.$store.commit('setUser', res.data.data);
              }
            }).catch(err =>{
              console.log(err);
            });
          },
        },
        mounted() {
          this.getHome();
          this.getCalendar();
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
  .smallText{
    font-size:10px;
  }
  .leftText{
    text-align: left;
  }
  .flex{
    display: flex;
  }
  .dialog-footer{
    width:100%;
    text-align: center;
  }
</style>
