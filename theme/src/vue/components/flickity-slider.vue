<template>
  <div
    class="flickity-wrapper"
    ref="wrapper"
  >
    <div class="flickity-container">
      <slot></slot>
    </div>

    <slot name="navigation"></slot>

    <div v-if="!isPlan" class="flickity-footer flex w-full justify-between subtext">
      <div class="flickity-slide-description">{{ description }}</div>
      <div class="flickity-slide-pagination" v-if="slides.length > 1">
        <span class="current">{{ currentSlide }}</span> /
        <span class="total">{{ slides.length }}</span>
      </div>
    </div>

    <div v-if="isPlan" class="flickity-footer plan-footer flex items-center w-full">
      <div class="flickity-prev cursor-pointer pointer-events-auto w-1/24" :class="{ 'is-disabled': currentSlide == 1 }">
        <svg class="fill-current" width="38px" height="33px" viewBox="0 0 38 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Symbols" stroke="none">
              <polygon id="←" fill-rule="nonzero" points="16.08 32.22 18.36 29.94 6.24 17.82 37.56 17.82 37.56 14.46 6.24 14.46 18.42 2.34 16.14 0 0 16.14"></polygon>
          </g>
        </svg>
      </div>
      <div class="spacer w-14/24"></div>
      <div class="flickity-slide-pagination w-2/24" v-if="slides.length > 1">
        <span class="current">{{ currentSlide }}</span> /
        <span class="total">{{ slides.length }}</span>
      </div>
      <div class="spacer w-3/24"></div>
      <div class="flickity-next cursor-pointer pointer-events-auto w-1/24" :class="{ 'is-disabled': currentSlide == slides.length }">
        <svg class="fill-current" width="38px" height="33px" viewBox="0 0 38 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Symbols" stroke="none">
              <polygon id="→" fill-rule="nonzero" points="21.48 32.22 37.56 16.14 21.42 0 19.14 2.34 31.32 14.46 -4.54747351e-13 14.46 -4.54747351e-13 17.82 31.32 17.82 19.2 29.94"></polygon>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import 'flickity-fade/flickity-fade.css'
import 'flickity/css/flickity.css'
import Flickity from 'flickity-fade'
import eventBus from '@src/js/event-bus'

export default {
  data() {
    return {
      slider: null,
      slides: [],
      currentSlide: 0,
      totalSlides: 0,
      description: '',
      cursorElement: null
    }
  },
  props: {
    isPlan: {
      type: Boolean,
      default: false,
    },
    isFullscreen: Boolean
  },
  methods: {
    updateFooter() {
      let index = this.slider.selectedIndex
      this.currentSlide = index + 1
      this.description = this.slides[index].getAttribute('data-slide-description')
    }
  },
  mounted() {
    let prevButton = this.$refs.wrapper.querySelector('.flickity-prev')
    let nextButton = this.$refs.wrapper.querySelector('.flickity-next')
    let footer = this.$refs.wrapper.querySelector('.flickity-footer')

    this.cursorElement = document.querySelector('.custom-cursor')
    
    this.slider = new Flickity(this.$refs.wrapper.querySelector('.flickity-container'), {
      fade: false,
      wrapAround: false,
      prevNextButtons: false,
      pageDots: false
    })

    this.slides = Array.from(this.$refs.wrapper.querySelectorAll('.flickity-slide'))

    this.updateFooter()

    this.slider.on('change', () => {
      this.updateFooter()
    })

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (!prevButton.classList.contains('is-disabled')) {
          this.slider.previous(true)
        }
      })

      let cursorContent = this.$refs.wrapper.querySelector('.flickity-prev-cursor')
      prevButton.addEventListener('mousemove', (event) => {
        this.cursorElement.style.left = event.clientX + 'px'
        this.cursorElement.style.top = event.clientY + 'px'
      })

      prevButton.addEventListener('mouseenter', (event) => {
        this.cursorElement.innerHTML = cursorContent.innerHTML
        document.body.classList.add('has-custom-cursor')
      })

      prevButton.addEventListener('mouseleave', (event) => {
        document.body.classList.remove('has-custom-cursor')
      })
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (!nextButton.classList.contains('is-disabled')) {
          this.slider.next(true)
        }
      })

      let cursorContent = this.$refs.wrapper.querySelector('.flickity-next-cursor')
      nextButton.addEventListener('mousemove', (event) => {
        this.cursorElement.style.left = event.clientX + 'px'
        this.cursorElement.style.top = event.clientY + 'px'
      })

      nextButton.addEventListener('mouseenter', (event) => {
        this.cursorElement.innerHTML = cursorContent.innerHTML
        document.body.classList.add('has-custom-cursor')
      })

      nextButton.addEventListener('mouseleave', (event) => {
        document.body.classList.remove('has-custom-cursor')
      })
    }
  }
}
</script>

<style lang="pcss" scoped>

.flickity-prev,
.flickity-next {
  transition: color 200ms ease;
  &.is-disabled {
    color: #D7D7D2;
  }
}


</style>
