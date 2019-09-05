<template>
    <div class="body">
      <div class="loginForm">
        <div class="title">欢迎使用后台管理系统</div>
        <el-divider></el-divider>
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="80px" class="demo-ruleForm">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[{ required: true, message: '用户名不能为空'},]">
            <el-input type="string" v-model.number="numberValidateForm.name" maxlength="16" style="" placeholder="请输入用户名，长度不超过16个字符"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[{ required: true, message: '密码不能为空'},]">
            <el-input type="password" v-model.number="numberValidateForm.password" maxlength="16" style="" placeholder="请输入密码，长度不超过16个字符"></el-input>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="svg"
            :rules="[{ required: true, message: '验证码不能为空'},]">
            <div style="display: flex;">
              <el-input type="string" v-model.number="numberValidateForm.svg"  maxlength="4" placeholder="请输入验证码" style="width:196px;vertical-align:middle;"></el-input>
              <div v-html="this.verifyPic" style="width:140px;height:40px;vertical-align:middle;padding: 0 8%;"></div>
            </div>
          </el-form-item>
          <div class="buttons">
            <el-button type="primary" @click="login">立即登录</el-button>
            <el-button type="primary">立即注册</el-button>
          </div>
        </el-form>
      </div>

    </div>

</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';
  export default {
    name: 'Login',
    components: {},
    props: {},
    data() {
      return {
        verifyPic:"",

        numberValidateForm: {
          name: '',//用户名
          password:'',//密码
          svg:'',//验证码
        },
      }
    },
    methods: {
      getSvg(){//生成验证码
        this.$axios.req('api/users/getSvg')
          .then(res =>{
            if (res) {
              this.verifyPic = res.data.data;
              console.log(res.data);
            }
          })
          .catch(err =>{
            console.log(err);
          });
      },
      login(){//登录
        this.$axios.req('api/users/login',{
          username:this.numberValidateForm.name,
          password:this.numberValidateForm.password
        })
          .then(res =>{
            console.log(res.data);
            this.$router.push({
              path:'/home'
            })
          }).catch(err =>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.getSvg();
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  };
</script>

<style scoped>
  .body{
    width:100%;
    height:100%;
    position: fixed;
    background: url('../assets/bg.jpg') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginForm{
    width:30%;
    /*height:40%;*/
    background-color: white;
    padding:2%;
    border-radius: 5px;
  }
  .title{
    text-align: center;
    padding:5px;
  }
  .buttons{
    display: flex;
    justify-content: space-around;
  }

</style>
