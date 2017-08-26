<template>
  <div class="menu-box">
    <el-row class="cate-menu">
      <el-col :span="24/menu.length" v-for="item in menu">
        <router-link :to="'/index/'+item.cateId"
                     tag="div"
                     class="grid-content">
          <img :src="item.img"/>
          <h3>{{item.title}}</h3>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    props: ['menu'],
    data () {
      return {};
    },
    methods: {
      cateClk (x) {
        this.$router.push({path: '/index', query: {cateId: x}});
      }
    }
  };
</script>

<style lang="less" scoped>
  .cate-menu{
    background:white;
    .grid-content{
      text-align: center;
      h3{
        font-size:0.75rem;
        font-weight:normal;
        padding:0;
        margin-top:10px;
      }
      img{
        max-width:45px;
        margin-top:10px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
      }
    }
  }


</style>
