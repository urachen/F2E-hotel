<template>
  <div>
    <el-container>
      <div
        class="cover"
        :style="{ 'background-image': 'url(' + currentImage + ')' }"
      >
        <div class="content">
        <el-row class="content-row">
          <el-col :span="20" :lg="20" :md="16" :sm="16" :xs="24" class="logo">
            <img :src="require('@assets/img/logo_white.svg')" />
          </el-col>
          <el-col
            :span="4"
            :lg="4"
            :md="8"
            :sm="8"
            :xs="24"
            class="room"
          >
            <ul
              class="room-list"
              v-for="(roomItem, roomKey) in roomList"
              :key="roomKey"
            >
              <li
                class="room-item"
                @mouseover="onMouseOver(roomKey)"
                @mouseleave="onMouseLeave(roomKey)"
              >
                <div
                  class="room-item-unactive"
                  v-show="
                    roomItemHover[roomKey] === undefined
                      ? false
                      : !roomItemHover[roomKey].hover
                  "
                >
                  &nbsp;&nbsp;&nbsp;
                </div>
                <div
                  class="room-item-active"
                  v-show="
                    roomItemHover[roomKey] === undefined
                      ? false
                      : roomItemHover[roomKey].hover
                  "
                >
                  －
                </div>
                <router-link
                  :to="{ name: 'RoomDetail', params: { id: roomItem.id } }"
                  >{{ roomItem.name }}</router-link
                >
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row class="content-row">
          <el-col :span="20" :lg="20" :md="16" :sm="16" :xs="24">
            <div class="room-detail-content">
              <span class="room-detail-num">{{ currentRoomNum }}</span>
              <div class="room-detail-dash"></div>
              <span class="room-detail-name">{{ currentRoomName }}</span>
            </div>
          </el-col>
          <el-col :span="4" :lg="4" :md="8" :sm="8" :xs="24">
            <div class="social-content">
              <img
                :src="require('@assets/img/facebook-square-brands.svg')"
                width="20px"
              />
              <img
                :src="require('@assets/img/instagram-brands.svg')"
                width="20px"
              />
            </div>
            <div class="contact-content">
              <ul>
                <li>
                  <img
                    :src="require('@assets/img/phone-alt-solid.svg')"
                    width="20px"
                  />
                  <span>02-17264937</span>
                </li>
                <li>
                  <img
                    :src="require('@assets/img/envelope-solid.svg')"
                    width="20px"
                  />
                  <span>whitespace@whitespace.com.tw</span>
                </li>
                <li>
                  <img
                    :src="require('@assets/img/home-solid.svg')"
                    width="20px"
                  />
                  <span>台北市羅斯福路十段30號</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Main",
  data() {
    return {
      // defaultImage: "",
      currentImage: "",
      currentRoomNum: "",
      currentRoomName: "",
      roomItemHover: []
    };
  },
  computed: {
    roomList() {
      return this.$store.getters.roomList;
    }
  },
  methods: {
    getRoomList() {
      return this.$store.dispatch("getRoomList");
    },
    onMouseOver(roomKey) {
      this.roomItemHover[roomKey].hover = true;
      this.currentImage = this.roomItemHover[roomKey].imageUrl;
      this.currentRoomNum = `0${roomKey + 1}`;
      this.currentRoomName = this.roomItemHover[roomKey].name;
    },
    onMouseLeave(roomKey) {
      this.roomItemHover[roomKey].hover = false;
    }
  },
  created() {
    this.getRoomList().then(() => {
      this.currentImage = this.roomList[3].imageUrl;
      this.currentRoomNum = '04'
      this.currentRoomName = this.roomList[3].name;
      this.roomItemHover = _.map(this.roomList, roomItem => {
        return { ...roomItem, hover: false }
      })
    });


  }
};
</script>
