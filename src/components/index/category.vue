<template>
  <div class="menu-box">
    <el-row class="cate-menu">
      <el-col :span="24/category.length" v-for="item in category">
        <router-link :to="'/index/'+item.cateId"
                     tag="div"
                     class="grid-content"
                     active-class="active"
        >
          <img :src="item.img"/>
          <h3>{{item.title}}</h3>
        </router-link>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  export default{
    data () {
      return {
        category: []
      };
    },
    created () {
      let vm = this;
      this.$http.get(vm.$root.api.category)
        .then(response => {
          console.log('category', response.data);
          vm.category = response.body.data;
        })
        .catch(response => console.log(response));
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
    padding-top: 40px;
    background:white;
    .grid-content{
      text-align: center;
      &.active h3{
        color: #ff8000;
      }
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
