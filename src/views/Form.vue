<template>
  <div style="width: 1500px;">
    <div class="title">
      <el-avatar shape="square" size="small" icon="el-icon-s-unfold"></el-avatar>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>表单页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/form' }">分部表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:98%;padding:1%;">
    </div>
  </div>

</template>

<script>
    export default {
        name: "Form",
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {},
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
</style>
