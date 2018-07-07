<template>
  <div id="success">
    <van-icon name="checked" />
    <p>申请已提交，审批中</p>
    <van-button size="large" @click="onClick()">确定</van-button>
  </div>
</template>

<script>
import { Icon, Button } from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    onClick() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
  #success {
    text-align: center;
  }
  #success .van-icon{
    font-size: 75px;
    color: #2486a5;
    margin-top: 45%;
  }
  #success .van-button--large {
    width: 40%;
    background-color: #2486a5;
    color: #fff;
    margin: 10px 0;
  }
  #success .van-cell-group {
    margin-bottom: 10px;
    box-shadow: 1px 1px 10px #f2f2f2;
  }
</style>