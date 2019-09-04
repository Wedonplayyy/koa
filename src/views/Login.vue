<template>
    <div class="body">
      <div class="loginFrame">
        <div class="title">欢迎使用后台管理系统</div>
        <el-divider></el-divider>
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="80px" class="demo-ruleForm">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[{ required: true, message: '用户名不能为空'},]">
            <el-input type="string" v-model.number="numberValidateForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[{ required: true, message: '密码不能为空'},]">
            <el-input type="string" v-model.number="numberValidateForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="svg"
            :rules="[{ required: true, message: '验证码不能为空'},]">
            <el-input type="string" v-model.number="numberValidateForm.svg" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="buttons">
              <el-button type="primary" @click="submitForm('numberValidateForm')">立即登录</el-button>
              <el-button type="primary" @click="submitForm('numberValidateForm')">立即注册</el-button>
            </div>
            <div v-html="this.verifyPic"></div>

          </el-form-item>
        </el-form>
      </div>

    </div>

</template>

<script>
  import axios from 'axios'
  import 'element-ui/lib/theme-chalk/index.css';
  export default {
    name: 'Login',
    components: {},
    props: {},
    data() {
      return {
        numberValidateForm: {
          name: '',
          password:'',
          svg:'',
        },
        verifyPic:'',
      };
    },
    methods: {
      getSvg(){
        console.log('begin');
        this.$axios.req('/api/users/allUser')
          .then(function (res) {
            if (res) {
              this.verifyPic = res.data;
              console.log(res.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
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
  .loginFrame{
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
