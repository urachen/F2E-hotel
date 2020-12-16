import axios from 'axios';

const hotelApi = {
  getRoomList() {
    return axios.get('/rooms');
  },
  getRoomDetail(id) {
    return axios.get(`/room/${id}`);
  },
  bookingRoom(data){
    return axios.post(`/room/${data.id}`,data.axiosData);
  }
};

export default hotelApi;