<template>
  <div class="app">
    <div ref="index" v-show="!loading">
      <!--:style="indexStyle"-->
      <!--<mi-load :load="load"></mi-load>-->
      <!--<mi-header @searchEvent="searchHandle" :opac="headerOpacity"></mi-header>-->
        <mi-menu></mi-menu>
        <mi-body :body="body"></mi-body>
    </div>
  </div>
</template>

<script>
  import util from '../../lib/util';
//  import load from '../components/loading';
//  import header from '../components/index/header';
  import category from '../components/index/category';
  import body from '../components/index/body';
  import data from '../../data';
  export default {
    components: {
//      'mi-header': header,
      'mi-menu': category,
      'mi-body': body
//      'mi-load': load
    },
    created () {
      this.body = data;
      this.$root.$on('loadingstatus', this.setLoading);
    },
    mounted () {
      var me = this;
//      console.log(util.screenSize());
      this.c_height = 0.711 * util.screenSize().width;
      var height = util.screenSize().width * 256 / 360;
      this.$refs.index.onscroll = function () {
        me.headerOpacity = this.scrollTop / height;
      };
    },
    data () {
      return {
        loading: true,
        loadingUI: this.$loading({
          fullscreen: true,
          lock: true,
          text: '数据载入中...'
        }),
        body: {},
        scrollX: 0,
        scrollY: 0,
        searchState: false,
        headOpac: '',
        load: false,
        c_height: 0,
//        indexStyle: {
//          height: util.screenSize().height + 'px',
//          'overflow-y': 'scroll',
//          width: '100%'
//        },
        headerOpacity: 0
      };
    },
    methods: {
      searchHandle (Boolean) {
          this.searchState = !!Boolean;
      },
      setLoading (b) {
        this.loading = b;
        if (!b) {
          this.loadingUI.close();
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .app {
    width: 100%;
    height: 100%;
  }

  .banner-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
</style>
