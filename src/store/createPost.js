import { getImage, drawInitCanvas } from "@/utils";

const createPost = {
  namespaced: true,
  state() {
    return {
      tabs: ["UploadPost", "EditorPost", "FilterPost", "CaptionPost"],
      currentTab: "UploadPost",
      medias: [],
      currentMedia: null,
      currentMediaIndex: 0,
      currentRatio: "1:1",
      containerSize: {},
      filter: {},
      caption: "",
    };
  },
  getters: {
    tabs: (state) => state.tabs,
    currentTab: (state) => state.currentTab,
    medias: (state) => state.medias,
    currentMedia: (state) => state.currentMedia,
    currentMediaIndex: (state) => state.currentMediaIndex,
    currentRatio: (state) => state.currentRatio,
    containerSize: (state) => state.containerSize,
    filter: (state) => state.filter,
    caption: (state) => state.caption,
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
    deleteMedia(state, mediaIndex) {
      state.medias.splice(mediaIndex, 1);
      state.currentMedia = state.medias[0];
    },
    setCurrentMedia(state, currentMedia) {
      state.currentMedia = currentMedia;
      state.currentMediaIndex = state.medias.findIndex((media) => {
        return media.url == state.currentMedia.url;
      });
    },
    setCurrentRatio(state, currentRatio) {
      state.currentRatio = currentRatio;
    },
    setContainerSize(state, containerSize) {
      state.containerSize = containerSize;
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    setCaption(state, caption) {
      state.caption = caption;
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
    uploadMedias({ getters, commit, dispatch }, files) {
      const medias = [];
      const promises = [];

      for (let file of files) {
        const url = URL.createObjectURL(file);

        const promise = getImage(url).then((img) => {
          const canvas = document.createElement("canvas");

          console.log("getters.containerSize", getters.containerSize);
          drawInitCanvas(canvas, img, getters.containerSize);

          const media = {
            url,
            image: img,
            canvas,
            size: {
              width: img.width,
              height: img.height,
            },
            translate: {
              x: 0,
              y: 0,
            },
            scale: 1,
            filters: {},
            adjust: {
              brightness: 0,
              contrast: 0,
              saturate: 0,
              blur: 0,
              grayscale: 0,
              sepia: 0,
              "hue-rotate": 0,
              temperature: 0,
              blurBorder: 0,
            },
            filterTemplate: {},
          };
          medias.push(media);
        });

        promises.push(promise);
      }

      return Promise.all(promises).then(() => {
        commit("setMedias", medias);
        commit("setCurrentMedia", medias[0]);
        dispatch("nextTab");
      });
    },
    addMedias({ getters, commit }, files) {
      const promises = [];

      for (let file of files) {
        const url = URL.createObjectURL(file);

        const promise = getImage(url).then((img) => {
          const canvas = document.createElement("canvas");

          drawInitCanvas(canvas, img, getters.containerSize);

          const media = {
            url,
            image: img,
            canvas,
            size: {
              width: img.width,
              height: img.height,
            },
            translate: {
              x: 0,
              y: 0,
            },
            scale: 1,
            filters: {},
            adjust: {
              brightness: 0,
              contrast: 0,
              saturate: 0,
              blur: 0,
              grayscale: 0,
              sepia: 0,
              "hue-rotate": 0,
              temperature: 0,
              blurBorder: 0,
            },
            filterTemplate: {},
          };
          commit("addMedia", media);
        });

        promises.push(promise);
      }

      return Promise.all(promises);
    },
    resetCreatePost({ commit }) {
      commit("setCurrentTab", "UploadPost");
      commit("setMedias", []);
      commit("setCurrentMedia", null);
      commit("setCurrentRatio", "1:1");
      commit("setFilter", {});
    },
  },
};

export default createPost;
