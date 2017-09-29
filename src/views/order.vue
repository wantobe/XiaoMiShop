<template>
  <div class="order-preview">
    <mi-header :opac="headerOpacity">
      <div slot="header_left" class="left">
        <i class="el-icon-arrow-left" @click="goBackEvent"></i>
      </div>
      <div slot="header_center" class="center">
        <p>订单填写</p>
      </div>
    </mi-header>

    <my-cell style="padding-top:35px; margin-bottom: 0;" dark>
      <div slot="cell-left">
        选择收货地址
      </div>
      <div slot="cell-right" @click="addressSelect()">
        <i class="el-icon-arrow-right"></i>
      </div>
    </my-cell>

    <my-cell dark>
      <div slot="cell-left">
        <p class="address-item" v-for="item in addressDefault">{{item.key}}: {{item.value}}</p>
      </div>
    </my-cell>

    <my-cell full class="preview-info">
      <div slot="cell-full">
        <el-row type="flex" justify="space-between">
          <el-col class="thumb" :span="7"><img :src="thumb" alt=""></el-col>
          <el-col :span="16" class="attrib">
            <h2>{{title}}</h2>
            <p><strong>{{points * num}}</strong> 积分</p>
            <p>市场参考单价: {{price}}元</p>
          </el-col>
        </el-row>
      </div>
    </my-cell>

    <my-cell>
      <div slot="cell-left">数量</div>
      <div slot="cell-right">x{{num}}</div>
    </my-cell>

    <el-row class="bottom-bar">
      <el-col :span="15" :offset="1">
        <p>实际付款: <strong>{{points * num }}</strong> 积分</p>
      </el-col>
      <el-col :span="6" style="text-align: right">
        <el-button type="primary">立即支付</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import header from '../components/header';
  import cell from '../components/order/my_cell';

  export default {
    data () {
      return {
        focus: false,
        inputText: '',
        headerOpacity: 1,
        id: '',
        num: 0,
        title: '',
        thumb: '',
        points: 0,
        price: 0,
        addressDefault: []
      };
    },
    components: {
      'mi-header': header,
      'my-cell': cell
    },
    created () {
      this.id = this.$route.params.id;
      let query = this.$route.query;
      this.title = query.title;
      this.thumb = query.thumb;
      this.points = query.points;
      this.price = query.price;
      this.num = query.num;
      this.fetchData(this.$root.api.address);
    },
    methods: {
      goBackEvent () {
        let id = this.$route.params.id;
        console.log(id);
        this.$router.push('/detail/' + id);
      },
      addressSelect () {
        this.$router.push('/address/select');
      },
      fetchData (url, id) {
        let vm = this;
        this.$http.get(url, {
          params: {address_id: id}
        })
          .then(response => {
            console.log('default address', response.data.default);
            vm.addressDefault = response.data.default;
            let cname = {
              name: '姓名',
              mobile: '手机',
              address: '地址'
            };
            vm.addressDefault = Object.keys(cname).map(function (key) {
              return {key: cname[key], value: vm.addressDefault[key]};
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  };
</script>

<style lang="less" scoped>
  .order-preview {
    background-color: #EFEFEF;
    height: 100%;
    .address-item {
      color: white;
      margin: 5px 0;
      font-size: 13px;
    }
    .preview-info {
      padding: 10px 0;
      .thumb {
        font-size: 0;
        img {
          border:  1px solid #eee;
          width: 100%;
        }
      }
      .attrib p {
        margin: 0;
        font-size: 14px;
        strong {
          color: orange;
        }
      }
      h2 {
        font-size: 14px;
        color: #333;
        margin: 0 0 5px 0;
      }
    }

    .bottom-bar {
      width:100%;
      background: rgba(255,255,255, 0.4);
      position: fixed;
      bottom: 0;
      strong {
        color: orange;
      }
      button {
        margin-top: 9px;
      }
    }

  }

</style>
