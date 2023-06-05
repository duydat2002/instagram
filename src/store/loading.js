const loading = {
  namespaced: true,
  state() {
    return {
      isLoading: true,
      isLoadingOnReload: false,
    };
  },
  getters: {
    isLoading: (state) => state.isLoading,
    isLoadingOnReload: (state) => state.isLoadingOnReload,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setIsLoadingOnReload(state, isLoadingOnReload) {
      state.isLoadingOnReload = isLoadingOnReload;
    },
  },
  actions: {
    startLoading({ commit }) {
      commit("setIsLoading", true);
    },
    stopLoading({ commit }) {
      commit("setIsLoading", false);
    },
  },
};

export default loading;
