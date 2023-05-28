const splashLoading = {
  namespaced: true,
  state() {
    return {
      isLoading: false,
      progress: 0,
    };
  },
  getters: {
    isLoading: (state) => state.isLoading,
    progress: (state) => state.progress,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setProgress(state, progress) {
      // console.log(progress);
      state.progress = progress;
    },
  },
  actions: {},
};

export default splashLoading;
