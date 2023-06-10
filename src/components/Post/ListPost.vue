<template>
  <div class="list-post-container">
    <div class="list-wrapper slider-wrapper">
      <draggable
        class="list-draggable slider-list"
        tag="transition-group"
        :component-data="{
          tag: 'div',
          name: 'flip',
        }"
        v-model="mediasCom"
        v-bind="dragOptions"
      >
        <template #item="{ element: media }">
          <div
            class="image-item slider-item"
            :class="{ active: currentMedia.url == media.url }"
            @mousedown="setCurrentMedia(media)"
          >
            <div
              class="image"
              :style="{ backgroundImage: `url(${media.url})` }"
            ></div>
            <div class="image-delete" @click="handleDeleteMedia(media.url)">
              <fa size="sm" style="color: #fff" :icon="['fas', 'xmark']" />
            </div>
          </div>
        </template>
      </draggable>
      <div class="navigation">
        <div class="navigation-button navigation-prev">
          <fa :icon="['fas', 'circle-chevron-left']" class="navigation-icon" />
        </div>
        <div class="navigation-button navigation-next">
          <fa :icon="['fas', 'circle-chevron-right']" class="navigation-icon" />
        </div>
      </div>
    </div>
    <div class="add-image" @click="handleAddMedia">
      <fa size="xl" style="color: #fff" :icon="['fas', 'plus']" />
    </div>
  </div>
  <input
    ref="inputFiles"
    accept="image/*, video/*"
    type="file"
    style="display: none"
    multiple
    @change="getInputFiles($event)"
  />
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapMutations } from "vuex";

import { useSlider } from "@/composables/useSlider";
const { initSlider, reset } = useSlider();

export default {
  data() {
    return {
      dragOptions: {
        animation: 200,

        ghostClass: "ghost", // Class name for the drop placeholder
        chosenClass: "chosen", // Class name for the chosen item
        dragClass: "drag", // Class name for the dragging item
      },
    };
  },
  computed: {
    ...mapGetters("createPost", ["medias", "currentMedia"]),
    mediasCom: {
      get() {
        return this.medias;
      },
      set(value) {
        this.setMedias(value);
      },
    },
  },
  methods: {
    ...mapMutations("createPost", ["setMedias", "addMedia", "setCurrentMedia"]),
    handleAddMedia() {
      this.$refs.inputFiles.click();
    },
    getInputFiles(event) {
      const files = event.target.files;
      for (let file of files) {
        const url = URL.createObjectURL(file);
        const media = {
          url,
          translate: {
            x: null,
            y: null,
          },
          scale: 1,
          filters: null,
        };
        this.addMedia(media);
      }

      reset();
      event.target.value = "";
    },
    handleDeleteMedia(url) {
      const newMedias = this.medias.filter((media) => {
        return media.url !== url;
      });

      this.setMedias(newMedias);
      this.setCurrentMedia(newMedias[0]);

      reset();
    },
  },
  components: {
    draggable,
  },
  mounted() {
    initSlider(".list-post-container", {
      step: 2,
      navigation: {
        prevEl: ".navigation-prev",
        nextEl: ".navigation-next",
      },
    });
  },
};
</script>

<style scoped>
.list-post-container {
  padding: 8px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 8px;
  height: 118px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
  margin: 0 16px;
  width: 100%;
  max-width: 374px;
}

.list-wrapper {
  position: relative;
  display: flex;
  margin-right: 12px;
  flex-grow: 1;
  overflow: hidden;
}

.list-draggable {
  display: flex;
  align-items: center;
  transition: 0.2s;
}

.image-item {
  position: relative;
  cursor: pointer;
  padding: 0 6px;
}

.image-item .image {
  width: 94px;
  height: 94px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.image-item .image-delete {
  position: absolute;
  top: 5px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.image-item.active .image-delete {
  display: flex;
}

.image-item .image-delete:hover {
  opacity: 0.6;
}

.add-image {
  width: 48px;
  height: 48px;
  border: solid 1px var(--separator-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
}

.flip-move {
  transition: all 0.5s ease;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0;
}

.navigation-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
}

.navigation-button svg {
  color: #fff;
  fill: #fff;
}

.navigation-button.swiper-button-disabled {
  display: none;
}

.navigation-prev {
  left: 0;
}
.navigation-next {
  right: 0;
}

.navigation-icon {
  font-size: 23px;
}
</style>
