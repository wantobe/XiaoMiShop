<template>
  <div>
    <div class="buy-control">
      <div class="title">{{ goodsAttr.title }}</div>
      <div class="desc">
        <span class="tag">{{ goodsAttr.cate }}</span>
        <span>{{ goodsAttr.description }}</span>
      </div>
      <el-row>
        <el-col :span="15">
          <div class="price">{{ goodsAttr.points }}<span class="point">积分</span></div>
          <div class="price vice"><span>市场参考价：{{ goodsAttr.price }}元</span></div>
        </el-col>
        <el-col :span="9">
          <div class="add-btn">
            <el-button type="primary" @click="buyEvent">我要兑换</el-button>
          </div>
        </el-col>
      </el-row>

    </div>

    <mi-model ref="alert" type="confirm" @confirmEvent="submitBuyInfo">
      <div slot="confirm" class="alert">
        <h5>您选择的产品</h5>
        <h6>{{ popInfo.title }}</h6>
        <div class="order-check">
          <div class="item">
            <span>数量：</span>
            <div class="number">
              <span class="can" @click="resEvent">-</span>
              <span class="text">{{num}}</span>
              <span class="can" @click="addEvent">+</span>
            </div>
          </div>
          <div class="item">
            <span>小计:</span>
            <div class="number">
              {{goodsAttr.points * num}} <em>积分</em>
            </div>
          </div>
        </div>
      </div>
    </mi-model>
  </div>

</template>
<script>
  import model from '../../components/model';
  export default {
    props: ['goodsAttr', 'show_search_bar'],
    data () {
      return {
        popInfo: {},
        num: 1
      };
    },
    components: {
      'mi-model': model
    },
    methods: {
      submitBuyInfo (b) {
        let id = this.$route.params.id;
        if (b) {
          let goodsAttr = this.$props.goodsAttr;
          let query = {
            thumb: goodsAttr.thumb,
            title: goodsAttr.title,
            points: goodsAttr.points,
            price: goodsAttr.price,
            num: this.num
          };
          this.$router.push({
            path: '/order/' + id, query: query
          });
        }
      },
      buyEvent () {
        this.popInfo = {
          title: this.$props.goodsAttr.title,
          num: this.num
        };
        this.$refs.alert.modelOpen();
      },
      resEvent () {
        if (this.num > 1) this.num--;
      },
      addEvent () {
        this.num++;
      }
    }
  };
</script>

<style lang="less">
  .buy-control {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #ddd;
    font-family: 'Microsoft YaHei';
    .title {
      line-height: 25px;
      font-size: 15px;
    }
    .price {
      font-size: 18px;
      color: #FF5722;
      line-height: 24px;
      span{
        font-size:12px;
        color:#ccc;
        &.point {
          color: #666;
          padding-left: 10px;
          font-size:14px;
        }
      }
      &.vice {
        line-height:16px;
      }
    }
    .desc {
      color: #999;
      font-size: 12px;
      .tag {
        color: #FF5722;
      }
      margin: 5px 0;
    }
    .add-btn{
      margin: 5px;
      text-align: right;
    }
    .attr {
      width: 100%;
      padding: 10px 0 0 0;
      ul {
        width: 100%;
        padding: 0;
        margin: 0;
        li {
          list-style-type: none;
          font-size: 12px;
          border: 1px solid #bbb;
          padding: 6px 10px;
          margin: 5px;
          display: inline-block;
          &.active {
            border: 1px solid #ff5722;
            color: #ff5722;
          }
        }
      }
    }
  }

  .order-check {
    width: 90%;
    margin: 0 auto;
    .item {
      height: 36px;
      line-height: 36px;
      clear: both;
      .number {
        float: right;
        line-height: 30px;
        em {
          font-style: normal;
          font-size:0.8em;
        }
        span {
          border: 1px solid #eee;
          text-align: center;
          width: 30px;
          height: 30px;
          display: inline-block;
          margin: 0 2px;
          &.text {
            border: none;
          }
          &.can {
            &:active {
              background: #eee;
            }
          }
          &.r {
            float: right;
            &:active {
              background: #eee;
            }
          }
        }
      }
    }
  }




</style>
