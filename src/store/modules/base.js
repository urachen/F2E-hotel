
const initialState = {
    showLoading: false,
    showSuccess: false,
    showError: false,
    successInfo: '',
    errorInfo: ''
  };
  
  const state = {
    ...initialState,
    initialState() {
      return initialState;
    }
  };
  
  const mutations = {
    updateShowLoading(state, showLoading) {
      state.showLoading = showLoading;
    },
    updateShowSuccess(state, showSuccess) {
      state.showSuccess = showSuccess;
    },
    updateShowError(state, showError) {
      state.showError = showError;
    },
    updateSuccessInfo(state, successInfo) {
      state.successInfo = successInfo;
    },
    updateErrorInfo(state, errorInfo) {
      state.errorInfo = errorInfo;
    }
  };
  
  const getters = {
    showLoading: state => state.showLoading,
    showSuccess: state => state.showSuccess,
    showError: state => state.showError,
    successInfo: state => state.successInfo,
    errorInfo: state => state.errorInfo
  };
  
  const actions = {
    showAlert({
      commit
    }, param) {
      if (param.status === 'success'){
        commit('updateShowSuccess', true);
        commit('updateSuccessInfo', param.msg);
      }
      if (param.status === 'error'){
        commit('updateShowError', true);
        commit('updateErrorInfo', param.msg);
      }
  
    },
  };
  export default {
    state,
    getters,
    mutations,
    actions
  };