<template>
  <keep-alive>
    <transition :name="transitionName" mode="out-in">
      <router-view class="transition-view" ></router-view>
    </transition>
  </keep-alive>
</template>
<script>
  export default {
    data () {
      return {
        transitionName: 'slide-left'
      };
    },
    watch: {
      '$route' (to, from) {
        if (/\/index/i.test(to.path) || /\/detail/i.test(to.path) && /\/cart/i.test(from.path)) {
          this.transitionName = 'slide-right';
        }
        if (/\/cart/i.test(to.path) || /\/index/i.test(from.path)) {
          this.transitionName = 'slide-left';
        }
      }
    }
  };
</script>
<style>
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(60px, 0);
    transform: translate(60px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-60px, 0);
    transform: translate(-60px, 0);
  }
  .transition-view {
     width: 100%;
     position: absolute;
     transition: all .3s cubic-bezier(.55,0,.1,1);
   }
</style>
