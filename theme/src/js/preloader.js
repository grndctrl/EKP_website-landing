import { eventBus } from "./event-bus"

window.addEventListener('DOMContentLoaded', () => {
  let preloader = document.querySelector('#preloader')
  let isLayoutLoaded = window.isLayoutLoaded || false
  console.log("document.onload -> isLayoutLoaded", isLayoutLoaded)
  let isContentLoaded = window.isContentLoaded || false
  console.log("document.onload -> isContentLoaded", isContentLoaded)

  eventBus.$on('layout:loaded', () => {
    isLayoutLoaded = true
    console.log('preload layout:loaded')
    checkLoadedContent()
  })

  eventBus.$on('content:loaded', () => {
    isContentLoaded = true
    console.log('preload content:loaded')
    checkLoadedContent()
  })

  function checkLoadedContent() {
    if ((isLayoutLoaded && isContentLoaded)) {
      fadeOut()
      console.log('loaded')
      eventBus.$emit('page:loaded')
    }
  }

  function fadeOut() {
    setTimeout(() => {
      preloader.style.opacity = 0

      setTimeout(() => {
        preloader.style.display = 'none'
      }, 400)
    }, 400)
  }

  checkLoadedContent()
})