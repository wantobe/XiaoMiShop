<template>
  <div class="cell" :class="{'dark': dark!=undefined}">
    <el-row>
      <el-col :span="19" :offset="1" class="left" v-if="full==undefined">
        <slot name="cell-left"></slot>
      </el-col>
      <el-col :span="3" class="right" v-if="full==undefined">
        <slot name="cell-right"></slot>
      </el-col>
      <el-col :span="22" :offset="1" v-if="full!=undefined">
        <slot name="cell-full"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'cell',
    props: ['dark', 'light', 'full']
  };
</script>

<style lang="less" scoped>
  .cell {
    background: #fff;
    color: #888;
    margin-bottom: 10px;
    &.dark{
      background: #5F606D;
      color: #fff;
      border-bottom: 1px solid #787981;
    }
    .left {
      padding: 10px 0;
    }
    .right {
      padding: 10px 0;
      text-align: right;
    }
  }
</style>
