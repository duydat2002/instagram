const theme = {
  namespaced: true,
  state() {
    return {
      theme: "light",
    };
  },
  getters: {
    theme: (state) => state.theme,
  },
  mutations: {
    setTheme(state, theme) {
      localStorage.setItem("theme", theme);
      state.theme = theme;
      document.documentElement.className = theme;
    },
  },
  actions: {},
};

export default theme;
