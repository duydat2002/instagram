const loading = {
  namespaced: true,
  state() {
    return {
      isLoading: true,
    };
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    start({ commit }) {
      commit("setIsLoading", true);
    },
    stop({ commit }) {
      commit("setIsLoading", false);
    },
  },
};

export default loading;
