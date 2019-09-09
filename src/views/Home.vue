<template>
    <div>
        Home
    </div>
</template>


<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    getHome(){
      this.$axios.req('api/home').then(res =>{
        if(res.data.code===200){
          console.log(res.data);
        }else{
          this.$router.push('/login')
        }
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  mounted() {
    this.getHome();
  },
  created() {

  },
  filters: {},
  computed: {},
  watch: {},
  directives: {},
};
</script>

<style scoped lang="scss">

</style>
