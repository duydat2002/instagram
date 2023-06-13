const createPost = {
  namespaced: true,
  state() {
    return {
      tabs: ["UploadPost", "EditorPost", "FilterPost", "CaptionPost"],
      currentTab: "UploadPost",
      medias: [],
      currentMedia: null,
      currentRatio: "1:1",
      filter: "none",
    };
  },
  getters: {
    tabs: (state) => state.tabs,
    currentTab: (state) => state.currentTab,
    medias: (state) => state.medias,
    currentMedia: (state) => state.currentMedia,
    currentRatio: (state) => state.currentRatio,
    filter: (state) => state.filter,
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
      if (index != -1) {
        state.medias.splice(index, 1, newMedia);
        state.currentMedia = newMedia;
      }
    },
    setCurrentMedia(state, currentMedia) {
      state.currentMedia = currentMedia;
    },
    setCurrentRatio(state, currentRatio) {
      state.currentRatio = currentRatio;
    },
    setFilter(state, filter) {
      state.filter = filter;
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
