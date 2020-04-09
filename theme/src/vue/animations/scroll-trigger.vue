<template>
  <div ref="root" class="scroll-trigger">
    <slot></slot>    
  </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import ScrollMagic from 'scrollmagic'
import { scrollController } from '@src/js/scroll-controller'
import { eventBus } from '@src/js/event-bus'
import { useAnimeFade } from './anime-fade'


export default {
  props: {
    hook: {
      type: String,
      default: '0.85'
    }
  },
  setup(props) {
    const root = ref(null)

    const state = reactive({
      scene: null
    })

    const { initAnimation, playAnimation } = useAnimeFade()

    const onEnter = () => {
      playAnimation()
    }

    const onLeave = () => {
      playAnimation(true)
    }

    onMounted(() => {
      console.log(props.hook)

      state.scene = new ScrollMagic.Scene({
        triggerElement: root.value,
        triggerHook: props.hook,
        offset: 0
      })

      state.scene.on('enter', onEnter)
      state.scene.on('leave', onLeave)

      scrollController.addScene(state.scene)

      initAnimation(root.value)
    }) 

    return {
      root,
      state,
      onEnter,
      onLeave
    }
  }
}
</script>

<style>

</style>