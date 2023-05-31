const modal = {
  namespaced: true,
  state() {
    return {
      activeOverlay: false,
      scrollPosition: 0,
      logoutModalShow: false,
    };
  },
  getters: {
    activeOverlay: (state) => state.activeOverlay,
    scrollPosition: (state) => state.scrollPosition,
    logoutModalShow: (state) => state.logoutModalShow,
  },
  mutations: {
    setActiveOverlay(state, isActive) {
      state.activeOverlay = isActive;
    },
    setScrollPosition(state, position) {
      state.scrollPosition = position;
    },
    setLogoutModalShow(state, isShow) {
      state.logoutModalShow = isShow;
      state.activeOverlay = isShow;
    },
  },
  actions: {},
};

export default modal;
