<template>
  <div class="address-wrap">
    <mi-header :opac="headerOpacity">
      <div slot="header_left" class="left">
        <i class="el-icon-arrow-left" @click="goBackEvent"></i>
      </div>
      <div slot="header_center" class="center">
        <p>{{title[action]}}</p>
      </div>
      <div slot="header_right" class="right" @click="rightIconHandle()">
        <p>{{titleRight[action]}}</p>
      </div>
    </mi-header>

    <my-cell style="padding-top:35px; margin-bottom: 0;" dark v-if="action=='select'">
      <div slot="cell-left">
        快速添加地址
      </div>
      <div slot="cell-right" @click="goAddressAdd()">
        <i class="el-icon-arrow-right"></i>
      </div>
    </my-cell>

    <el-radio-group class="radio-group"
                    v-model="addressIndex"
                    @change="addressChange"
                    v-if="action=='select'"
    >
      <my-cell v-for="(item, index) in addressList">
        <div slot="cell-left">
          <p>姓名：{{item.name}}</p>
          <p>手机：{{item.mobile}}</p>
          <p>地址：{{item.address}}</p>
          <p>邮编：{{item.zip_code}}</p>
        </div>
        <div slot="cell-right" class="right-radio">
          <el-radio class="radio" :label="item.address_id"></el-radio>
        </div>
      </my-cell>
    </el-radio-group>

    <group v-if="action=='add'">
      <x-input title="收件人" placeholder="请输入收件人姓名" style="padding-top:35px" required></x-input>
      <x-input title="手机号码" placeholder="请输入手机号码" is-type="china-mobile" required></x-input>
      <x-address title="配送地区"
                 v-model="addressArr"
                 :list="addressData"
                 placeholder="请选择地址"
                 :inline-desc="getAddressName(addressArr)"
                 :show.sync="showAddress"
      ></x-address>
      <x-input title="信息地址" placeholder="请输入收货地址" v-model="addressDetail"></x-input>
      <x-input title="邮政编码" placeholder="请输入邮政编码"></x-input>

    </group>

    <my-cell v-for="(item, index) in addressList" v-if="action=='manage'">
      <div slot="cell-left">
        <p>姓名：{{item.name}}</p>
        <p>手机：{{item.mobile}}</p>
        <p>地址：{{item.address}}</p>
        <p>邮编：{{item.zip_code}}</p>
      </div>
      <div slot="cell-right" class="right-radio">
        <i class="el-icon-arrow-right"></i>
      </div>
    </my-cell>

  </div>
</template>
<script>
  import header from '../../components/header';
  import myCell from '../../components/order/my_cell';
  import { Group, XAddress, ChinaAddressV4Data, Cell, XButton, XInput, Value2nameFilter as value2name } from 'vux';

  export default {
    data () {
      return {
        addressArr: [],
        addressDetail: '',
        showAddress: false,
        addressData: ChinaAddressV4Data,
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
      'my-cell': myCell,
      Cell,
      Group,
      XAddress,
      XButton,
      XInput
    },
    methods: {
      goBackEvent () {
        switch (this.action) {
          case 'select':
            this.$router.go(-1);
            break;
          default:
            this.$router.replace('/address/select');
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
      },
      goAddressAdd () {
        this.$router.replace('/address/add');
      },
      rightIconHandle () {
        if (this.action === 'select') {
          this.$router.replace('/address/manage');
        }
        if (this.action === 'manage') {
          this.$router.replace('/address/add');
        }
      },
      addressChange (id) {
        console.log(id);
      },
      getAddressName (value) {
        return value2name(value, ChinaAddressV4Data);
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
