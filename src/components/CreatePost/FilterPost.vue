<template>
  <div class="filter-post">
    <div class="tab-names flex">
      <div
        :class="['tab-name', { active: filterTab == 'Filter' }]"
        @click="filterTab = 'Filter'"
      >
        Bộ Lọc
      </div>
      <div
        :class="['tab-name', { active: filterTab == 'Adjust' }]"
        @click="filterTab = 'Adjust'"
      >
        Điều Chỉnh
      </div>
    </div>
    <div class="tab-contents">
      <div v-if="filterTab == 'Filter'" class="tab-filter flex">
        <div
          v-for="filterTemplate in filterTemplates"
          :key="filterTemplate.name"
          class="col-4"
        >
          <div
            class="filter-item flex"
            :class="{ active: curentFilterTemplate == filterTemplate.name }"
            @click="chooseTemplate(filterTemplate)"
          >
            <div class="item-image">
              <img
                :src="
                  require(`@/assets/images/Filter${filterTemplate.name}.jpg`)
                "
                alt="FilterNormal"
              />
            </div>
            <span class="item-name">{{ filterTemplate.name }}</span>
          </div>
        </div>
      </div>
      <div v-else class="tab-adjust flex flex-col">
        <adjust-input title="Độ sáng" v-model:value="adjust.brightness" />
        <adjust-input title="Độ tương phản" v-model:value="adjust.contrast" />
        <adjust-input title="Độ bão hòa" v-model:value="adjust.saturate" />
        <adjust-input title="Nhiệt độ" v-model:value="adjust.temperature" />
        <adjust-input title="Độ mờ" min="0" v-model:value="adjust.blur" />
        <adjust-input
          title="Làm mờ viền"
          min="0"
          v-model:value="adjust.blurBorder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdjustInput from "@/components/CreatePost/AdjustInput.vue";

import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      filterTab: "Filter",
      filterTemplates: [
        {
          name: "Normal",
          filter: {},
        },
        {
          name: "Clarendon",
          filter: {
            contrast: 1.2,
            saturate: 1.35,
          },
        },
        {
          name: "Gingham",
          filter: {
            "hue-rotate": -10,
            brightness: 1.05,
          },
        },
        {
          name: "Moon",
          filter: {
            brightness: 1.1,
            contrast: 1.1,
            grayscale: 1,
          },
        },
        {
          name: "Lark",
          filter: {
            contrast: 0.9,
          },
        },
        {
          name: "Reyes",
          filter: {
            sepia: 0.22,
            contrast: 0.85,
            brightness: 1.1,
            saturate: 0.75,
          },
        },
        {
          name: "Juno",
          filter: {
            contrast: 1.2,
            brightness: 1.1,
            saturate: 1.4,
            sepia: 0.2,
            "hue-rotate": -10,
          },
        },
        {
          name: "Slumber",
          filter: {
            brightness: 1.05,
            saturate: 0.66,
          },
        },
        {
          name: "Crema",
          filter: {},
        },
        {
          name: "Ludwig",
          filter: {},
        },
        {
          name: "Aden",
          filter: {
            "hue-rotate": -20,
            contrast: 0.9,
            brightness: 1.2,
            saturate: 0.85,
          },
        },
        {
          name: "Perpetua",
          filter: {},
        },
      ],
      curentFilterTemplate: "Normal",
      defaultFilter: {
        brightness: 1,
        contrast: 1,
        saturate: 1,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        "hue-rotate": 0,
        temperature: 0,
        blurBorder: 0,
      },
      filterTemplate: {
        brightness: 1,
        contrast: 1,
        saturate: 1,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        "hue-rotate": 0,
        temperature: 0,
        blurBorder: 0,
      },
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
    };
  },
  computed: {
    ...mapGetters("createPost", [
      "filter",
      "currentMedia",
      "currentMediaIndex",
    ]),
  },
  methods: {
    ...mapMutations("createPost", ["setFilter", "updateMedia"]),
    convertToFilter(adjust) {
      //Filter
      const adjustOptions = [
        {
          name: "brightness",
          divid: 200,
        },
        {
          name: "contrast",
          divid: 300,
        },
        {
          name: "saturate",
          divid: 200,
        },
        {
          name: "blur",
          divid: 50,
          unit: "px",
        },
        {
          name: "grayscale",
          divid: 1,
        },
        {
          name: "sepia",
          divid: 1,
        },
        {
          name: "hue-rotate",
          divid: 1,
          unit: "deg",
        },
      ];

      const filter = adjustOptions.map((adjustOption) => {
        return `${adjustOption.name}(${
          parseFloat(this.filterTemplate[adjustOption.name]) +
          parseFloat(adjust[adjustOption.name] / adjustOption.divid)
        }${adjustOption.unit ? adjustOption.unit : ""})`;
      });

      //Background cover
      //255-200-0-0.1 Cold
      //0-110-255-0.1 Hot
      let backgroundValues = [];
      if (adjust.temperature >= 0) {
        backgroundValues.push(`rgba(255,200,0,${adjust.temperature / 1000})`);
      } else {
        backgroundValues.push(`rgba(0,110,255,${-adjust.temperature / 1000})`);
      }

      //Blur Border
      //radial-gradient(circle at center, transparent 50%, rgba(0,0,0,1) 140%)
      backgroundValues.push(
        `radial-gradient(circle at center, transparent 50%, rgba(0,0,0,${
          adjust.blurBorder / 100
        }) 140%)`
      );

      const filters = {
        background: backgroundValues.join(" "),
        filter: filter.join(" "),
      };

      this.setFilter(filters);

      const media = {
        ...this.currentMedia,
        filters,
        adjust,
        filterTemplate: {
          name: this.curentFilterTemplate,
          filter: this.filterTemplate,
        },
      };

      this.updateMedia({ index: this.currentMediaIndex, newMedia: media });
    },
    chooseTemplate(filterTemplate) {
      this.filterTemplate = {
        ...this.defaultFilter,
      };

      this.filterTemplate = {
        ...this.filterTemplate,
        ...filterTemplate.filter,
      };
      this.curentFilterTemplate = filterTemplate.name;
      this.convertToFilter(this.adjust);
    },
  },
  watch: {
    adjust: {
      handler(newAdjust) {
        this.convertToFilter(newAdjust);
      },
      deep: true,
    },
    currentMedia(newMedia) {
      this.curentFilterTemplate = newMedia.filterTemplate.name
        ? newMedia.filterTemplate.name
        : "Normal";

      this.filterTemplate = {
        ...this.defaultFilter,
        ...newMedia.filterTemplate.filter,
      };
      this.adjust = newMedia.adjust;
    },
  },
  components: { AdjustInput },
};
</script>

<style scoped>
.filter-post {
  width: 340px;
  height: 100%;
  overflow-y: scroll;
}

.tab-name {
  font-size: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1;
  color: var(--link-color);
  border-bottom: 1px solid var(--primary-text-color);
  opacity: 0.3;
  cursor: pointer;
  transition: 0.25s ease-in-out;
}

.tab-name.active {
  opacity: 1;
  font-weight: 600;
}

.tab-contents {
  margin: 0 8px;
}

.tab-filter {
  margin-bottom: 12px;
}

.filter-item {
  margin: 16px 8px 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.item-image {
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
  border: 2px solid transparent;
}

.filter-item.active .item-image {
  border-color: var(--primary-button-color);
}

.item-name {
  font-size: 12px;
  color: var(--secondary-text-color);
}

.filter-item.active .item-name {
  color: var(--link-color);
  font-weight: 600;
}

.tab-adjust {
  margin: 0 8px 16px;
}
</style>
