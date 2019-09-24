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
        <el-tree default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="main">
        <div class="grid-item" v-for="item in this.list">
          <div style="display: flex;width:90%;height:40%;margin:5%;align-items: center">
            <div style="width:30%;height: 100%;display: flex;align-items: center;justify-content: center">
              <div style="width:75px;height:75px;border-radius: 75px;" :style="{'background-color':item.color}">
                <div style="color: white;width: 100%;height:100%;display: flex;justify-content: center;align-items: center;">{{item.name}}</div>
              </div>
            </div>
            <div style="margin:5%;">
              <div style="display: flex;padding:0 2px;">{{item.name}}</div>
              <div style="display: flex;padding:0 2px;">{{item.company}}/{{item.position}}</div>
              <div style="display: flex" v-if="item.tags.length!==0">
                <el-tag
                  v-for="tag in item.tags"
                  :key="tag">
                  {{tag}}
                </el-tag>
              </div>
              <div v-else style="color: gray;font-size: 15px;padding:11px 0">快来给他/她添加标签吧~</div>
            </div>
          </div>
          <div style="width: 70%;height:40%;margin: 5% 15%;text-align: left;font-size: 13px;">
            <div>邮箱：{{item.email}}</div>
            <div>电话：{{item.tel}}</div>
            <div>手机：{{item.phone}}</div>
            <div>性别：{{item.sex}}</div>
            <div>QQ：{{item.QQ}}</div>
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
                label: '区域中心',
                children: [{
                  label: '哈尔滨公司'
                },{
                  label: '微易旅游',
                  children: [{
                    label: '微易'
                  }]},
                  {
                    label:'测试部门'
                  },
                  {
                      label:'北方区域中心',
                      children:[{
                        label:'东南亚事业部'
                      },{
                        label:'B2B事业部',
                        children:[{
                          label:'产品组'
                        },{
                          label:'途牛组'
                        },{
                          label:'携程组'
                        },{
                          label:'其他电商组'
                        },{
                          label:'资料组'
                        },{
                          label:'运营支持组'
                        }]
                      },{
                        label:'华北销售区',
                        children:[{
                          label:'京津组'
                        },{
                          label:'济南公司'
                        },{
                          label:'石家庄公司'
                        },{
                          label:'河北组'
                        }]
                      },{
                        label:'中原销售区',
                        children:[{
                          label:'太原公司'
                        },{
                          label:'内蒙古组'
                        },{
                          label:'郑州公司'
                        }]
                      },{
                        label:'单团部',
                      },{
                        label:'新销售业务部'
                      },{
                        label:'产品操作部',
                        children:[{
                          label:'欧洲组'
                        },{
                          label:'中东非组'
                        },{
                          label:'票务组'
                        },{
                          label:'单团组'
                        }]
                      },{
                        label:'签证部',
                        children:[{
                          label:'外联部'
                        }]
                      }]
                    },
                  {
                      label:'西南区域中心',
                      children:[{
                        label:'西南总经理办公室'
                      },{
                        label:'成都公司',
                        children:[]
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
