<template>
  <el-container>
    <el-row>
      <el-col
        :span="24"
        class="room-banner"
        v-if="roomDetail.imageUrl !== undefined"
      >
        <el-image
          class="banner-img"
          :src="roomDetail.imageUrl[2]"
          :fit="'cover'"
        ></el-image>
        <el-image
          class="banner-img"
          :src="roomDetail.imageUrl[0]"
          :fit="'cover'"
        ></el-image>
        <el-image
          class="banner-img"
          :src="roomDetail.imageUrl[1]"
          :fit="'cover'"
        ></el-image>
      </el-col>
      <router-link :to="{ name: 'Main' }"
        ><el-image
          class="banner-logo"
          :src="require('@assets/img/logo_block.svg')"
          :fit="'cover'"
        ></el-image
      ></router-link>

      <el-col :span="12" :xl="12" :lg="12" :md="18" :sm="24" :xs="24">
        <div
          class="room-info-content"
          v-if="roomDetail.descriptionShort !== undefined"
        >
          <span class="info-name">{{ roomDetail.name }}</span>
          <span class="info-description-short"
            >客房人數限制:{{ roomDetail.descriptionShort.GuestMin }}~{{
              roomDetail.descriptionShort.GuestMax
            }}人</span
          >
          <span class="info-description-short"
            >床型:{{ roomDetail.descriptionShort.Bed.toString() }}</span
          >
          <span class="info-description-short">衛浴數量:{{ bathNum }}間</span>
          <span class="info-description-short"
            >房間大小:{{ roomDetail.descriptionShort.Footage }}平方公尺</span
          >
          <span class="info-description">{{ description }}</span>
          <span class="info-gap">\\\</span>
          <el-col :span="12" :xs="24" class="info-check-content">
            <span class="info-check">Check In</span>
            <span class="info-time"
              >{{ roomDetail.checkInAndOut.checkInEarly }} －
              {{ roomDetail.checkInAndOut.checkInLate }}</span
            >
          </el-col>
          <el-col :span="12" :xs="24" class="info-check-content">
            <span class="info-check">Check Out</span>
            <span class="info-time">{{
              roomDetail.checkInAndOut.checkOut
            }}</span>
          </el-col>
          <el-col :span="24" class="info-icon-content">
            <el-col
              :span="8"
              :xl="8"
              :lg="8"
              :md="8"
              :sm="8"
              :xs="24"
              class="info-icon"
              :class="setIconColor(iconItem.key)"
              v-for="(iconItem, iconKey) in infoIcon"
              :key="iconKey"
            >
              <i class="icon" :class="iconItem.class"></i>
              <span>{{ iconItem.title }}</span>
            </el-col>
          </el-col>
        </div>
      </el-col>
      <el-col :span="3" :xl="3" :lg="3" :md="6" :sm="24" :xs="24">
        <div class="room-price-content">
          <span class="info-normal-price"
            >NT.{{ roomDetail.normalDayPrice }}</span
          >
          <span class="info-normal-text">平日(一~四)</span>
          <span class="info-holiday-price"
            >NT.{{ roomDetail.holidayPrice }}</span
          >
          <span class="info-normal-text">假日(五~日)</span>
        </div>
      </el-col>
      <el-col :span="9" :xl="9" :lg="9" :md="9" :sm="24" :xs="24">
        <div class="reservation-date-content">
          <date-picker
            v-model="tempBookingDate"
            placeholder="Select date range"
            range
            :open="true"
            :disabled-date="disabledDate"
          ></date-picker>
          <el-button type="info" class="book-btn" plain @click="onCancel"
            >返回</el-button
          >
          <el-button type="info" class="book-btn" @click="onBook"
            >預約</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="預約時段"
      :visible.sync="centerDialogVisible"
      width="100%"
      fullscreen
      :show-close="false"
    >
      <el-form ref="form" label-width="80px" size="mini">
        <el-form-item label="姓名">
          <el-input
            v-model="axiosData.name"
            :class="{ 'has-danger': error.name.hasError }"
            @focus="error.name.hasError = false"
          ></el-input>
        </el-form-item>
        <div class="error-msg" v-show="error.name.hasError">
          {{ error.name.msg }}
        </div>
        <el-form-item label="聯絡電話">
          <el-input
            v-model="axiosData.tel"
            :class="{ 'has-danger': error.tel.hasError }"
            @focus="error.tel.hasError = false"
          ></el-input>
        </el-form-item>
        <div class="error-msg" v-show="error.tel.hasError">
          {{ error.tel.msg }}
        </div>
        <el-form-item label="預約日期">
          <el-date-picker
            v-model="bookingDate"
            type="daterange"
            range-separator="~"
            start-placeholder="開始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            :class="{ 'has-danger': error.date.hasError }"
            @focus="error.date.hasError = false"
            :size="'small'"
          ></el-date-picker>
        </el-form-item>
        <div class="error-msg" v-show="error.date.hasError">
          {{ error.date.msg }}
        </div>
      </el-form>
      <div class="weekend-period-content">
        <div class="weekend-period">
          <span>假日時段</span>
          <span>{{ weekendCount }}夜</span>
        </div>
        <div class="weekend-period">
          <span>平日時段</span>
          <span>{{ weekDayCount }}夜</span>
        </div>
      </div>
      <div class="sub-total-content">
        <span>= NT.{{ subTotal }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">確定預約</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import moment from "moment"
export default {
  name: "RoomDetail",
  data() {
    return {
      id: this.$route.params.id,
      axiosData: {
        name: null,
        tel: null,
        date: []
      },
      error: {
        name: { hasError: false, msg: "Please input name" },
        tel: { hasError: false, msg: "Please input tel" },
        date: { hasError: false, msg: "Please choose date" }
      },
      description: "Single Room is only reserved for one guest. There is a bedroom with a single size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.",
      tempBookingDate: "",
      bookingDate: "",
      infoIcon: [
        { class: "las la-wifi", title: "Wi-Fi", key: "Wi-Fi" },
        { class: "las la-phone", title: "電話", key: "Television" },
        { class: "las la-mountain", title: "漂亮的視野", key: "Great-View" },
        { class: "las la-utensils", title: "早餐", key: "Breakfast" },
        { class: "las la-wind", title: "空調", key: "Air-Conditioner" },
        { class: "las la-smoking-ban", title: "禁止吸煙", key: "Smoke-Free" },
        { class: "las la-glass-martini", title: "Mini Bar", key: "Mini-Bar" },
        { class: "las la-glass-martini", title: "冰箱", key: "Refrigerator" },
        { class: "las la-baby", title: "適合兒童", key: "Child-Friendly" },
        { class: "las la-concierge-bell", title: "Room Service", key: "Room-Service" },
        { class: "las la-couch", title: "沙發", key: "Sofa" },
        { class: "las la-dog", title: "寵物攜帶", key: "Pet-Friendly" }
      ],
      centerDialogVisible: false,
      weekDayCount: 0,
      weekendCount: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    }
  },
  watch: {
    bookingDate(to) {
      this.axiosData.date = [];
      let [startDate, endDate] = [moment(to[0]), moment(to[1])];
      let [weekDayCount, weekendCount] = [0, 0];
      let diffDay = endDate.diff(startDate, 'days');
      for (let i = 0; i < diffDay; i++) {
        const bookingDate = startDate.add(i, 'days')
        this.axiosData.date.push(bookingDate.format("YYYY-MM-DD"));
        switch (bookingDate.get('isoWeekday')) {
          case 1: case 2: case 3: case 4:
            weekDayCount = weekDayCount + 1;
            break;
          case 5: case 6: case 7:
            weekendCount = weekendCount + 1;
            break;
          default:
            break;
        }
      }
      this.weekDayCount = weekDayCount;
      this.weekendCount = weekendCount;
    }
  },
  computed: {
    roomDetail() {
      return this.$store.getters.roomDetail;
    },
    bathNum() {
      if (this.roomDetail.descriptionShort !== undefined) {
        return this.roomDetail.descriptionShort['Private-Bath'];
      }
      return "";
    },
    subTotal() {
      return (this.weekDayCount * this.roomDetail.normalDayPrice) + (this.weekendCount * this.roomDetail.holidayPrice)
    }
  },
  methods: {
    getRoomDetail() {
      return this.$store.dispatch('getRoomDetail', this.id);
    },
    setIconColor(key) {
      const hasProvide = this.roomDetail.amenities[key];
      if (!hasProvide) {
        return 'grey';
      }
      return '';
    },
    disabledDate(date) {
      return date < new Date(new Date());
    },
    onCancel() {
      this.$router.push({ name: 'Main' });
    },
    onBook() {
      this.weekDayCount = 0;
      this.weekendCount = 0;
      this.centerDialogVisible = true;
      this.bookingDate = this.tempBookingDate;

    },
    onConfirm() {
      if (!this.checkRequired()) {
        return;
      }
      this.$store.dispatch('bookingRoom', { id: this.id, axiosData: this.axiosData })
    },
    checkRequired() {
      if (_.isNull(this.axiosData.name) || this.axiosData.name === "") {
        this.error.name.hasError = true;
        return false;
      }
      if (_.isNull(this.axiosData.tel)) {
        this.error.tel.hasError = true;
        return false;
      }
      if ((this.axiosData.date.length === 0)) {
        this.error.date.hasError = true;
        return false;
      }
      return true;
    }
  },
  created() {
    this.getRoomDetail();
  }
}
</script>