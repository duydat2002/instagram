const createPost = {
  namespaced: true,
  state() {
    return {
      tabs: ["InitFiles", "test", "EditFiles", "PostFiles"],
      currentTab: "InitFiles",
      files: [],
      canvasOptions: {},
      canvasFiles: [],
    };
  },
  getters: {
    tabs: (state) => state.tabs,
    currentTab: (state) => state.currentTab,
    files: (state) => state.files,
    canvasOptions: (state) => state.canvasOptions,
    canvasFiles: (state) => state.canvasFiles,
  },
  mutations: {
    setCurrentTab(state, tabName) {
      state.currentTab = tabName;
    },
    setFiles(state, files) {
      state.files = files;
    },
    setCanvasOptions(state, canvasOptions) {
      state.canvasOptions = canvasOptions;
    },
    setCanvasFiles(state, canvasFiles) {
      state.canvasFiles = canvasFiles;
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
    pushCanvasFile({ getters, commit }, canvasFile) {
      const newFiles = getters.canvasFiles.push(canvasFile);
      commit("setCanvasFiles", newFiles);
    },
  },
};

export default createPost;
