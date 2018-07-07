<template>
  <div id="carPurchase">
    <van-nav-bar
    title="车辆购置"
    left-text="返回"
    right-text="关闭"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <van-tabs v-model="active">
      <van-tab>
        <div slot="title">
          <!-- <van-icon name="more-o" /> -->
          表单
        </div>
        <div class="content">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="购置信息" name="1">
              <van-field v-model="sendData.title" label="标题" disabled/>
              <van-cell is-link :value="danTypeS" @click="showDanType = true" title="紧急程度" placeholder="请选择紧急程度" />
              <van-field v-model="sendData.tele" label="联系方式" placeholder="请输入发起人联系方式"/>
              <van-field v-model="sendData.explain" label="备注" placeholder="购置说明"  rows="2" autosize/>
            </van-collapse-item>
            <van-collapse-item title="审批信息" name="2">
              <van-cell is-link title="部门负责人" :value="bmPeople" @click="showSelectPopup(2)" />
            </van-collapse-item>
          </van-collapse>
        </div>
        <div class="bntbox">
          <van-button class="bot-btn" bottom-action @click="sendMethod()">确认提交</van-button>         
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          <!-- <van-icon name="more-o" /> -->
          流程图
        </div>
        <div class="content">
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="showDanType" position="bottom" :lazy-render="false" >
      <van-picker
        show-toolbar
        value-key="name"
        title="请选择紧急程度"
        :columns="danType"
        @cancel="showDanType = false"
        @confirm="danTypeonConfirm"
      />
    </van-popup>
    <van-popup v-model="show" class="bm-search" position="right" :overlay="false">
      <div class="pop-fix">
        <van-nav-bar
          title="请选择"
          left-arrow
          @click-left="show = false"
        />
        <form action="/"  style="height:45px;background-color:#fff;">
          <van-search
            v-model="searchValue"
            placeholder="搜索"
            show-action
            @search="onSearch(searchValue)"
            @cancel="onSearchCancel()"
          />
        </form>
        <div class="popup-nav">
          <ul v-if="bmhide">
            <li v-for="(item, index) in navList" :key="item.mdm_pk" @click="navClick(item, index)"><van-icon v-if="index > 0" class="rbt" name="arrow" /> {{item.name}}</li>
          </ul>
        </div>
      </div>
      <div  class="sebm-radio andPeople" :class="{'search': !bmhide}">
        <van-cell-group v-if="bmhide">
          <van-cell v-for="(item, index) in selectType.dept" :key="item.id" :value="item.name">
            <van-icon slot="right-icon" class="rbt" name="wap-nav" info="下级"  @click="levelClick(item)" />
          </van-cell>
        </van-cell-group>
        <van-radio-group  v-model="PE" class="peopleS">
          <van-cell-group>
            <van-cell v-for="item2 in selectType.person" >
              <van-radio :name="item2">
                <p>{{item2.name}}</p>
                <p>{{item2.address}}</p>
              </van-radio>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div v-if="showLoading" class="loading">
        <van-loading  type="spinner" color="black" />
      </div>
      <div class="nav-bot">
        <van-cell title="已选择:" :value="selectedList.length" is-link>
          <van-button slot="right-icon" size="small" type="primary" @click="finalClick()">确定</van-button>
        </van-cell>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Toast, Tab, Tabs, Collapse, CollapseItem, Field, Popup, Picker, DatetimePicker, Search, RadioGroup, Radio, Loading, Button, Checkbox, CheckboxGroup } from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Search.name]: Search,
    [DatetimePicker.name]: DatetimePicker,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Loading.name]: Loading,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      value: '',
      active: 0,
      show: false,
      bmhide: true,
      activeNames: ['1'],
      showLoading: false,
      searchValue: '',
      PE: {},
      navList: [],
      bmPeople: '',
      danTypeS: '',
      danType: [{
        name: '特急',
        value: 1
      }, {
        name: '紧急',
        value: 2
      }, {
        name: '一般',
        value: 3
      }],
      showDanType: false,
      selectedList: [],
      selectType: {
      },
      getMes: {},
      sendData: {
        title: ''
      }
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
    showSelectPopup(id) {
      this.dataID = id;
      this.selectedList = [];
      this.selectType = {};
      this.navList = [{
        mdm_pk: '',
        name: '全部'
      }];
      this.showBM = false;
      this.getSelectData();
      this.show = true;
    },
    finalClick() {
      this.sendData.apply_dept_user = this.selectedList[0].mdm_code;
      this.bmPeople = this.selectedList[0].name;
      this.show = false;
    },
    danTypeonConfirm(value, index) {
      this.danTypeS = value.name;
      this.sendData.urgent = value.value;
      console.log(this.sendData);
      this.showDanType = false;
    },
    levelClick(item) {
      this.navList.push(item);
      this.getSelectData(item.mdm_pk);
    },
    getBaseData() {
      this.$axios.get('http://carsadmin.iyunfish.cn/apply/getuser', {
        params: {
        }
      }).then(response => {
        this.getMes = response.data;
        this.sendData.title = this.getMes.title + '车辆购置';
      }).catch(() => {
      });
    },
    getSelectData(id) {
      this.showLoading = true;
      this.$axios.get('http://carsadmin.iyunfish.cn/apply/getframework', {
        params: {
          mdm_pk: id,
          person: 1
        }
      }).then(response => {
        console.log(response.data);
        this.selectType = response.data;
        this.showLoading = false;
      }).catch(() => {
      });
    },
    onSearch(mes) {
      this.bmhide = false;
      this.showLoading = true;
      this.$axios.get('http://carsadmin.iyunfish.cn/apply/search', {
        params: {
          name: mes
        }
      }).then(response => {
        this.selectType.person = response.data;
        this.showLoading = false;
      }).catch(() => {
      });
    },
    sendMethod() {
      console.log(this.sendData);
      this.$axios.post('http://carsadmin.iyunfish.cn/apply/purchase', this.sendData)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          Toast.success(response.data.msg);
        } else {
          Toast.fail(response.data.msg);
        }
      }).catch(() => {
      });
    }
  },
  watch: {
    PE(val) {
      this.selectedList = [];
      this.selectedList.push(val);
    }
  }
};
</script>

