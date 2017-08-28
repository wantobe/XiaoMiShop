<template>
  <div>
    <div class="buy-control">
      <div class="title">{{ goodsAttr.title }}</div>
      <el-row>
        <el-col :span="14">
          <div class="price">{{ goodsAttr.price }}元  12<span>积分</span></div>
        </el-col>
        <el-col :span="10">
          <div class="number">
            <span class="can" @click="resEvent">-</span>
            <span>{{num}}</span>
            <span class="can" @click="addEvent">+</span>
          </div>
        </el-col>
      </el-row>

      <div class="desc">
        <span class="tag">【{{ goodsAttr.desc.tag }}】</span>
        <span>{{ goodsAttr.desc.sc }}</span>
      </div>
      <!--<div class="attr">-->
        <!--<ul>-->
          <!--<li :class="{active: index === colorIndex}"-->
              <!--v-for="(item, index) in goodsAttr.attr.color"-->
              <!--@click="checkColorEvent(index)">{{ item.text }}-->
          <!--</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<li :class="{active: index === ramIndex}"-->
              <!--v-for="(item, index) in goodsAttr.attr.ram"-->
              <!--@click="checkRamEvent(index)">{{ item.text }}-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12" justify="center">
          <el-button type="primary" @click="buyEvent" class="add-btn">加入购物车</el-button>
        </el-col>
      </el-row>
    </div>

    <mi-model ref="alert" type="confirm" @confirmEvent="">
      <div slot="confirm" class="alert">
        <h5>您选择的产品</h5>
        <h6>{{ popInfo.title }}</h6>
        <p>数量：{{num}}</p>
        <p>{{ popInfo.ram }}　　{{ popInfo.color }}</p>
      </div>
    </mi-model>
  </div>

</template>
<script>
  import model from '../../components/model';
  export default {
    props: ['goodsAttr'],
    data () {
      return {
        colorIndex: 0,
        ramIndex: 0,
        popInfo: {},
        num: 1
      };
    },
    components: {
      'mi-model': model
    },
    created () {
      this.$root.$on('currentgoods', function (goods) {
        console.log('current goods', goods);
      });
    },
    methods: {
      checkColorEvent (num) {
        this.colorIndex = num;
      },
      checkRamEvent (num) {
        this.ramIndex = num;
      },
      submitBuyInfo () {
        var ram = this.goodsAttr.attr.ram[this.ramIndex];
        var color = this.goodsAttr.attr.color[this.colorIndex];
        return {ram: ram, color: color};
      },
      buyEvent () {
        this.popInfo = {
          ram: this.goodsAttr.attr.ram[this.ramIndex].text,
          color: this.goodsAttr.attr.color[this.colorIndex].text,
          title: this.goodsAttr.title,
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
      font-size: 16px;
      color: #FF5722;
      line-height: 32px;
      span{
        font-size:10px;
        color:#ccc;
      }
    }
    .desc {
      color: #999;
      font-size: 12px;
      .tag {
        color: #FF5722;
      }
      margin: 10px 0;
    }
    .add-btn{
      width: 100%;
      margin: 10px;
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
    .number {
      float: right;
      line-height: 30px;
      span {
        border: 1px solid #eee;
        text-align: center;
        width: 30px;
        height: 30px;
        display: inline-block;
        margin: 0 2px;
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


</style>
