<template>
  <div class="food">
    <x-header class="top" :class="theme_color" :left-options="{backText:''}">
      <div class="overwrite-title-demo" slot="default">今日食谱</div>
      <div class="icon"  slot="right">
        <img src="/static/images/food_course/topbar_food@3x.png" alt="">
      </div>
    </x-header>
    <x-header v-if="!graph" class="bottom"  :class="theme_color"
              :left-options="{showBack:false}">
      <div class="overwrite-title-demo" slot="default">{{foodList.date}}</div>
      <div class="icon" slot="right"
           @click.native="showImage()"
      >
        <img :src="'/static/images/food_course/date_calendar' + (this.theme_color === 'orange' ? '_orange' : '') + '@3x.png'" alt="">
      </div>
    </x-header>

    <!--文字模式-->
    <div v-if="!graph" class="menu_text">
      <div class="line"></div>
      <el-row class="content">

        <el-col :span="22" :offset="1">
          <el-row class="item" v-for="(item, key) in foodList.data">
            <el-col :span="4" class="icon">
              <img :src="'../../static/images/food_course/' + key + 'icon@3x.png'" alt="">
              <p :class="theme_color">{{key=='lunch'?'午餐':'晚餐'}}</p>
            </el-col>
            <el-col :span="20" class="list">
              <p v-for="index in item.length/2">
                <span>{{item[index].c_name}}：{{item[index].name}}</span>
                <span>{{item[index + 1].c_name}}：{{item[index + 1].name}}</span>
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>


    <!--图片模式-->
    <div v-if="graph" class="menu_image_text">
      <div class="item" v-for="(item, key) in foodList.data">
        <el-row class="cate_bar">
          <el-col :span="22" :offset="1">
            <img class="cate_left" :src="'/static/images/food_course/' + key + 'icon@3x.png'" alt="">
            <div class="cate_right">
              <p class="en" :class="theme_color">{{key|firstUpperCase}}</p>
              <p :class="theme_color">{{cateName(key)}}</p>
            </div>
          </el-col>
        </el-row>
        <scroller lock-y :scrollbar-x=false>
          <div class="box1">
            <div class="box1-item" v-for="i in item">
              <img :src=i.image alt="">
              <span class="tag" :class="theme_color">{{i.c_name}}</span>
              <span>{{i.name}}</span>
            </div>
          </div>
        </scroller>
      </div>
    </div>



  </div>
</template>

<script>
  import header from '../components/header';
  import { XHeader, Scroller, Actionsheet, TransferDom } from 'vux';
  export default {
    name: 'food',
    directives: {
      TransferDom
    },
    components: {
      Scroller,
      XHeader,
      Actionsheet,
      'mi-header': header
    },
    data () {
      return {
        foodList: {},
        graph: true, // 是否图形化
        theme_color: this.$route.params.theme === 'teacher' ? 'orange' : 'green',
        cate_name: ''
      };
    },
    created () {
      this.fetchData(this.$root.api.food, new Date());
    },
    methods: {
      showImage () {
        this.graph = !this.graph;
        console.log(this.graph);
      },
      fetchData (url, date) {
        let vm = this;
        this.$http.get(url, {
          params: {date: date}
        })
          .then(response => {
            console.log('food menu', response.data);
            vm.foodList = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      cateName (key) {
        return key === 'lunch' ? '午餐' : '晚餐';
      }
    },
    watch: {
      '$route' () {
        this.theme_color = this.$route.params.theme === 'teacher' ? 'orange' : 'green';
      }
    },
    filters: {
      firstUpperCase ([first, ...rest]) {
        return first.toUpperCase() + rest.join('');
      }
    },
    mounted () {
//      this.$nextTick(() => {
//        this.$refs.scrollerEvent.reset({top: 0});
//      });
//      this.$nextTick(() => {
//        this.$refs.scrollerBottom.reset({top: 0});
//      });
    }
  };
</script>

<style lang="less">
  @color_orange: rgb(252,116,57);
  @color_orange_light: rgb(254,227,215);
  @color_green: rgb(123,198,16);
  @color_green_light: rgb(228,243,206);

  .vux-header {
    .vux-header-left .left-arrow {
      .left-arrow {
        color: #fff;
        &:before {
          border: 1px solid #fff;
        }
      }
    }
    &.top {
      &.green{
        background: @color_green;
      }
      &.orange {
        background: @color_orange;
      }
      img {
        margin-top: -7px;
      }
    }
    &.bottom {
      &.green{
        background: @color_green_light;
        .vux-header-title {
          color: @color_green;
        }
      }
      &.orange{
        background: @color_orange_light;
        .vux-header-title {
          color: @color_orange;
        }
      }
      .vux-header-title {
        margin-top: -5px;
        height:35px;
      }
      img {
        margin-top: -13px;
      }
    }
    .vux-header-title {
      font-size: 16px !important;
    }
    .icon {
      width: 35%;
      margin-left: 65%;
      img {
        width: 100%;
      }
    }
  }

  .menu_image_text {
    .item {
      background: #fff;
      margin-bottom: 10px;
    }
    .cate_bar {
      padding: 5px 0;
      img {
        width: 40px;
      }
      .cate_left {
        float: left;
      }
      .cate_right {
        float: left;
        font-size: 14px;
        p {
          text-align: center;
          margin: 0;
          &.en {
            font-size: 11px;
          }
          &.green {
            color: @color_orange;
          }
          &.orange {
            color: @color_green;
          }
        }
      }
    }
    .box1 {
      height: 120px;
      position: relative;
      width: 1000px;
      .box1-item {
        width: 90px;
        height: 90px;
        background-color: #ccc;
        display:inline-block;
        margin-left: 10px;
        float: left;
        text-align: center;
        border-radius: 6px;
        img {
          width: 100%;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
        }
        span {
          font-size: 14px;
          color: #999;
          &.tag {
            display: block;
            position: absolute;
            width: 90px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            top: 0;
            opacity: 0.5;
            color: #fff;
            border-radius: 8px 8px 0 0;
            &.orange {
              background: @color_orange;
            }
            &.green {
              background: @color_green;
            }
          }
        }
      }
    }
  }


  .food {
    width: 100%;
    height: 100%;
    background: #EFEFEF;
    .line {
      width: 1px;
      height: 100%;
      position: absolute;
      left: 40px;
      background: #E2E2E2;
    }
    .content {
      .item {
        margin-top: 20px;
        background: #fff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        padding: 10px 0;
        .icon {
          text-align: center;
          p {
            margin: 0;
            font-size: 14px;
            &.orange{
              color: @color_green
            }
            &.green{
              color: @color_orange
            }
          }
          img{
            width: 100%;
          }
        }
        .list p {
          margin: 2px 0;
          font-size: 14px;
          color:#979696;
          display: flex;
          span{
            flex: 1;
          }
        }
      }
    }

  }


</style>
