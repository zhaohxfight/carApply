<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
};
</script>

<style>
body {
  background-color: #f8f8f8;
}

.van-cell__title .van-icon {
  font-size: 18px;
}
.van-nav-bar {
  background-color: #2486a5;
}
.van-nav-bar,.van-nav-bar .van-icon, .van-nav-bar__text{
  color: #fff;
}
.van-nav-bar__text:active {
    background-color: #237893;
}
.content {
  padding: 20px 15px;
}
</style>
