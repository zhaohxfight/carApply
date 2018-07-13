<template>
  <div id="carPurchase">
    <van-nav-bar
    title="车辆购置"
    left-text="返回"
    right-text="关闭"
    left-arrow
    fixed
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
            <van-collapse-item title="申请人信息" name="1"> 
              <van-field v-model="getMes.person" label="发起人"  disabled />
              <van-field v-model="getMes.time" label="发起时间" disabled  />
              <van-field v-model="getMes.dept" label="所属组织"  disabled />
              <van-field v-model="getMes.center" label="区域/中心"  disabled />
            </van-collapse-item>
            <van-collapse-item title="购置信息" name="2">
              <van-field v-model="sendData.title" label="标题" disabled required/>
              <van-cell is-link :value="danTypeS" @click="showDanType = true" title="紧急程度" placeholder="请选择紧急程度" required/>
              <van-field v-model="sendData.tele" label="联系方式" placeholder="请输入发起人联系方式" required/>
              <van-field v-model="sendData.explain" label="备注" placeholder="购置说明"  rows="2" autosize/>
            </van-collapse-item>
            <van-collapse-item title="车主信息" name="3">
              <van-field v-model="sendData.car_master" label="车主" required/>
              <van-cell is-link :value="purpose" @click="showpoType = true" title="公用/私用" required/>
              <van-field v-model="sendData.use_people" label="使用人" required/>
              <van-cell is-link title="使用部门" :value="use_department" @click="showSelectPopup(8)" required />
              <van-field v-model="sendData.phone" label="电话" placeholder="请输入联系方式" required/>
              <van-field v-model="sendData.price" label="购买价格" placeholder="请输入购买价格"  required/>
            </van-collapse-item>
            <!-- <van-collapse-item title="购置税" name="4">
              <van-field v-model="sendData.voucher_num" label="凭证号" required/>
              <van-field v-model="sendData.pay_people" label="缴纳人" placeholder="请输入发起人联系方式" required/>
              <van-field v-model="sendData.operator" label="经办人" placeholder="购置说明"  required/>
              <van-cell is-link :value="sendData.pay_time" @click="showPriceDate = true" title="缴费日期" required/>
              <van-field v-model="sendData.position" label="存放位置" placeholder="购置说明"  required/>
              <van-field v-model="sendData.memo" label="备注" placeholder="购置说明"  rows="2" autosize/>
            </van-collapse-item> -->
            <van-collapse-item title="审批信息" name="5">
              <van-field label="审批人" type="number" placeholder="审批人已由系统设置" disabled/>
              <van-cell is-link :value="apply_type" @click="showType = true" title="所属板块" placeholder="所属板块" required/>
              <van-cell is-link title="部门负责人" :value="bmPeople" @click="showSelectPopup(2)" required />
              <van-cell v-model="message" title="抄送人">
                <slot>
                  <span class="my-tag pr-2" v-for="tag in sendData.copy_user"  @click="handleClose(tag, 2)">{{tag.name}} <van-icon name="close" class="tag-close my-Mestag" /></span>
                </slot>
                <van-icon  slot="right-icon" name="add-o" class="van-cell__right-icon tag-add" @click="showSelectPopup(3)" />      
              </van-cell>
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
    <van-popup v-model="showPriceDate" position="bottom" :lazy-render="false" >
      <van-datetime-picker
        type="date"
        title="选择缴纳日期"
         v-model="currentDate"
        @confirm="onPriceConfirm"
        @cancel="showPriceDate = false"
      />
    </van-popup>
    <van-popup v-model="showType" position="bottom" :lazy-render="false" >
      <van-picker
        show-toolbar
        value-key="name"
        title="请选择所属板块"
        :columns="belongType"
        @cancel="showType = false"
        @confirm="belongTypeonConfirm"
      />
    </van-popup>
    <van-popup v-model="showpoType" position="bottom" :lazy-render="false" >
      <van-picker
        show-toolbar
        value-key="name"
        title="请选择公用私用"
        :columns="purposeType"
        @cancel="showpoType = false"
        @confirm="poTypeonConfirm"
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
            v-if="showPeople"
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
      <div v-if="showBM" style="height:100%">
        <van-radio-group v-model="BM" class="sebm-radio">
          <van-cell-group >
            <van-cell v-for="(item, index) in selectType.dept" :key="item.id" >
              <van-radio :name="item">
                <p >{{item.name}}</p>
              </van-radio>
              <van-icon v-if="item.child && item.child === 1"  slot="right-icon" class="rbt" name="wap-nav" info="下级"  @click="levelClick(item)" />
            </van-cell>
          </van-cell-group>
          <div v-if="showLoading" class="loading">
            <van-loading  type="spinner" color="black" />
          </div>
        </van-radio-group>
      </div>

      <div v-if="showPeople" class="sebm-radio andPeople" :class="{'search': !bmhide}">
          <van-cell-group v-if="bmhide">
            <van-cell v-for="(item, index) in selectType.dept" :key="item.id" :value="item.name">
              <van-icon slot="right-icon" class="rbt" name="wap-nav" info="下级"  @click="levelClick(item)" />
            </van-cell>
          </van-cell-group>

          <van-checkbox-group v-if="dataID === 3 || dataID === 5" v-model="selectedList" class="peopleS">
            <van-cell-group>
              <van-cell v-for="item2 in selectType.person" >
                <van-checkbox :name="item2">
                  <p>{{item2.name}}</p>
                  <p class="p2">{{item2.address}}</p>
                </van-checkbox>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>

          <van-radio-group v-if="dataID === 4 || dataID === 2" v-model="PE" class="peopleS">
            <van-cell-group>
              <van-cell v-for="item2 in selectType.person" >
                <van-radio :name="item2">
                  <p>{{item2.name}}</p>
                  <p class="p2">{{item2.address}}</p>
                </van-radio>
              </van-cell>
            </van-cell-group>
          </van-radio-group>


          <div v-if="showLoading" class="loading">
            <van-loading  type="spinner" color="black" />
          </div>
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
      pay_time: ' ',
      BM: {},
      showPeople: false,
      showBM: false,
      showpoType: false,
      showPriceDate: false,
      currentDate: new Date(),
      message: ' ',
      activeNames: ['1'],
      use_department: ' ',
      showType: false,
      apply_type: ' ',
      purpose: ' ',
      purposeType: [{
        name: '公用',
        value: 1
      }, {
        name: '私用',
        value: 2
      }, {
        name: '私家公用',
        value: 3
      }],
      belongType: [{
        name: '集团总部',
        value: 1
      }, {
        name: '房产公司',
        value: 2
      }, {
        name: '子公司',
        value: 3
      }],
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
        title: '',
        pay_time: ' ',
        copy_user: []
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
      this.showPeople = false;
      this.bmhide = true;
      if (id === 1) {
        this.showBM = true;
        this.getSelectData('');
      } else if (id === 8) {
        this.showBM = true;
        this.getSelectData('');
      } else if (id === 2) {
        this.showPeople = true;
        this.getSelectData('', 1);
      } else if (id === 3) {
        this.showPeople = true;
        this.getSelectData('', 1);
      } else if (id === 4) {
        this.showPeople = true;
        this.getSelectData('', 1);
      } else if (id === 5) {
        this.showPeople = true;
        this.getSelectData('', 1);
      }
      this.show = true;
    },
    finalClick() {
      if (this.dataID && this.dataID === 1) {
        this.sendData.use_dept = this.selectedList[0].mdm_code;
        this.sendData.use_dept_name = this.selectedList[0].name;
      } else if (this.dataID && this.dataID === 8) {
        console.log(this.selectedList);
        this.sendData.use_department = this.selectedList[0].mdm_code;
        this.use_department = this.selectedList[0].name;
      } else if (this.dataID && this.dataID === 2) {
        this.sendData.apply_dept_user = this.selectedList[0].code;
        this.bmPeople = this.selectedList[0].name;
      } else if (this.dataID && this.dataID === 4) {
        this.sendData.use_people_name = this.selectedList[0].name;
        this.sendData.use_people = this.selectedList[0].mdm_code;
      } else if (this.dataID && this.dataID === 5) {
        this.sendData.dispatch_user = this.selectedList;
      } else if (this.dataID && this.dataID === 3) {
        this.sendData.copy_user = this.selectedList;
      }
      this.bmhide = false;
      this.show = false;
    },
    belongTypeonConfirm(value, index) {
      this.apply_type = value.name;
      this.sendData.apply_type = value.value;
      this.showType = false;
    },
    danTypeonConfirm(value, index) {
      this.danTypeS = value.name;
      this.sendData.urgent = value.value;
      console.log(this.sendData);
      this.showDanType = false;
    },
    poTypeonConfirm(value, index) {
      this.purpose = value.name;
      this.sendData.purpose = value.value;
      this.showpoType = false;
    },
    levelClick(item) {
      this.navList.push(item);
      this.getSelectData(item.mdm_pk);
    },
    getBaseData() {
      this.$axios.get(this.baseUrl + 'apply/getuser', {
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
      this.$axios.get(this.baseUrl + 'apply/getframework', {
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
      this.$axios.get(this.baseUrl + 'apply/search', {
        params: {
          name: mes
        }
      }).then(response => {
        this.selectType.person = response.data;
        this.showLoading = false;
      }).catch(() => {
      });
    },
    onSearchCancel() {
      this.bmhide = true;
      this.showSelectPopup(this.dataID);
    },
    onPriceConfirm() {
      this.sendData.pay_time = this.formatDate(this.currentDate, 'yyyy-MM-dd');
      this.showPriceDate = false;
    },
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      };
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
      return fmt;
    },
    sendMethod() {
      console.log(this.sendData);
      this.$axios.post(this.baseUrl + 'apply/purchase', this.sendData)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.$router.push('/success');
        } else {
          Toast.fail(response.data.msg);
        }
      }).catch(() => {
      });
    }
  },
  watch: {
    BM(val) {
      this.selectedList = [];
      this.selectedList.push(val);
    },
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