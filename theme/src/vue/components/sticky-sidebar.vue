<template>
  <div class="sticky-sidebar w-full h-0 relative">
  <div class="absolute left-0 top-0">
    
    <ul ref="pin" :class="{ 'is-pinned': isPinned, 'is-faded': isFaded }" class="flex pt-1/48 small">
      <li class="mx-4 pt-0p5 lg:pt-1">
        <a href="#section-contact" :class="{'active': currIndex == 5}">
          Contact
        </a>
      </li>
      <li class="mx-4 pt-0p5 lg:pt-1">
        <a href="#section-process" :class="{'active': currIndex == 4}">
          Proces
        </a>
      </li>
      <li class="mx-4 pt-0p5 lg:pt-1">
        <a href="#section-timeline" :class="{'active': currIndex == 3}">
          Tijdlijn
        </a>
      </li>
      <li class="mx-4 pt-0p5 lg:pt-1">
        <a href="#section-plan" :class="{'active': currIndex == 2}">
          Het Plan
        </a>
      </li>
      <li class="mx-4 pt-0p5 lg:pt-1">
        <a href="#section-location" :class="{'active': currIndex == 1}">
          Locatie
        </a>
        </li>
      <li class="mx-4 pt-0p5 lg:pt-1">
        <a href="#top" :class="{'active': currIndex == 0}">
          Aanbieding
        </a>
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
      isPinned: false,
      triggers: [],
      currIndex: 0
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
    },
    activate(trigger) {
      let index = this.triggers.findIndex(t => trigger.getAttribute('id') == t.getAttribute('id'))
      this.currIndex = index
    },
    deactivate(trigger) {
      let index = this.triggers.findIndex(t => trigger.getAttribute('id') == t.getAttribute('id'))
      
      if (index > 0) {
        this.currIndex = index - 1
      } else {
        this.currIndex = 0
      }
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

    let aanbieding = document.querySelector('#top')
    let locatie = document.querySelector('#section-location')
    let plan = document.querySelector('#section-plan')
    let tijdlijn = document.querySelector('#section-timeline')
    let proces = document.querySelector('#section-process')
    let contact = document.querySelector('#section-contact')

    this.triggers.push(aanbieding)
    this.triggers.push(locatie)
    this.triggers.push(plan)
    this.triggers.push(tijdlijn)
    this.triggers.push(proces)
    this.triggers.push(contact)

    let self = this
    this.triggers.forEach(trigger => {
      let scene = new ScrollMagic.Scene({
        triggerElement: trigger,
        triggerHook: 0.5
      })
      
      scene.on('start', (event) => {
        if (event.scrollDirection == 'FORWARD') {
          self.activate(trigger)
        } else {
          self.deactivate(trigger)
        }
      })

      scene.addTo(scrollController)
    })
  }
}
</script>

<style lang="pcss" scoped>
ul {
  @apply top-0 left-0 relative transition-opacity duration-short;
  transform: rotate(-90deg) translateY(100%) translateX(-100%);
  transform-origin: bottom left;
  z-index: +1;
}

ul.is-pinned {
  position: fixed;
}

ul.is-faded {
  opacity: 0;
}

li a {
  @apply text-primary;
  transition: color 200ms ease;
}

li a.active {
  @apply text-black;
}
</style>
