<template>
  <div class="body-box">
    <goodsList :body="body"></goodsList>
  </div>
</template>
<script>
  import goodsList from './goodsList';
  export default{
    props: ['body'],
    components: {
      'goodsList': goodsList
    },
    data () {
      return {};
    }
  };
</script>

<style lang="less" scoped>
  .body-box {
    height:100%;
    background: #efefef;
  }
</style>
