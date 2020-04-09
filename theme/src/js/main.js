import Swup from 'swup'
import { eventBus } from '@src/js/event-bus'
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import { debounce } from 'lodash'

// async import vue components
const NavOverlay = () => import(/* webpackChunkName: "layout" */ '../vue/layout/nav-overlay.vue')
const PageHeader = () => import(/* webpackChunkName: "layout" */ '../vue/layout/page-header.vue')
const PageFooter = () => import(/* webpackChunkName: "layout" */ '../vue/layout/page-footer.vue')
const FlickitySlider = () => import(/* webpackChunkName: "components/flickity-slider" */ '../vue/components/flickity-slider.vue')
const LazyImage = () => import(/* webpackChunkName: "components/lazy-image" */ '../vue/components/lazy-image.vue')
const ScrollTrigger = () => import(/* webpackChunkName: "animations/scroll-trigger" */ '../vue/animations/scroll-trigger.vue')
const Location = () => import(/* webpackChunkName: "components/location" */ '../vue/components/location.vue')
const Accordion = () => import(/* webpackChunkName: "components/accordion" */ '../vue/components/accordion.vue')
const VideoPlayer = () => import(/* webpackChunkName: "components/video-player" */ '../vue/components/video-player.vue')
const StickySidebar = () => import(/* webpackChunkName: "components/sticky-sidebar" */ '../vue/components/sticky-sidebar.vue')
const Styleguide = () => import(/* webpackChunkName: "apps/styleguide" */ '../vue/apps/styleguide.vue')

// configure vue
Vue.use(CompositionApi)

Vue.component('nav-overlay', NavOverlay)
Vue.component('page-header', PageHeader)
Vue.component('page-footer', PageFooter)
Vue.component('flickity-slider', FlickitySlider)
Vue.component('lazy-image', LazyImage)
Vue.component('scroll-trigger', ScrollTrigger)
Vue.component('location', Location)
Vue.component('accordion', Accordion)
Vue.component('video-player', VideoPlayer)
Vue.component('sticky-sidebar', StickySidebar)
Vue.component('styleguide', Styleguide)

//  skip swup if browser is ie
const isIE = /* @cc_on!@ */ false || !!document.documentMode
let swup = null

window.isLayoutLoaded = false
window.isContentLoaded = false

if (!isIE) {
  swup = new Swup({
    containers: ['#content'],
    animationSelector: '[class*="swup-transition-"]',
    plugins: []
  })

  initLayout()
  initSwuppingContent()
} else {
  document.body.classList.add('is-ie')
  initLayout()
  initContent()
}

function initLayout() {
  const layout = new Vue({
    el: '#layout',
    data: {
      eventBus: eventBus,
    },
    mounted() {
      window.addEventListener('resize', debounce(() => {
        console.log('debounced')
        eventBus.$emit('window:resized')
      }, 250))

      this.$nextTick(function () {
        eventBus.$emit('layout:loaded')
        window.isLayoutLoaded = true
      })
    },
    updated() {}
  })
}

function initContent() {
  const content = new Vue({
    el: '#content',
    data: {
      eventBus: eventBus
    },
    mounted() {
      this.$nextTick(function () {
        eventBus.$emit('content:loaded')
        window.isContentLoaded = true
      })
    },
    updated() {}
  })
}

function initSwuppingContent() {
  swup.off()

  const content = new Vue({
    el: '#content',
    data: {
      eventBus: eventBus
    },
    mounted() {
      swup.on('willReplaceContent', () => {
        eventBus.$emit('swup:willReplaceContent')
        this.$destroy()
      })

      this.$nextTick(function () {
        eventBus.$emit('content:loaded')
        window.isContentLoaded = true
      })
    },
    updated() {},
    beforeDestroy() {
      // destroy all instance of other packages
    }
  })

  Vue.nextTick(() => {
    swup.on('contentReplaced', () => {
      eventBus.$emit('swup:contentReplaced')
      initSwuppingContent()
    })
  })
}