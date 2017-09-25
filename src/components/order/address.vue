<template>
  <div class="address-wrap">
    <mi-header :opac="headerOpacity">
      <div slot="header_left" class="left">
        <i class="el-icon-arrow-left" @click="goBackEvent"></i>
      </div>
      <div slot="header_center" class="center">
        <p>{{title[action]}}</p>
      </div>
      <div slot="header_right" class="right">
        <p>{{titleRight[action]}}</p>
      </div>
    </mi-header>

    <cell style="padding-top:35px; margin-bottom: 0;" dark>
      <div slot="cell-left">
        快速添加地址
      </div>
      <div slot="cell-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </cell>
    <el-radio-group class="radio-group" v-model="addressIndex">
      <cell v-for="(item, index) in addressList">
        <div slot="cell-left">
          <p>姓名：{{item.name}}</p>
          <p>手机：{{item.mobile}}</p>
          <p>地址：{{item.address}}</p>
          <p>邮编：{{item.zip_code}}</p>
        </div>
        <div slot="cell-right" class="right-radio">
          <el-radio class="radio" :label="item.address_id"></el-radio>
        </div>
      </cell>
    </el-radio-group>

  </div>
</template>
<script>
  import header from '../../components/header';
  import cell from '../../components/order/cell';

  export default {
    data () {
      return {
        headerOpacity: 1,
        action: '',
        addressIndex: 0,
        title: {
          select: '选择收货地址',
          add: '新增收货地址',
          manage: '地址管理'
        },
        titleRight: {
          select: '管理',
          add: '',
          manage: '✛'
        },
        addressList: []
      };
    },
    created () {
      this.action = this.$route.params.action;
      this.fetchData(this.$root.api.address);
    },

    components: {
      'mi-header': header,
      'cell': cell
    },
    methods: {
      goBackEvent () {
        switch (this.action) {
          case 'select':
            this.$router.go(-1);
            break;
          default:
            this.$router.push('/address/select');
        }
      },
      fetchData (url, id) {
        let vm = this;
        this.$http.get(url, {
          params: {address_id: id}
        })
          .then(response => {
            console.log('address list', response.data);
            vm.addressList = response.data.list;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    watch: {
      '$route' (to) {
        this.action = to.params.action;
      }
    }
  };
</script>

<style lang="less">
  .address-wrap {
    background: #efefef;
    min-height: 100%;
    .radio-group {
      width: 100%;
      p {
        font-size:13px;
        margin: 8px 0;
      }
      .cell {
        margin-bottom: 1px;
      }
      .right-radio {
        margin-top: 36px
      }
    }
    .el-radio__label {
      display: none;
    }
  }
</style>
