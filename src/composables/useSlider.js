import { ref, watch, onBeforeUnmount } from "vue";

export const useSlider = () => {
  let sliderContainer = null;
  let sliderOptions = {
    wrapperEl: ".slider-wrapper",
    listContainerEl: ".slider-list",
    itemEl: ".slider-item",
    step: 1,
    navigation: {
      prevEl: ".slider-prev",
      nextEl: ".slider-next",
    },
  };

  let wrapper = null;
  let listContainer = null;
  let wrapperWidth = 0;
  let listWidth = 0;
  let itemWidth = 0;
  let nextEl = null;
  let prevEl = null;

  const isStart = ref(true);
  const isEnd = ref(false);
  const currentIndex = ref(0);
  const translateX = ref(0);

  const prev = () => {
    if (!isStart.value) {
      if (currentIndex.value > 0) {
        currentIndex.value--;
        translateX.value = sliderOptions.step * currentIndex.value * itemWidth;
      } else {
        translateX.value = 0;
      }
    }
  };

  const next = () => {
    if (!isEnd.value) {
      if (
        translateX.value + sliderOptions.step * itemWidth <
        listWidth - wrapperWidth
      ) {
        currentIndex.value++;
        translateX.value = sliderOptions.step * currentIndex.value * itemWidth;
      } else {
        translateX.value = listWidth - wrapperWidth;
      }
    }
  };

  const checkStartEnd = (translateX) => {
    if (translateX == 0) {
      isStart.value = true;
      prevEl?.classList.add("slider-button-disable");
    } else {
      isStart.value = false;
      prevEl?.classList.remove("slider-button-disable");
    }

    if (
      translateX == listWidth - wrapperWidth ||
      listWidth - wrapperWidth == 0
    ) {
      isEnd.value = true;
      nextEl?.classList.add("slider-button-disable");
    } else {
      isEnd.value = false;
      nextEl?.classList.remove("slider-button-disable");
    }
  };

  watch(translateX, (newX) => {
    checkStartEnd(newX);
    listContainer.style.transform = `translateX(-${translateX.value}px)`;
  });

  const reset = () => {
    console.log("reset");
    currentIndex.value = 0;
    translateX.value = 0;
    initElement();
  };

  const initSlider = (sliderEl, options) => {
    sliderContainer = document.querySelector(sliderEl);

    if (sliderContainer) {
      sliderOptions = { ...sliderOptions, ...options };

      initElement();
    } else {
      console.log("Không tìm thấy slider");
    }
  };

  const initElement = () => {
    wrapper = sliderContainer.querySelector(sliderOptions.wrapperEl);
    listContainer = sliderContainer.querySelector(
      sliderOptions.listContainerEl
    );
    itemWidth = sliderContainer.querySelector(sliderOptions.itemEl).offsetWidth;
    wrapperWidth = wrapper.offsetWidth;
    listWidth = listContainer.offsetWidth;

    prevEl = sliderContainer.querySelector(sliderOptions.navigation.prevEl);
    nextEl = sliderContainer.querySelector(sliderOptions.navigation.nextEl);

    checkStartEnd(translateX.value);

    if (prevEl || nextEl) {
      initNavigation();
    }
  };

  const initNavigation = () => {
    prevEl?.addEventListener("click", prev);
    nextEl?.addEventListener("click", next);

    onBeforeUnmount(() => {
      prevEl?.removeEventListener("click", prev);
      nextEl?.removeEventListener("click", next);
    });
  };

  return {
    initSlider,
    reset,
    next,
    prev,
    currentIndex,
    translateX,
    isStart,
    isEnd,
  };
};
