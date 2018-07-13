<template>
  <div id="dispatchApply">
    <van-nav-bar
    title="车辆调拨"
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
            <van-collapse-item title="基本信息" name="2"> 
              <van-field v-model="sendData.title" label="标题" disabled required/>
              <van-cell is-link title="车牌号" :value="sendData.plate_num" @click="showCarSelectPopup()" required/>
              <van-field v-model="sendData.brand" label="厂牌型号" placeholder="请输入规格型号" disabled required/>
              <van-field v-model="sendData.car_master" label="车主姓名" placeholder="请输车主姓名" required/>
              <van-field v-model="sendData.engine" label="发动机号" placeholder="请输入发动机型号" required/>
              <van-cell is-link :value="sendData.register_time" @click="showTime = true" title="登记日期" required/>
              <van-field v-model="sendData.carriage_num" label="车架号码" placeholder="请输入车架号码" required/>
            </van-collapse-item>
            <van-collapse-item title="车辆状况" name="3">
              <van-cell is-link :value="sendData.driving | statusTypeFilter" @click="clickshowif(1)" title="行驶证" required/>
              <van-cell is-link :value="sendData.prove | statusTypeFilter" @click="clickshowif(2)" title="购置税证明" required/>
              <van-cell is-link :value="sendData.register | statusTypeFilter" @click="clickshowif(3)" title="登记卡" required/>
              <van-cell is-link :value="sendData.insurance | statusTypeFilter" @click="clickshowif(4)" title="保险卡" required/>
              <van-cell is-link :value="sendData.insurance_sign | statusTypeFilter" @click="clickshowif(5)" title="保险标志" required/>
              <van-cell is-link :value="sendData.protection_sign | statusTypeFilter" @click="clickshowif(6)" title="环保标志" required/>
              <van-cell is-link :value="sendData.annual_sign | statusTypeFilter" @click="clickshowif(7)" title="年审标志" required/>
              <van-cell is-link :value="sendData.annual_ticket | statusTypeFilter" @click="clickshowif(8)" title="年票" required/>
              <van-cell is-link :value="sendData.exhaust | statusTypeFilter" @click="clickshowif(9)" title="废气证" />
              <van-cell is-link :value="sendData.use_tax | statusTypeFilter" @click="clickshowif(10)" title="车船使用税" />
              <van-cell is-link :value="sendData.lock | statusTypeFilter" @click="clickshowif(11)" title="防盗锁" required/>
              <van-cell is-link :value="sendData.spare_tire  | statusTypeFilter" @click="clickshowif(12)" title="备用胎" required/>
              <van-field v-model="sendData.glass_condition" label="玻璃情况" placeholder="请输入玻璃情况"/>
              <van-field v-model="sendData.car_condition" label="车身情况" placeholder="请输入车身情况"/>
              <van-cell is-link :value="sendData.car_tool  | statusTypeFilter" @click="clickshowif(13)" title="附车工具" />
              <van-cell is-link :value="sendData.danger_sign  | statusTypeFilter" @click="clickshowif(14)" title="危险标志" />
              <van-field v-model="sendData.travel" label="行程里数" placeholder="请输入车辆行程里数" required/>
              <van-field v-model="sendData.carloss" label="车身情况" placeholder="请输入车身情况"/>
              <van-field v-model="sendData.memo" label="备注说明"  rows="2" autosize/>
            </van-collapse-item>
            <van-collapse-item title="拨调信息" name="4">
              <van-field v-model="sendData.out_dept" label="调出部门" placeholder="请输入调出部门" required/>
              <van-cell  :value="in_dept_name" is-link title="调入部门" @click="showSelectPopup(1)" required/>
              <van-field v-model="sendData.out_operator" label="调出经办人" placeholder="请输入调出经办人" required/>
              <van-field v-model="sendData.out_tele" label="调出经办电话" placeholder="请输入调出经办电话" required/>
              <van-field v-model="sendData.in_operator" label="调入经办人" placeholder="请输入调入经办人" required/>
              <van-field v-model="sendData.in_tele" label="调入经办电话" placeholder="请输入调入经办人电话" required/>
              <van-cell is-link :value="sendData.change_time" @click="showTime2 = true" title="调拨日期" required/>
            </van-collapse-item>
            <van-collapse-item title="审批信息" name="5">
              <van-field label="审批人" type="number" placeholder="审批人已由系统设置" disabled/>
              <van-cell is-link :value="sendData.apply_type" @click="showType = true" title="调拨类型" required/>
              <van-cell is-link title="部门负责人" :value="bmPeople" @click="showSelectPopup(2)" required/>
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
    <van-popup v-model="showTime" position="bottom" :lazy-render="false" >
      <van-datetime-picker
        type="date"
        title="选择日期"
         v-model="currentDate"
        @confirm="onAreaConfirm"
        @cancel="showTime = false"
      />
    </van-popup>
    <van-popup v-model="showTime2" position="bottom" :lazy-render="false" >
      <van-datetime-picker
        type="date"
        title="选择日期"
         v-model="currentDate2"
        @confirm="onAreaConfirm2"
        @cancel="showTime2 = false"
      />
    </van-popup>
    <van-actionsheet v-model="showif" :actions="actions" />

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

    <van-popup v-model="showCarNum" class="bm-search" position="right" :overlay="false">
      <div class="pop-fix">
        <van-nav-bar
          title="请选择"
          left-arrow
          @click-left="showCarNum = false"
        />
        <form action="/"  style="height:45px;background-color:#fff;">
          <van-search
            v-model="searchValue"
            placeholder="搜索"
            show-action
            @search="getSelectData(searchValue)"
            @cancel="onSearchCancel()"
          />
        </form>
        <div class="popup-nav">
        </div>
      </div>
      <div  class="sebm-radio andPeople carse" :class="{'search': !bmhide}">
        <van-radio-group  v-model="PE" class="peopleS">
          <van-cell-group>
            <van-cell v-for="item2 in carSelectType" >
              <van-radio :name="item2">
                <p>{{item2.brand}}</p>
                <p class="p2">{{item2.plate_num}}</p>
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
          <van-button slot="right-icon" size="small" type="primary" @click="carfinalClick()">确定</van-button>
        </van-cell>
      </div>
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
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Toast, Tab, Tabs, Collapse, CollapseItem, Field, Popup, Picker, DatetimePicker, Search, RadioGroup, Radio, Loading, Button, Checkbox, CheckboxGroup, Actionsheet } from 'vant';

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
    [CheckboxGroup.name]: CheckboxGroup,
    [Actionsheet.name]: Actionsheet
  },
  data() {
    return {
      value: '',
      active: 0,
      activeNames: ['1'],
      searchValue: '',
      BM: {},
      PE: {},
      in_dept_name: '',
      showTime: false,
      showTime2: false,
      showif: false,
      showCarNum: false,
      showCarType: false,
      showSendType: false,
      showLoading: false,
      show: false,
      showBM: false,
      showPeople: true,
      bmhide: true,
      ifNumber: 0,
      message: ' ',
      radio: '1',
      apply_type: ' ',
      showType: false,
      belongType: [{
        name: '中心内部调拨',
        value: 1
      }, {
        name: '区域内部调拨',
        value: 2
      }, {
        name: '子公司内部调拨',
        value: 3
      }, {
        name: '中心/区域/子公司之间调拨',
        value: 3
      }],
      currentDate: new Date(),
      currentDate2: new Date(),
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      actions: [
        {
          name: '有',
          value: 1,
          callback: this.onClickIf
        },
        {
          name: '无',
          value: 2,
          callback: this.onClickIf
        }
      ],
      getMes: {
        person: '',
        dept: '',
        center: '',
        time: '',
        title: ''
      },
      sendData: {
        title: '',
        plate_num: ' ',
        register_time: ' ',
        driving: ' ',
        prove: ' ',
        register: ' ',
        insurance: ' ',
        insurance_sign: ' ',
        protection_sign: ' ',
        annual_sign: ' ',
        annual_ticket: ' ',
        exhaust: ' ',
        use_tax: ' ',
        lock: ' ',
        spare_tire: ' ',
        car_tool: ' ',
        danger_sign: ' ',
        in_dept_name: ' ',
        in_dept: ' ',
        change_time: ' ',
        apply_type: ' '
      },
      useTypeS: '',
      carTypeS: '',
      timeMath: [],
      timeItem: {},
      carType: [],
      carSelectType: [],
      sendType: [{
        name: '一般派车',
        value: 1
      }, {
        name: '补录派车',
        value: 2
      }],
      selectType: {
        dept: [],
        person: [{
          mdm_pk: '12312313',
          name: '全部11'
        }]
      },
      selectedList: [],
      navList: [{
        mdm_pk: '',
        name: '全部'
      }],
      checked: false,
      result: [],
      list: ['a', 'b', 'c'],
      dataID: null,
      bmPeople: ''
    };
  },
  filters: {
    statusTypeFilter(status) {
      const statusMap = {
        '1': '有',
        '2': '无'
      };
      if (status === ' ') {
        return ' ';
      } else {
        return statusMap[status];
      }
    }
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
    clickshowif(id) {
      this.ifNumber = id;
      this.showif = true;
    },
    handleClose(tag, id) {
      if (id === 1) {
        this.sendData.dispatch_user.splice(this.sendData.dispatch_user.indexOf(tag), 1);
      } else {
        this.sendData.copy_user.splice(this.sendData.copy_user.indexOf(tag), 1);
      }
    },
    handleTimeClose(time) {
      this.sendData.dispatching_info.splice(this.sendData.dispatching_info.indexOf(time), 1);
    },
    belongTypeonConfirm(value, index) {
      // this.apply_type = value.name;
      this.sendData.apply_type = value.name;
      this.showType = false;
    },
    levelClick(item) {
      this.navList.push(item);
      if (this.dataID === 1) {
        this.getSelectData(item.mdm_pk);
      } else {
        this.getSelectData(item.mdm_pk, 1);
      }
    },
    navClick(item, index) {
      const len = this.navList.length;
      this.navList.splice(index + 1, len);
      if (this.dataID === 1) {
        this.getSelectData(item.mdm_pk);
      } else {
        this.getSelectData(item.mdm_pk, 1);
      }
    },
    addSelected(item) {
      console.log(item);
      this.selectedList = [];
      this.selectedList.push(item);
    },
    onClickIf(item) {
      if (this.ifNumber && this.ifNumber !== 0) {
        if (this.ifNumber === 1) {
          this.sendData.driving = item.value;
        } else if (this.ifNumber === 2) {
          this.sendData.prove = item.value;
        } else if (this.ifNumber === 3) {
          this.sendData.register = item.value;
        } else if (this.ifNumber === 4) {
          this.sendData.insurance = item.value;
        } else if (this.ifNumber === 5) {
          this.sendData.insurance_sign = item.value;
        } else if (this.ifNumber === 6) {
          this.sendData.protection_sign = item.value;
        } else if (this.ifNumber === 7) {
          this.sendData.annual_sign = item.value;
        } else if (this.ifNumber === 8) {
          this.sendData.annual_ticket = item.value;
        } else if (this.ifNumber === 9) {
          this.sendData.exhaust = item.value;
        } else if (this.ifNumber === 10) {
          this.sendData.use_tax = item.value;
        } else if (this.ifNumber === 11) {
          this.sendData.lock = item.value;
        } else if (this.ifNumber === 12) {
          this.sendData.spare_tire = item.value;
        } else if (this.ifNumber === 13) {
          this.sendData.car_tool = item.value;
        } else if (this.ifNumber === 14) {
          this.sendData.danger_sign = item.value;
        }
      }
      this.ifNumber = 0;
      this.showif = false;
    },
    finalClick() {
      if (this.dataID && this.dataID === 1) {
        this.sendData.in_dept = this.selectedList[0].mdm_code;
        this.in_dept_name = this.selectedList[0].name;
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
    carfinalClick() {
      this.sendData.car_id = this.selectedList[0].id;
      this.sendData.plate_num = this.selectedList[0].plate_num;
      this.sendData.brand = this.selectedList[0].brand;
      this.sendData.engine = this.selectedList[0].engine;
      this.sendData.carriage_num = this.selectedList[0].carriage_num;
      this.sendData.car_master = this.selectedList[0].car_master;
      this.sendData.mileage = this.selectedList[0].mileage;
      this.sendData.register_time = this.selectedList[0].register_time;
      this.showCarNum = false;
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
    showCarSelectPopup() {
      this.carSelectType = [];
      this.getCarData();
      this.showCarNum = true;
    },
    getBaseData() {
      this.$axios.get(this.baseUrl + 'apply/getuser', {
        params: {
        }
      }).then(response => {
        this.getMes = response.data;
        this.sendData.title = this.getMes.title + '车辆拨调';
      }).catch(() => {
      });
    },
    getCarData(mes) {
      this.showLoading = true;
      this.$axios.get(this.baseUrl + 'apply/cars', {
        params: {
          plate_num: mes
        }
      }).then(response => {
        console.log(response.data);
        this.carSelectType = response.data;
        this.showLoading = false;
      }).catch(() => {
      });
    },
    getSelectData(id, ifp) {
      this.showLoading = true;
      this.$axios.get(this.baseUrl + 'apply/getframework', {
        params: {
          mdm_pk: id,
          person: ifp
        }
      }).then(response => {
        console.log(response.data);
        this.selectType = response.data;
        this.showLoading = false;
      }).catch(() => {
      });
    },
    sendMethod() {
      console.log(this.sendData);
      this.$axios.post(this.baseUrl + '/apply/allocation', this.sendData)
      .then(response => {
        if (response.data.success) {
          this.$router.push('/success');
        } else {
          Toast.fail(response.data.msg);
        }
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
    onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    carTypeonConfirm(value, index) {
      this.useTypeS = value.name;
      this.sendData.use_type = value.id;
      this.showCarType = false;
    },
    sendTypeonConfirm(value, index) {
      this.carTypeS = value.name;
      this.sendData.send_type = value.value;
      this.showSendType = false;
    },
    onCancel() {
      this.showCarType = false;
    },
    onAreaConfirm() {
      this.sendData.register_time = this.formatDate(this.currentDate, 'yyyy-MM-dd');
      this.showTime = false;
    },
    onAreaConfirm2() {
      this.sendData.change_time = this.formatDate(this.currentDate2, 'yyyy-MM-dd');
      this.showTime2 = false;
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
.carse .van-radio__label {
  line-height: 20px;
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