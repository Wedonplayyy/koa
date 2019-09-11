<template>
    <div class="body">
      <router-view v-if="$route.path ==='/login'"></router-view>
      <el-container v-else class="el-container">
        <el-header class="el-header">hyy后台管理系统
          <el-button @click="logout">退出登录</el-button>
        </el-header>
        <el-container class="el-container">
          <el-aside class="el-aside" width="">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 2px;">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu :default-active="this.$router.path"  class="el-menu-vertical-demo" @select="handleSelect"  @open="handleOpen" router :collapse="isCollapse">
              <el-menu-item index="/home">
                  <i class="el-icon-location"></i>
                  <span slot="title">首页</span>
<!--                <div id="tab" style="z-index:1;position: relative;left:-20px;top:-56px;background-color:#409EFF;width:5px;height:56px;"></div>-->
              </el-menu-item>
              <el-menu-item index="/a"><i class="el-icon-date"></i>
                <span slot="title">日程管理</span>
              </el-menu-item>
              <el-menu-item index="3"><i class="el-icon-document"></i>
                <span slot="title">通讯录</span>
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title"><i class="el-icon-user"></i>
                  <span slot="title">组织员工</span>
                </template>
                <el-menu-item-group>
<!--                  <template slot="title">分组一</template>-->
                  <el-menu-item index="4-1">选项1</el-menu-item>
                  <el-menu-item index="4-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title" index="5">
                  <i class="el-icon-files"></i>
                  <span >表单页</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
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
        activeIndex:'1',//侧边栏默认选中第一项
        isCollapse: true,//默认展开侧边栏
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(index,indexPath){
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
