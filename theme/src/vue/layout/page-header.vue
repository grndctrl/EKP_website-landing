<template>
  <header class="page-header">
    <slot></slot>
    <div class="container">
      <nav
        class="nav-bar"
        id="nav-bar"
        role="navigation"
      >
        <div class="nav-bar__menu">
          <ul class="menu">
            <li class="menu__item">
              <a
                class="button cursor-pointer"
                target="_blank"
                href="https://account.ekp-denbosch.nl"
              >enquête</a>
            </li>

            <li class="menu__item">
              <a
                class="button cursor-pointer"
                @click="openSurvey"
              >contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { eventBus } from "@src/js/event-bus";
import Headroom from "headroom.js";

export default {
  data() {
    return {
      isPinned: true,
      translateY: "-100vh"
    };
  },
  methods: {
    pin() {
      this.isPinned = true;
    },
    unpin() {
      this.isPinned = false;
    },
    openSurvey() {
      console.log('opensurvey')
      eventBus.$emit('opensurvey')
    }
  },
  mounted() {
    this.translateY = -1 * this.$el.clientHeight + "px";
    this.opacity = 0;

    eventBus.$on("page:loaded", () => {
      setTimeout(() => {
        this.translateY = 0;
        this.opacity = 1;
      }, 400);
    });

    let headroom = new Headroom(this.$el);
    headroom.init();
  }
};
</script>

<style lang="pcss" scoped>
.headroom {
  @apply duration-medium ease-in-out transition-transform;
  will-change: transform;
}
.page-header.headroom--unpinned {
  transform: translateY(-100%);
}
.page-header.headroom--pinned {
  transform: translateY(0);
}
.page-header.headroom--top {
  transform: translateY(0);
}
</style>
