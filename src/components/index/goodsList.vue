<template>
  <div class="goods-box">
    <div class="starBanner">
      <a :href="goodsData.bannerLink"><img :src="goodsData.bannerImg"/></a>
    </div>
    <el-row :gutter="10" class="goodslist" v-loading="loading">
      <el-col :span="12"
              v-for="(goods, index) in goodsData.list"
              class="item"
      >
        <div class="item-content" @click="productEvent(goods)">
          <div class="top">
            <img :src="goods.imgSrc"/>
          </div>
          <div class="bottom">
            <span class="title">{{ goods.title }}</span>
            <span class="price">{{goods.points}} <span>积分 +</span> ￥{{ goods.price }}</span>
            <el-button class="btn" size="small" type="primary">兑换</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  export default{
    created () {
      if (this.$route.params.cateId) {
        this.cateId = this.$route.params.cateId;
      }
      this.fetchData(this.$root.api.goods, this.cateId);
    },
    data () {
      return {
        cateId: '001',
        goodsData: {},
        loading: true
      };
    },
    methods: {
      productEvent (goods) {
        this.$router.push({path: '/detail/' + goods.id});
        this.$root.$emit('currentgoods', goods);
      },
      fetchData (url, id) {
        let vm = this;
        this.$http.get(url, {
          params: {cateId: id}
        })
          .then(response => {
            console.log('list', response.data);
            vm.loading = false;
            vm.$root.$emit('loadingstatus', false);
            vm.goodsData = response.body.data;
          })
          .catch(response => {
            vm.loading = false;
            vm.$root.$emit('loadingstatus', true);
          });
      }
    },
    watch: {
      '$route': function (to) {
        this.cateId = to.params.cateId;
        if (this.cateId) {
          this.loading = true;
          this.fetchData(this.$root.api.goods, this.cateId);
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .goodslist {
    padding:10px;
    .item {
      box-sizing: border-box;
      font-size: 0;
      margin-bottom:10px;
      .top {
        width: 100%;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width:130px;
        }
      }
      .item-content {
        background: white;
        .item-bottom;
      }
    }
  }
  .item-bottom {
    .bottom {
      width: 100%;
      display: block;
      padding: 0 10px;
      box-sizing: border-box;
      font-size: 0.75rem;
      .title {
        width: 100%;
        display: block;
        color: #333;
        line-height: 1.5;
        height:40px;
      }
      .price {
        width: 100%;
        display: block;
        font-size: 14px;
        color: #ff601e;
        line-height: 20px;
        span{
          font-size:10px;
          color:#ccc;
        }
      }
      .btn {
        width:100%;
        letter-spacing: 5px;
        margin: 10px auto;
      }
    }
  }
  .img100 {
    img {
      width: 100%;
    }
  }
  .goods-box {
    overflow: hidden;
    height: 100%;
    width: 100%;
    font-family: "Microsoft Yahei";
    .starBanner {
      padding-top: 10px;
      width: 100%;
      font-size: 0;
      .img100;
    }


  }
</style>
