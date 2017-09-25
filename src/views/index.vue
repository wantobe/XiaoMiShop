<template>
  <div class="app">
    <div ref="index" v-show="!loading">
      <!--:style="indexStyle"-->
      <!--<mi-load :load="load"></mi-load>-->
        <mi-header @searchEvent="searchHandle" :opac="headerOpacity" :screen="focus">
          <div slot="header_left" class="left">
            <i class="el-icon-arrow-left" v-show="focus" @click="goBackEvent"></i>
          </div>
          <div slot="header_center" class="center">
            <input type="text" class="border" @focus="handleFocus" v-model="inputText"/>
          </div>
          <div slot="header_right" class="right">
            <i class="el-icon-search"></i>
          </div>
          <div slot="header_main" class="main" v-show="focus">
            <div class="title">热门搜索</div>
            <!--<img :src="searchImg">-->
            <ul>
              <li v-for="item in hotWord" @click="inputFillEvent(item)">{{ item }}</li>
            </ul>
          </div>
        </mi-header>
        <mi-menu></mi-menu>
        <mi-banner></mi-banner>
        <mi-body :body="body"></mi-body>
    </div>
  </div>
</template>

<script>
  import util from '../../lib/util';
//  import load from '../components/loading';
  import header from '../components/header';
  import banner from '../components/index/banner';
  import category from '../components/index/category';
  import body from '../components/index/body';
  import data from '../../data';
  export default {
    components: {
      'mi-header': header,
      'mi-menu': category,
      'mi-body': body,
      'mi-banner': banner
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
      document.body.onscroll = function () {
        let opa = document.body.scrollTop / height;
        me.headerOpacity = opa > 1 ? 1 : opa;
//        console.log(me.headerOpacity);
      };
    },
    data () {
      return {
        focus: false,
        inputText: '',
        hotWord: ['红米4 超长续航', '小米Note 2', '小米5s', '笔记本', '小米电视3s', '智能电饭煲'],
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
      },
      handleFocus () {
        this.focus = true;
        this.$emit('searchEvent', true);
        this.headerOpacity = 1;
        document.body.style.overflowY = 'hidden';
      },
      goBackEvent () {
        this.focus = false;
        this.$emit('searchEvent', false);
        document.body.style.overflowY = 'auto';
      },
      inputFillEvent (word) {
        this.inputText = word;
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
