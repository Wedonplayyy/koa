<template>
    <div class="body">
      <div v-if="option1" class="loginForm">
<!--        登录框-->
        <div class="title">欢迎使用后台管理系统</div>
        <el-divider></el-divider>
        <el-form :model="loginValidateForm" ref="loginValidateForm" label-width="80px" class="">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[{ required: true, message: '用户名不能为空'},]">
            <el-input type="text" v-model="loginValidateForm.name" maxlength="16" style="width: 240px" placeholder="请输入用户名，长度不超过16个字符"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[{ required: true, message: '密码不能为空'},]">
            <div style="display: flex;">
              <el-input type="password" v-model="loginValidateForm.password" maxlength="16" style="width: 240px;" placeholder="请输入密码，长度不超过16个字符"></el-input>
              <div style="padding:0 0 0 30px;">
                <el-button type="info" @click="regainPwd" >忘记密码</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="svg"
            :rules="[{ required: true, message: '验证码不能为空'},]">
            <div style="display: flex;">
              <el-input type="text" v-model="loginValidateForm.svg"  maxlength="4" placeholder="请输入验证码" style="width:196px;vertical-align:middle;"></el-input>
              <div v-html="this.verifyPic" style="width:140px;height:40px;vertical-align:middle;padding: 0 8%;"></div>
            </div>
          </el-form-item>
          <div class="buttons">
            <el-button type="success" @click="login">立即登录</el-button>
            <el-button type="primary" @click="toRegister">注册账户</el-button>
          </div>
        </el-form>
      </div>
      <div v-else class="registerForm">
<!--        注册框-->
        <div class="title">欢迎使用后台管理系统</div>
        <el-divider></el-divider>
        <el-form :model="registerValidateForm" ref="registerValidateForm" label-width="80px" class="">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[{ required: true, message: '用户名不能为空'},]">
            <el-input type="text" v-model="registerValidateForm.name" maxlength="16" class="el-input" placeholder="请输入用户名，长度不超过16个字符"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[{ required: true, message: '密码不能为空'},]">
            <div style="display: flex;">
              <el-input type="password" v-model="registerValidateForm.password" maxlength="16" class="el-input" placeholder="请输入密码，长度不超过16个字符"></el-input>
              <div style="padding:0 0 0 30px;">
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="电话"
            prop="tel"
            :rules="[{ required: true, message: '密码不能为空'},]">
            <div style="display: flex;">
              <el-input type="tel" v-model="registerValidateForm.tel" maxlength="16" class="el-input" placeholder="请输入电话号码"></el-input>
              <div style="padding:0 0 0 30px;">
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            :rules="[{ required: true, message: '密码不能为空'},]">
            <div style="display: flex;">
              <el-input type="email"  pattern=".+@globex.com" v-model="registerValidateForm.email" maxlength="16" class="el-input" placeholder="请输入邮箱"></el-input>
              <div style="padding:0 0 0 30px;">
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="svg"
            :rules="[{ required: true, message: '验证码不能为空'},]">
            <div style="display: flex;">
              <el-input type="text" v-model="registerValidateForm.sms"  maxlength="4" placeholder="请输入验证码" class="el-input"></el-input>
              <div style="padding:0 0 0 10px;"></div>
              <el-button type="info" @click="sendSms">发送验证码</el-button>
            </div>
          </el-form-item>
          <div class="buttons">
            <el-button type="success" @click="register">立即注册</el-button>
            <el-button type="primary" @click="toLogin">返回登录</el-button>
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
        verifyPic:"",//图形验证码
        option1:true,//登录or注册页面显示

        loginValidateForm: {//登录页面
          name: '',//用户名
          password:'',//密码
          svg:'',//验证码
        },
        registerValidateForm:{//注册页面
          name:'',//用户名
          password:'',//密码
          tel:'',//电话
          email:'',//邮箱
          sms:'',//手机验证码
        }
      }
    },
    methods: {
      regainPwd(){//忘记密码

      },
      sendSms(){//发送手机验证码
        this.$axios.req('api/users/sendMsg',{phone:this.registerValidateForm.tel})
          .then(res =>{
            console.log(res.data);
          }).catch(err =>{
          console.log(err);
        })
      },
      getSvg(){//生成验证码
        this.$axios.req('api/users/captcha')
          .then(res =>{
            if (res) {
              this.verifyPic = res.data;
              console.log(res.data);
            }
          })
          .catch(err =>{
            console.log(err);
          });
      },
      toLogin(){//前往登录界面
        this.option1=true;
        this.getSvg();
      },
      login(){//登录
        this.$axios.req('api/users/login',{
          username:this.loginValidateForm.name,
          password:this.loginValidateForm.password,
          code:this.loginValidateForm.svg
        })
          .then(res =>{
            console.log(res.data);
            if(res.data.data){
              this.$router.push({
                path:'/home'
              })
            }else{
              this.getSvg();
            }

          }).catch(err =>{
          console.log(err);
        })
      },
      toRegister(){//前往注册页面
        this.option1 =false;
      },
      register(){//注册
        this.$axios.req('api/users/register',{
          username:this.numberValidateForm.name,
          password:this.numberValidateForm.password,
          sms:this.numberValidateForm.svg
        }).then(res =>{
          console.log(res.data);
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
    background-color: white;
    padding:2%;
    border-radius: 5px;
  }
  .registerForm{
    width:30%;
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
  .el-input{
    width:278px;
  }

</style>
