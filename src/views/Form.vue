<template>
  <div style="width: 1500px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>表单页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/form' }">分步表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:96%;padding:2%;">
      <div style="width:98%;padding:1%;background-color: white;">
        <div style="font-size: 18px;text-align: left">请填写您的转账信息</div>
        <div style="color: grey;text-align: left;">请务必是你本人操作，确认转账金额以及收款人信息</div>
      </div>
      <div style="width: 100%;background-color: white;margin:2% 0;padding:2% 0;">
        <div>
          <el-steps :active="active" align-center finish-status="success">
            <el-step title="填写转账信息+"></el-step>
            <el-step title="确认转账信息"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
        <div style="width: 100%;display: flex;justify-content: center">
          <div v-if="active===0" style="width: 30%;padding:2%;">
            <el-form :model="Form" ref="Form" label-width="100px" class="Form">
              <el-form-item
                label="付款账户"
                prop="pay"
                :rules="[{ required: true, message: '不能为空'}]">
                <el-input type="text" v-model="Form.pay" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="收款账户"
                prop="accept"
                :rules="[{ required: true, message: '不能为空'}]">
                <el-input type="text" v-model="Form.accept" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="付款人姓名"
                prop="name"
                :rules="[{ required: true, message: '不能为空'}]">
                <el-input type="text" v-model="Form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="收款金额"
                prop="money"
                :rules="[{ required: true, message: '不能为空'}, { type: 'number', message: '金额必须为数字值'}]">
              <el-input type="money" v-model.number="Form.money" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="onSubmit('Form')">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="active===1" style="width: 30%;padding:2%;">
            <div></div>
            <div class="item">付款账户:{{Form.pay}}</div>
            <div class="item">收款账户:{{Form.accept}}</div>
            <div class="item">收款人姓名:{{Form.name}}</div>
            <div class="item" style="display: flex">
              收款金额:
              <div style="font-size: 24px;height:100%">
                {{Form.money}}
              </div>
              元
            </div>
            <el-divider></el-divider>
            <el-form :model="pwdForm" ref="pwdForm" label-width="100px" class="demo-ruleForm">
              <el-form-item
                label="支付密码"
                prop="pwd"
                :rules="[{ required: true, message: '密码不能为空'}]">
                <el-input type="password" v-model="pwdForm.pwd" autocomplete="off" width="100px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('pwdForm')">提交</el-button>
                <el-button @click="back">上一步</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="active===2" style="width: 30%;padding:2%;">
            <div style="width: 100%;height:50px;">
              <i class="el-icon-circle-check" style="width: 30px;height:30px"></i>
            </div>
            <div></div>
            <div class="item">付款账户:{{Form.pay}}</div>
            <div class="item">收款账户:{{Form.accept}}</div>
            <div class="item">收款人姓名:{{Form.name}}</div>
            <div class="item" style="display: flex">
              收款金额:
              <div style="font-size: 24px;height:100%">
                {{Form.money}}
              </div>
              元
            </div>
            <div style="padding:5px;">
              <el-button type="primary" @click="repay">再转一笔</el-button>
              <el-button @click="check">查看账单</el-button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Form",
        components: {},
        props: {},
        data() {
            return {
              active:0,
              Form:{
                accept:'',
                pay:'',
                name:'',
                money:'',
              },
              pwdForm:{
                pwd:''
              }
            }
        },
        methods: {
          onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.active++;
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          back(){
            this.active--;
          },
          repay(){
            this.active = 0;
            this.$refs['Form'].resetFields();
            this.$refs['pwdForm'].resetFields();
          },
          check(){}
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
    /*width:100%;*/
    padding:15px;
    display: flex;
    align-items: center;
  }
  .item{
    display: flex;
    align-items: center;
    text-align: left;
    height:30px;
    padding:2px;
  }
</style>
