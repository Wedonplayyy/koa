<template>
    <div class="body">
      <router-view v-if="$route.path ==='/login'"></router-view>
      <el-container v-else class="el-container">
        <el-header class="el-header">
          <div style="display: flex;justify-content: space-between;height: 100%;">
            <div>hyy后台管理系统</div>
            <div style="display: flex;justify-content: space-between;height: 100%;">
              <div style="display: flex;align-items: center;height: 100%;">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div style="height: 100%;padding: 0 5%;">{{this.user.username}}</div>
              <div>
                <el-button @click="logout">退出登录</el-button>
              </div>
            </div>
          </div>
        </el-header>
        <el-container class="el-container">
          <el-aside class="el-aside " width="" >
            <el-menu :default-active="activeIndex"  class="el-menu-vertical-demo" @select="handleSelect"  @open="handleOpen" router :collapse="isCollapse">
              <el-menu-item @click="isCollapse=!isCollapse">
                  <i :class="{'el-icon-d-arrow-right':isCollapse==true,'el-icon-d-arrow-left':isCollapse==false}" ></i>
              </el-menu-item>
              <el-menu-item index="/home" :class="{'solidLeftBorder':this.$route.path==='/home'||this.$route.path==='/'}">
                  <i class="el-icon-location"></i>
                  <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="/calendar" :class="{'solidLeftBorder':this.$route.path==='/calendar'}">
                <i class="el-icon-date"></i>
                <span slot="title">日程管理</span>
              </el-menu-item>
              <el-menu-item index="/address" :class="{'solidLeftBorder':this.$route.path==='/address'}">
                <i class="el-icon-document"></i>
                <span slot="title">通讯录</span>
              </el-menu-item>
              <el-submenu index="1" >
                <template slot="title"  >
                  <div :class="{'solidLeftBorder':(this.$route.path==='/administration/offer')||(this.$route.path==='/administration/person')||(this.$route.path==='/administration/salary')}">
                    <i class="el-icon-user" ></i>
                    <span slot="title">组织员工</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/administration/offer">offer管理</el-menu-item>
                  <el-menu-item index="/administration/person">人员信息</el-menu-item>
                  <el-menu-item index="/administration/salary">薪酬管理</el-menu-item>
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
        activeIndex:"/home",//侧边栏默认选中首页
        isCollapse: true,//默认收起侧边栏
        user:{},//用户
      };
    },
    methods: {
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
      handleSelect(key, keyPath) {
        console.log(this.activeIndex);
        console.log(key, keyPath);
      },
      handleOpen(index,indexPath){
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
      this.getHome();
      this.activeIndex = this.$route.path;
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
    /*border-left-style: solid;*/
    /*border-left-color: #409EFF;*/
    /*border-left-width: 5px;*/
    /*border-left-height:56px;*/
  }
  .solidLeftBorder:before{
    display:block;
    content:""; position:absolute; left:0; top:-2px; width:5px; height:56px; background-color:#409EFF;
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
