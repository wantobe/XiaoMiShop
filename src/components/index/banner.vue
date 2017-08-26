<template>
  <div class="banner-box">
    <div class="bottom">
      <a :href="banner.goodslist.link"><img :src="banner.goodslist.img"/></a>
    </div>
  </div>

</template>
<script>
  export default{
    props: ['banner'],
    data () {
      return {};
    }
  };
</script>

<style lang="less" scoped>
  .banner-box {
    width: 100%;
    font-size: 0;
    .banner-img {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .bottom {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }

</style>
