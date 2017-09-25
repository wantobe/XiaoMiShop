<template>
  <div>
    <div :class="{screen: screen}">
      <div class="top">
        <div class="bg" :style="{opacity: opac}"></div>
        <div class="main-head">
          <slot name="header_left"></slot>
          <slot name="header_center"></slot>
          <slot name="header_right"></slot>
        </div>
      </div>
      <slot name="header_main"></slot>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['opac', 'screen'],
    data () {
      return {
        bgOpacSty: {
          opacity: 0
        }
      };
    },
    created () {
    },
    methods: {
    }
  };
</script>

<style lang="less" scoped>
  .screen {
    width: 100%;
    height: 100%;
    background: #eee;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 999;
  }

  .absolute100 {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .main {
    width: 100%;
    margin: 40px 0 0 0;
    .title {
      line-height: 40px;
      font-size: 12px;
      color: #333;
      text-indent: 20px;
    }
    img {
      width: 100%;
    }
    ul {
      padding: 0 10px;
      li {
        list-style-type: none;
        font-size: 12px;
        padding: 8px 10px;
        margin: 5px;
        display: inline-block;
        background: #F8F2EC;
        border: 1px solid #FAC288;
      }
    }
  }

  .top {
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 34px;
    font-size: 0;
    position: fixed;
    color: #fff;
    z-index: 999;
    .main-head {
      .absolute100;
    }
    .bg {
      .absolute100;
      background: #7BC610;
    }
    &.focus {
      background: #f5f5f5;
      color: #888;
    }
    .left {
      width: 15%;
      line-height: 34px;
      font-size: 16px;
      text-align: center;
      display: inline-block;
      color: #ddd;
      &.logo {
        width: 15%;
        height: 34px;
        /*background: url("../../images/svg/mi.svg") no-repeat center center;*/
        /*background-size: 30px;*/
      }
      &.back {
        width: 15%;
        height: 34px;
        font-size: 20px;
        color: #999
      }
    }
    .headIcon {
      height: 30px;
      width: 30px;
    }
    .center {
      width: 70%;
      font-size: 16px;
      display: inline-block;
      vertical-align: top;
      p {
        margin: 5px 0;
        text-align: center;
      }
      input {
        width: 100%;
        line-height: 24px;
        height: 24px;
        background: #fff;
        border: none;
        padding: 0;
        margin: 5px 0 0 0;
        outline: none;
        text-indent: 10px;
        &.border {
          box-sizing: border-box;
          border: 1px solid #dedede;
        }
      }
    }
    .right {
      width: 15%;
      font-size: 20px;
      display: inline-block;
      line-height: 38px;
      text-align: center;
      margin: -1px 0 0 0;
      vertical-align: top;
      padding: 0;
      color: #ddd;
      p {
        font-size: 14px;
        margin: 5px 0;
        line-height: 26px;
        color: #eee;
        text-align: center;
      }
    }
  }
</style>
