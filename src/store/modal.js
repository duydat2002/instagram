const modal = {
  namespaced: true,
  state() {
    return {
      logoutModalShow: false,
    };
  },
  getters: {
    logoutModalShow: (state) => state.logoutModalShow,
  },
  mutations: {
    setLogoutModalShow(state, isShow) {
      state.logoutModalShow = isShow;
    },
  },
  actions: {},
};

export default modal;
