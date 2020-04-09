<template>
  <div class="sticky-sidebar w-full h-0 relative">
  <div class="absolute left-0 top-0">
    
    <ul ref="pin" :class="{ 'is-pinned': isPinned, 'is-faded': isFaded }" class="flex pt-1/48 small">
      <li class="mx-1 mb-1">Contact</li>
      <li class="mx-1 mb-1">Process</li>
      <li class="mx-1 mb-1">Tijdlijn</li>
      <li class="mx-4 mb-1">Het Plan</li>
      <li class="mx-4 mb-1">
        <a href="#section-location">
        Locatie
        </a>
        </li>
      <li class="mx-4 mb-1">
        Aanbieding
        </li>
    </ul>

  </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic'
import {scrollController} from '@src/js/scroll-controller.js'
import zenscroll from 'zenscroll'

export default {
  data() {
    return {
      message: 'Hello World',
      isFaded: false,
      isPinned: false
    }
  },
  methods: {
    pin() {
      this.isPinned = true
    },
    unpin() {
      this.isPinned = false
    },
    fade() {
      this.isFaded = true
    },
    unfade() {
      this.isFaded = false
    }
  },
  mounted() {
    let pinTrigger = this.$el
    let fadeTrigger = document.querySelector('.fade-sticky-sidebar')
    let unfadeTrigger = document.querySelector('.unfade-sticky-sidebar')

    let pinScene = new ScrollMagic.Scene({
      triggerElement: pinTrigger,
      triggerHook: 0.00001
    })

    pinScene.on('enter', this.pin)
    pinScene.on('leave', this.unpin)
	  pinScene.addTo(scrollController)

    if (fadeTrigger) {
      let fadeScene = new ScrollMagic.Scene({
        triggerElement: fadeTrigger,
        triggerHook: 0.00001
      })

      fadeScene.on('enter', this.fade)
      fadeScene.on('leave', this.unfade)
      fadeScene.addTo(scrollController)
    }

    if (unfadeTrigger) {
      let unfadeScene = new ScrollMagic.Scene({
        triggerElement: unfadeTrigger,
        triggerHook: 0.00001
      })

      unfadeScene.on('enter', this.unfade)
      unfadeScene.on('leave', this.fade)
      unfadeScene.addTo(scrollController)
    }
  }
}
</script>

<style lang="pcss" scoped>
ul {
  @apply top-0 left-0 relative transition-opacity duration-short;
  transform: rotate(-90deg) translateY(100%) translateX(-100%);
  transform-origin: bottom left;
  z-index: -1;
}

ul.is-pinned {
  position: fixed;
}

ul.is-faded {
  opacity: 0;
}
</style>
