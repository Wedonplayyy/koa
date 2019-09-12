<template>
    <div class="body">
      <router-view v-if="$route.path ==='/login'"></router-view>
      <el-container v-else class="el-container">
        <el-header class="el-header">
          <div style="display: flex;justify-content: space-between">
            <div>hyy后台管理系统</div>
            <div>
              <div>
<!--                欢迎你，{{user.username}}-->
              </div>
              <el-button @click="logout">退出登录</el-button>
            </div>
          </div>
        </el-header>
        <el-container class="el-container">
          <el-aside class="el-aside " width="" >
            <el-menu :default-active="activeIndex"  class="el-menu-vertical-demo" @select="handleSelect"  @open="handleOpen" router :collapse="isCollapse">
              <el-menu-item @click="isCollapse=!isCollapse">
                  <i :class="{'el-icon-d-arrow-right':isCollapse==true,'el-icon-d-arrow-left':isCollapse==false}" ></i>
              </el-menu-item>
              <el-menu-item index="1" route="/home" :class="{'solidLeftBorder':this.$route.path==='/home'}">
                  <i class="el-icon-location"></i>
                  <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="2" route="/calendar" :class="{'solidLeftBorder':this.$route.path==='/calendar'}">
                <i class="el-icon-date"></i>
                <span slot="title">日程管理</span>
              </el-menu-item>
              <el-menu-item index="3" route="/address" :class="{'solidLeftBorder':this.$route.path==='/address'}">
                <i class="el-icon-document"></i>
                <span slot="title">通讯录</span>
              </el-menu-item>
              <el-submenu index="4" route="/home" :class="{'solidLeftBorder':this.activeIndex==='4'}">
                <template slot="title" >
                  <i class="el-icon-user"></i>
                  <span slot="title">组织员工</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1" route="/home" :class="{'solidLeftBorder':this.activeIndex==='4-1'}">offer管理</el-menu-item>
                  <el-menu-item index="4-2" route="/home" :class="{'solidLeftBorder':this.activeIndex==='4-2'}">人员信息</el-menu-item>
                  <el-menu-item index="4-3" route="/home" :class="{'solidLeftBorder':this.activeIndex==='4-3'}">薪酬管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title" index="5">
                  <i class="el-icon-files"></i>
                  <span >表单页</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">选项1</el-menu-item>
                  <el-menu-item index="5-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
<!--        <el-footer></el-footer>-->
      </el-container>

    </div>

</template>

<script>
  export default {
    name: 'Content',
    components: {},
    props: {},
    data() {
      return {
        activeIndex:"1",//侧边栏默认选中首页
        isCollapse: true,//默认收起侧边栏
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex=key;
        console.log(this.activeIndex);
        console.log(key, keyPath);
      },
      handleOpen(index,indexPath){
        this.activeIndex=index;
        console.log(this.activeIndex);
        console.log(index, indexPath);
      },
      logout(){//退出登录
        this.$axios.req('api/users/logout').then(res =>{
          console.log(res);
          this.getHome();
        }).catch(err =>{
          console.log(err);
        })
      },
    },
    mounted() {
      console.log(this.activeIndex);
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
  .el-header {
    background-color: #B3C0D1;
    /*text-align: center;*/
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    /*text-align: center;*/
    /*line-height: 30px;*/
  }
  .solidLeftBorder {
    /*侧边栏选中改变边框*/
    border-left-style: solid;
    border-left-color: #409EFF;
    border-left-width: 5px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-main {
    background-color: #E9EEF3;
    text-align: center;
    /*line-height: 160px;*/
  }
</style>
