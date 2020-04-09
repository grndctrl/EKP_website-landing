<template>
    <img
      class="lazy-image"
      ref="lazy-image"
    />
</template>

<script>
import lozad from "lozad"

export default {
  name: "lazy-image",
  props: {
    height: {
      type: Number,
      default: null
    },
    preloadSrc: {
      type: String,
      default: null
    },
    lazySrc: {
      type: String,
      default: null
    },
    lazySrcset: {
      type: String,
      default: null
    },
    sizes: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "landscape"
    },
    ratio: {
      type: String,
      default: "original"
    }
  },
  data() {
    return {
      isLoading: true,
      color: this.backgroundColor
    };
  },
  computed: {
    style() {
      const style = { backgroundColor: this.color };

      return style;
    }
  },
  mounted() {
    const setLoadingState = () => {
      this.isLoading = false;
    };

    const observer = lozad(this.$refs["lazy-image"], {});
    observer.observe();
  }
};
</script>

<style lang="pcss" scoped>

</style>
