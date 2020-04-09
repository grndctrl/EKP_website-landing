<template>
    <div class="nav-overlay" :class="{'is-active':isActive}" ref="navoverlay">
      <slot></slot>
    </div>
</template>

<script>
import { eventBus } from '@src/js/event-bus'

export default {
  data() {
    return {
      isActive: false,
      lastScrollY: 0
    }
  },
  methods: {
    toggle() {
      this.isActive ? this.hide() : this.show()
    },
    show() {
      this.lastScrollY = window.scrollY
      this.$root.$refs.burger.classList.add('is-active')
      document.body.classList.add('is-nav-active')
      this.isActive = true
    },
    hide() {
      this.$root.$refs.burger.classList.remove('is-active')
      document.body.classList.remove('is-nav-active')
      this.isActive = false
      window.scroll(0, this.lastScrollY)
    }
  },
  mounted() {
    eventBus.$on('nav-toggle', this.toggle)
    eventBus.$on('nav-hide', this.hide)
  }
}
</script>

<style lang="css" scoped>
</style>
