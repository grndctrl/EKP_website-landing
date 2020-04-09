import { ref, reactive, onMounted } from '@vue/composition-api'
import anime from 'animejs'

export function useAnimeFade() {
  const state = reactive({ element: null })

  const initAnimation = (element) => {
    state.element = element
    anime.set(state.element, { opacity: 0, translateY: '100px' })
  }

  const playAnimation = (reverse = false) => {
    let properties = {
      opacity: [0, 1],
      translateY: ['100px', 0]
    }

    if (reverse) {
      Object.keys(properties).forEach((key) => {
        properties[key].reverse()
      })
    }

    anime({
      targets: state.element,
      easing: 'easeOutSine',
      duration: 400,
      delay: 0,
      opacity: properties.opacity,
      translateY: properties.translateY,
      complete: () => {
        state.element.classList.add('anime-complete')
      }
    })
  }

  return {
    initAnimation, 
    playAnimation
  }
}