<style>
.van-collapse-item__content {
  padding: 0;
}
.van-collapse-item {
  margin-bottom: .5rem;
}
.van-tabs__line{
  background-color:#2486a5;
}
.van-tab--active {
  color: #2486a5;
}
.van-cell .van-cell__title {
  max-width: 90px;
}
.van-cell__value {
  text-align: left;
}
.my-tag {
  position: relative;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: .8rem;
  padding: .25rem .4rem;
  display: inline-block;
  margin: 0 .1rem .2rem 0;
}
.pr-2 {
  padding-right: 1.5rem;
}
.tag-close {
  font-size: .8rem;
  color: red;
}
.tag-add {
  font-size: 1.5rem;
  color: #2486a5;
}
.my-Mestag {
    position: absolute;
    right: .5rem;
    top: 50%;
    margin-top: -0.4rem;
}
.bm-search {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 242, 242);
  margin-top: -1px;
}
.bm-search .van-nav-bar {
  background-color: #fff;
  color: #2d2d2d;
}
.bm-search .van-nav-bar .van-icon {
  color: #2486a5;
}
.van-search__cancel {
  color: #565656;
}
.sebm-radio .van-radio {
  padding-right: 34px;
  position: relative;
}
.sebm-radio {
  padding-top: 135px;
  padding-bottom: 45px;
  height: calc(100% - 180px);
  overflow: auto;
  position: relative;
}
.sebm-radio .rbt {
  position: absolute;
  top: 50%;
  right: 12%;
  font-size: 14px;
  color: #2486a5;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.sebm-radio .rbt .van-icon__info {
  width: 3rem;
  position: absolute;
  top: 50%;
  left: 60%;
  font-size: 14px;
  background-color: transparent;
  color: #2486a5;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.van-radio__label {
  line-height: 5px;
}
.van-radio .van-icon-checked {
  color: #2486a5;
}
.popup-nav {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}
.popup-nav ul::-webkit-scrollbar {display: none;}
.popup-nav ul{white-space: nowrap; -webkit-overflow-scrolling: touch; overflow: hidden;overflow-x: auto; padding: 0 .5rem; margin: 0;}
.popup-nav ul li{ display: inline-block;  margin-right: .2rem; overflow: hidden; color: #2486a5;}
.popup-nav ul li:last-child, .popup-nav .van-icon-arrow {color: #565656;}
.popup-nav .van-icon-arrow { margin-right: 5px; font-size: 12px;}
.pop-fix {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
.nav-bot {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  box-shadow: 1px 0px 14px #e0dfdf;
}
.loading {
  margin-top:135px;
  margin-bottom: 45px; 
  width: 100%;
  height: 1calc(100% - 180px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: #fff;
}
.loading .van-loading {
  margin: 0 auto;
  margin-top: 50%;
}
.peopleS {
  margin-top: 20px;
}
.peopleS .van-cell {
  line-height: 14px;
}
.peopleS .van-cell p {
  margin: 0;
}
.van-checkbox--checked {
  background-color: #2486a5;
  border-color: #2486a5;
}
.bntbox {
  padding: 0 10px;
}
.bot-btn {
  background-color: #2486a5;
  margin: 20px 0;
}
.van-collapse-item__title .van-cell__value {
  color:#000;
  font-size: 16px;
}
.search .van-radio__input {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  height: 20px;
}
.search .van-radio__label {
  line-height: 20px;
  margin-left: 30px;
  padding-left: 30px;
  display: table-cell;
}
.search .van-radio__label .p2 {
  font-size: 12px;
  color: #808080;
}
</style>