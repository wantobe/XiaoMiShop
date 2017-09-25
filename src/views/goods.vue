<template>
  <div class="wripper">
    <mi-header @searchEvent="searchHandle" :opac="headerOpacity" :screen="focus" v-show="focus" ref="search_bar">
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
    <mi-img :sliderData="sliderData"></mi-img>
    <mi-buyControl :goodsAttr="goodsAttr" ref="control"></mi-buyControl>
    <mi-detail :detailData="detailData"></mi-detail>
  </div>
</template>
<script>
  import header from '../components/header';
  import img from '../components/goods/img';
  import buyControl from '../components/goods/buyControl';
  import detail from '../components/goods/detail';

  export default {
    components: {
      'mi-header': header,
      'mi-img': img,
      'mi-buyControl': buyControl,
      'mi-detail': detail
    },
    created () {
      this.fetchData(this.$root.api.detail, this.$route.params.id);
    },
    mounted () {
    },
    data () {
      return {
        focus: false,
        inputText: '',
        hotWord: ['红米4 超长续航', '小米Note 2', '小米5s', '笔记本', '小米电视3s', '智能电饭煲'],
        headerOpacity: 1,
        sliderData: [],
        detailData: [],
        goodsAttr: {},
        searchState: false,
        popInfo: {}
      };
    },
    methods: {
      toHomeEvent () {
        this.$router.replace({path: '/index'});
      },
      searchHandle (Boolean) {
          this.searchState = Boolean;
      },
      fetchData (url, id) {
        let vm = this;
        this.$http.get(url, {
          params: {id: id}
        })
          .then(response => {
            console.log('detail', response.data);
            vm.goodsAttr = response.data;
            vm.detailData = response.data.detail;
            vm.sliderData = response.data.slider;
          })
          .catch(e => {
            console.log(e);
          });
      },
      handleFocus () {
        this.focus = true;
        this.$emit('searchEvent', true);
      },
      goBackEvent () {
        this.focus = false;
        this.$emit('searchEvent', false);
      },
      inputFillEvent (word) {
        this.inputText = word;
      }
    }

  };
</script>

<style lang="less">
  .wripper {
    font-family: "Microsoft YaHei";
    .addCart {
      width: 100%;
      height: 50px;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      font-size: 0;
      border-top: 1px solid #efefef;
      div {
        text-align: center;
        line-height: 50px;
        display: inline-block;
        font-size: 0;
        overflow: hidden;
        height: 50px;
        &.home {
          width: 15%;
          color: #333;
          background: url("../images/svg/home.svg") no-repeat center center;
          background-size: 25px;
        }
        &.cart {
          width: 15%;
          color: #333;
          background: url("../images/svg/cart.svg") no-repeat center center;
          background-size: 25px;
        }
        &.add {
          width: 70%;
          color: #fff;
          height: 50px;
          span {
            text-align: center;
            line-height: 40px;
            background: #FF5722;
            width: 94%;
            height: 40px;
            display: block;
            margin: 5px auto 0 auto;
            font-size: 16px;
            &:active {
              background: #ec4c1a;
            }
          }
        }
      }
    }
  }
  .alert {
    h5 {
      margin: 5px;
      text-align: center;
      font-weight: normal;
      color: #333;
      font-size: 16px;
    }
    h6 {
      margin: 10px;
      color: #ff8a27;
      font-size: 14px;
      font-weight: normal;
    }
    p {
      line-height: 25px;
      font-size: 14px;
      margin: 5px;
      color: #666;
    }
  }
</style>
