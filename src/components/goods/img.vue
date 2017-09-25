<template>
  <div class="img">
    <div class="control">
      <div class="left hook" @click="goBackEvent"></div>
      <div class="right hook" @click="goodSearchEvent"></div>
    </div>

    <div class="swiper-container" ref="a">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in sliderData"><img :src="item"/></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <!--<el-carousel :interval="5000" arrow="always" class="carousel">-->
      <!--<el-carousel-item v-for="item in bannerList" :key="item">-->
        <!--<img :src="item"/>-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->
  </div>
</template>
<script>
  import Swiper from '../../../lib/swiper.js';
  export default {
    props: ['sliderData'],
    data () {
      return {
        bannerList: []
      };
    },
    components: {},
    methods: {
      goBackEvent () {
        this.$router.push('/');
      },
      goodSearchEvent () {
//        this.$router.push({path: '/index', query: {sign: 1}});
        this.$parent.handleFocus();
      },
      addCartEvent () {
        this.$router.push({path: '/cart'});
      }
    },
    mounted () {
      let vm = this;
      setTimeout(function () {
        Swiper(vm.$refs.a, {
          loop: true,
          autoplay: 3000,
          pagination: '.swiper-pagination',
          autoplayDisableOnInteraction: false
        });
      }, 500);
    }
  };
</script>

<style lang="less" scoped>
  @import "../../../lib/swiper.css";

  .img {
    font-family: "Microsoft YaHei";
    width: 100%;
    .control {
      width: 100%;
      height: 30px;
      position: fixed;
      top: 10px;
      left: 0;
      z-index: 10;
      padding: 0 10px;
      box-sizing: border-box;
      div.hook {
        width: 30px;
        height: 30px;
        display: block;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        color: #fff;
        &.left {
          float: left;
          background: rgba(0, 0, 0, 0.5) url("../../images/svg/back1.svg") no-repeat center center;
          background-size: 15px;
        }
        &.right {
          float: right;
          background: rgba(0, 0, 0, 0.5) url("../../images/svg/search1.svg") no-repeat center center;
          background-size: 15px;
        }
      }
    }
  }

  .carousel img {
    width:100%;
  }

  .swiper-container {
    width: 100%;
    .swiper-slide {
      position: relative;
      height: 0;
      padding-top: 115%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
<style>
  .swiper-pagination-bullet-active {
    background: #ff8b0f;
  }
</style>
