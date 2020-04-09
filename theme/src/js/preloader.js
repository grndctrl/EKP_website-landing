import { eventBus } from "./event-bus"

window.addEventListener('DOMContentLoaded', () => {
  let preloader = document.querySelector('#preloader')
  let currOpacity = 1
  let duration = 0.4
  let step = 1 / (duration * 60) 
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
    requestAnimationFrame(animation)
    
    function animation() {
      currOpacity -= step
      preloader.style.opacity = currOpacity
      
      if (currOpacity <= 0) {
        preloader.style.display = 'none'
      } else {
        requestAnimationFrame(animation)
      }
    }
  }

  checkLoadedContent()
})