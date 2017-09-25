<template>
  <div class="banner-box">
    <div class="starBanner">
      <a :href="banner.link"><img :src="banner.img"/></a>
    </div>
  </div>

</template>
<script>
  export default{
    data () {
      return {
        banner: {}
      };
    },
    mounted () {
      let vm = this;
      this.$http.get(vm.$root.api.banner)
        .then(response => {
          vm.banner = response.body;
          console.log('banner:', response.body);
        })
        .catch(response => console.log(response));
    }
  };
</script>

<style lang="less" scoped>
  .banner-box {
    width: 100%;
    font-size: 0;
    .starBanner {
      width: 100%;
      font-size: 0;
      background:#efefef;
      img {
        padding-top: 10px;
        width: 100%;
      }
    }
  }

</style>
