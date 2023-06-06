const modal = {
  namespaced: true,
  state() {
    return {
      stopScroll: false,
      scrollPosition: 0,
      logoutModalShow: false,
    };
  },
  getters: {
    stopScroll: (state) => state.stopScroll,
    scrollPosition: (state) => state.scrollPosition,
    logoutModalShow: (state) => state.logoutModalShow,
  },
  mutations: {
    setStopScroll(state, isActive) {
      state.stopScroll = isActive;
    },
    setScrollPosition(state, position) {
      state.scrollPosition = position;
    },
    setLogoutModalShow(state, isShow) {
      state.logoutModalShow = isShow;
      state.stopScroll = isShow;
    },
  },
  actions: {},
};

export default modal;
