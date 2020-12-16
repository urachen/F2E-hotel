import api from "@apis/ApiHotel";

const initialState = {
  roomList: [],
  roomDetail:{}
};

const state = {
  ...initialState,
  initialState() {
    return initialState;
  }
};

const mutations = {
  setRoomList(state, roomList) {
    state.roomList = roomList;
  },
  setRoomDetail(state,roomDetail){
    state.roomDetail = roomDetail
  }
};

const getters = {
  roomList: state => state.roomList,
  roomDetail: state => state.roomDetail
};

const actions = {
  getRoomList({ commit, dispatch }) {
    commit('updateShowLoading', true);
    return new Promise((resolve) => {
      api.getRoomList()
        .then(response => {
          commit("setRoomList",response.items);
          commit('updateShowLoading', false);
          resolve();
        })
        .catch(error => {
          commit('updateShowLoading', false);
          console.log(error);
          resolve();
        });
    });
  },
  getRoomDetail({ commit, dispatch },id) {
    commit('updateShowLoading', true);
    return new Promise((resolve) => {
      api.getRoomDetail(id)
        .then(response => {
          commit("setRoomDetail",response.room[0]);
          commit('updateShowLoading', false);
          resolve();
        })
        .catch(error => {
          commit('updateShowLoading', false);
          console.log(error);
          resolve();
        });
    });
  },
  bookingRoom({commit,dispatch},data){
    commit('updateShowLoading', true);
    return new Promise((resolve) => {
      api.bookingRoom(data)
        .then(response => {
          commit('updateShowLoading', false);
          resolve();
        })
        .catch(error => {
          commit('updateShowLoading', false);
          console.log(error);
          resolve();
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
