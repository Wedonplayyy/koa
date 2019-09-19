<template>
  <div style="width: 1500px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/address' }">通讯录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flexDiv" style="width:98%;padding:1%;">
      <div class="left">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="main">
        <div class="grid-item" v-for="item in this.list">
          <div style="display: flex;width:90%;height:40%;margin:5%;align-items: center">
            <div style="width:30%;height: 100%;display: flex;align-items: center;justify-content: center">
              <div style="width:75px;height:75px;border-radius: 75px;" :style="{'background-color':item.color}">
              </div>
            </div>
            <div style="margin:5%;">
              <div style="display: flex;padding:0 2px;">{{item.name}}</div>
              <div style="display: flex;padding:0 2px;">{{item.company}}/{{item.position}}</div>
              <div style="display: flex">
                <div v-for="(tag,index) in item.tags" :key="index">
                  <div style="padding:0 2px;">
                    {{tag}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Address",
        components: {},
        props: {},
        data() {
            return {
              list:[],//通讯录数据
              data: [{
                label: '一级 1',
                children: [{
                  label: '二级 1-1',
                  children: [{
                    label: '三级 1-1-1'
                  }]
                }]
              }, {
                label: '一级 2',
                children: [{
                  label: '二级 2-1',
                  children: [{
                    label: '三级 2-1-1'
                  }]
                }, {
                  label: '二级 2-2',
                  children: [{
                    label: '三级 2-2-1'
                  }]
                }]
              }, {
                label: '一级 3',
                children: [{
                  label: '二级 3-1',
                  children: [{
                    label: '三级 3-1-1'
                  }]
                }, {
                  label: '二级 3-2',
                  children: [{
                    label: '三级 3-2-1'
                  }]
                }]
              }],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
            }
        },
        methods: {
          handleNodeClick(data) {
            console.log(data);
          },
          getAddressData(){// 获取通讯录数据
            this.$axios.req('api/getAddressData').then(res =>{
              // console.log(res.data);
              this.list=res.data.data;
              console.log(this.list);
            }).catch(err =>{
              console.log(err);
            })
          }
        },
        mounted() {
          this.getAddressData();
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
  .flexDiv{
    display: flex;
    justify-content: space-between;
  }
  .title{
    /*标题*/
    /*width:100%;*/
    padding:15px;
    display: flex;
    align-items: center;
  }
  .left{
    width:15%;
    height:500px;
    background-color: white;
  }
  .main{
    width:78%;
    /*padding:2%;*/
    height: 1200px;
    /*background-color: white;*/
    display: grid;
    grid-gap:10px;

    grid-template-columns:repeat(3,30%);
  }
  .grid-item{
    background-color: white;
  }
</style>
