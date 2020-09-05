<template>
  <div class="view">
    <div>
      当前页面不存在，请检查当前网址是否正确
    </div>
    <div>
      <router-link class="return" to="/">
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'NotFound'
};
</script>

<style lang='scss' scoped>
.view {
  min-height: 100vh;
  padding: 16px 16px;
  .return{
    border-bottom: 1px solid black;
    font-size: 20px;
    color: red;
  }
}
</style>