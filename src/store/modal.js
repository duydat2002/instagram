const modal = {
  namespaced: true,
  state() {
    return {
      stopScroll: false,
      scrollPosition: 0,
      logoutModalShow: false,
      modalCreatePostShow: false,
      removeMediaPopupShow: false,
      removePostPopupShow: false,
    };
  },
  getters: {
    stopScroll: (state) => state.stopScroll,
    scrollPosition: (state) => state.scrollPosition,
    logoutModalShow: (state) => state.logoutModalShow,
    modalCreatePostShow: (state) => state.modalCreatePostShow,
    removeMediaPopupShow: (state) => state.removeMediaPopupShow,
    removePostPopupShow: (state) => state.removePostPopupShow,
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
    setModalCreatePostShow(state, isShow) {
      state.modalCreatePostShow = isShow;
      state.stopScroll = isShow;
    },
    setRemoveMediaPopupShow(state, isShow) {
      state.removeMediaPopupShow = isShow;
    },
    setRemovePostPopupShow(state, isShow) {
      state.removePostPopupShow = isShow;
    },
  },
  actions: {},
};

export default modal;
