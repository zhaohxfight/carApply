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
  padding: 65px 15px 20px 15px; 
}
.van-tabs__wrap {
  position: fixed!important;
  top:45px!important;
}
.search .van-radio__input, .search .van-checkbox__icon {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  height: 20px;
}
.search .van-radio__label, .search .van-checkbox__label {
  line-height: 20px;
  margin-left: 30px;
  padding-left: 30px;
  display: table-cell;
}
.search .van-radio__label .p2 , .search .van-checkbox__label .p2 {
  font-size: 12px;
  color: #808080;
}
.lcimg {
  width: 100%;
  height: auto;
}
.van-dialog__message--has-title {
  text-align: center;
}
.van-dialog__confirm, .van-dialog__confirm:active {
  color: #2486a5!important;
}
</style>
