<template>
    <div class="body">
      <router-view v-if="$route.path ==='/login'"></router-view>
      <el-container v-else class="el-container">
        <el-header class="el-header">hyy后台管理系统</el-header>
        <el-container class="el-container">
          <el-aside class="el-aside" width="240px">
            <el-menu :default-active="this.$router.path" @select="handleSelect"  @open="handleOpen" router>
              <el-menu-item index="/home"><i class="el-icon-message"></i>首页
                <div id="tab" style="z-index:1;position: relative;left:-20px;top:-56px;background-color:#409EFF;width:5px;height:56px;"></div>
              </el-menu-item>
              <el-menu-item index="/a"><i class="el-icon-message"></i>日程管理
              </el-menu-item>
              <el-menu-item index="3"><i class="el-icon-message"></i>通讯录
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title"><i class="el-icon-message"></i>组织员工
                </template>
                <el-menu-item-group>
<!--                  <template slot="title">分组一</template>-->
                  <el-menu-item index="4-1">选项1</el-menu-item>
                  <el-menu-item index="4-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title" index="5"><i class="el-icon-message"></i>表单页
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
        activeIndex:'1',
        tabPos:0,
      };
    },
    methods: {
      //获取元素的纵坐标
      getElemPos(obj){
        let pos = {"top":0, "left":0};
        if (obj.offsetParent){
          while (obj.offsetParent){
            pos.top += obj.offsetTop;
            pos.left += obj.offsetLeft;
            obj = obj.offsetParent;
          }
        }else if(obj.x){
          pos.left += obj.x;
        }else if(obj.x){
          pos.top += obj.y;
        }
        return {x:pos.left, y:pos.top};
        },
      moveTab(){
        let e = document.activeElement;
        let y;
        console.log(this.getElemPos(e));
        y=this.getElemPos(e).y;
        let tab = document.getElementById('tab');
        tab.style.top =y-124+"px";
        console.log(document.getElementById('tab'));
        console.log(y);
      },
      handleSelect(key, keyPath) {
        this.moveTab();
        console.log(key, keyPath);
      },
      handleOpen(index,indexPath){
        console.log(index, indexPath);
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

  .el-main {
    background-color: #E9EEF3;
    text-align: center;
    /*line-height: 160px;*/
  }
</style>
