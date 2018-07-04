<template>
  <div id="carApply">
    <van-nav-bar
    title="车辆申请"
    left-text="返回"
    right-text="关闭"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <div class="content">
      <van-cell-group class="item-list">
        <van-cell is-link  title="派车申请" @click="$router.push('dispatchApply')"/>
      </van-cell-group>
      <van-cell-group class="item-list">
        <van-cell is-link  title="车辆购置" />
      </van-cell-group>
      <van-cell-group class="item-list">
        <van-cell is-link  title="车辆调拨" />
      </van-cell-group>
      <van-cell-group class="item-list">
        <van-cell is-link  title="车辆处置" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Toast } from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    onClickRight() {
      Toast('按钮');
    }
  }
};
</script>

<style>
  #carApply .van-cell-group {
    margin-bottom: 10px;
    box-shadow: 1px 1px 10px #f2f2f2;
  }
</style>