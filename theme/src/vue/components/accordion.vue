<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  data() {
    return {
      isAnimating: false,
      buttons: []
    }
  },
  methods: {
    toggle(event) {
      event.preventDefault()

      let target = event.target.getAttribute('data-target')
      let current = this.$el.querySelector('.accordion-slide.active')
      let slide = this.$el.querySelector('.accordion-slide[data-index="' + target + '"]')

      if (!this.isAnimating) {
        if (slide.classList.contains('active')) {
          this.closeSlide(slide)
        } else {
          if (current) {
            this.closeSlide(current)
          }
          this.openSlide(slide)
        }
      }
    },
    openSlide(element) {
      let wrapper = element.querySelector('.accordion-wrapper')
      let content = wrapper.querySelector('.accordion-content')
      let h = content.scrollHeight + 'px'
      
      this.isAnimating = true
      element.classList.add('active')
      anime({
        targets: wrapper,
        height: [0, h],
        duration: 400,
        easing: 'easeOutCubic',
        complete: () => {
          this.isAnimating = false
        }
      })
    },
    closeSlide(element) {
      let wrapper = element.querySelector('.accordion-wrapper')
      console.log("closeSlide -> wrapper", wrapper)

      this.isAnimating = true
      element.classList.remove('active')
      anime({
          targets: wrapper,
          height: 0,
          duration: 400,
          easing: 'easeOutCubic',
          complete: () => {
            this.isAnimating = false
          }
      })
    }
  },
  mounted() {
    this.buttons = Array.from(this.$el.querySelectorAll('.accordion-button'))
    this.buttons.forEach(button => {
      button.addEventListener('click', this.toggle)
    })
  },
  beforeDestroy() {
    this.buttons.forEach(button => {
      button.removeEventListener('click', this.toggle)
    })
  }
}
</script>

<style lang="pcss" scoped>
.accordion-slide {
  .accordion-wrapper {
    overflow: hidden;
    height: 0;
  }

  .toggle {
    @apply relative;
    width: 22px;
    height: 22px;
    transition: transform 400ms ease;

    span {
      @apply block bg-black absolute top-0 left-0;
      width: 22px;
      height: 1px;
      transform: translateY(11px);
      transition: transform 200ms ease-out;

      &:first-child {
        transform: translateY(11px) rotate(90deg) scaleX(1);
      }
    }
  }

  &.active .toggle {
    transform: rotate(135deg);
  }
}

@screen md {
  .accordion-slide {
    .toggle {
      width: 32px;
      height: 32px;

      span {
        width: 32px;
        transform: translateY(16px);

        &:first-child {
          transform: translateY(16px) rotate(90deg) scaleX(1);
        }
      }
    }
  }
}
</style>