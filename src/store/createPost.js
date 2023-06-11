const createPost = {
  namespaced: true,
  state() {
    return {
      tabs: ["InitFiles", "CropFiles", "EditFiles", "PostFiles"],
      currentTab: "InitFiles",
      medias: [],
      currentMedia: null,
    };
  },
  getters: {
    tabs: (state) => state.tabs,
    currentTab: (state) => state.currentTab,
    medias: (state) => state.medias,
    currentMedia: (state) => state.currentMedia,
  },
  mutations: {
    setCurrentTab(state, tabName) {
      state.currentTab = tabName;
    },
    setMedias(state, medias) {
      state.medias = medias;
    },
    addMedia(state, media) {
      state.medias.push(media);
    },
    updateMedia(state, payload) {
      const { index, newMedia } = payload;
      state.medias.splice(index, 1, newMedia);
    },
    setCurrentMedia(state, currentMedia) {
      state.currentMedia = currentMedia;
    },
  },
  actions: {
    nextTab({ getters, commit }) {
      const tabs = getters.tabs;
      const currentTab = getters.currentTab;
      const currentIndex = tabs.indexOf(currentTab);
      if (currentIndex < tabs.length - 1) {
        commit("setCurrentTab", tabs[currentIndex + 1]);
      }
    },
    prevTab({ getters, commit }) {
      const tabs = getters.tabs;
      const currentTab = getters.currentTab;
      const currentIndex = tabs.indexOf(currentTab);
      if (currentIndex > 0) {
        commit("setCurrentTab", tabs[currentIndex - 1]);
      }
    },
    nextMedia({ getters, commit }) {
      const medias = getters.medias;
      const currentMedia = getters.currentMedia;
      const currentIndex = medias.findIndex((media) => {
        return media.url == currentMedia.url;
      });
      if (currentIndex < medias.length - 1) {
        commit("setCurrentMedia", medias[currentIndex + 1]);
      }
    },
    prevMedia({ getters, commit }) {
      const medias = getters.medias;
      const currentMedia = getters.currentMedia;
      const currentIndex = medias.findIndex((media) => {
        return media.url == currentMedia.url;
      });
      if (currentIndex > 0) {
        commit("setCurrentMedia", medias[currentIndex - 1]);
      }
    },
  },
};

export default createPost;
