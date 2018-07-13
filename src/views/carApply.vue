<template>
  <div id="carApply">
    <van-nav-bar
    title="车辆申请"
    left-text="返回"
    right-text="关闭"
    left-arrow
    fixed
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <div class="content">
      <van-cell-group class="item-list">
        <van-cell is-link :value="value" title="派车申请" @click="$router.push('dispatchApply')"/>
      </van-cell-group>
      <van-cell-group class="item-list">
        <van-cell is-link :value="value" title="车辆购置" @click="$router.push('carPurchase')"/>
      </van-cell-group>
      <van-cell-group class="item-list">
        <van-cell is-link :value="value" title="车辆调拨" @click="$router.push('carTransfer')" />
      </van-cell-group>
      <van-cell-group class="item-list">
        <van-cell is-link :value="value" title="车辆处置" @click="$router.push('carDisposal')"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Toast, Dialog } from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon
  },
  data() {
    return {
      value: ''
    };
  },
  created() {
    this.getBaseData();
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    onClickRight() {
      Toast('按钮');
    },
    getBaseData() {
      this.$axios.get(this.baseUrl + 'apply/getuser', {
        params: {
        }
      }).then(response => {
        if (response.data.person && response.data.person !== '') {

        } else {
          Dialog.alert({
            title: '提示',
            message: '未登录！请去登录'
          }).then(() => {
            // on close
          });
        };
      }).catch(() => {
      });
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