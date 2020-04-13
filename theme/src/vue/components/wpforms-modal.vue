<template>
  <div id="wpforms-modal" :class="{ 'active': isActive }" class="pointer-events-none fixed inset-0 flex justify-center items-center">
    <div class="fader absolute inset-0 bg-black opacity-50"></div>
    <div class="modal w-full h-screen flex items-center md:block md:w-15/24 md:h-auto lg:w-12/24 xl:w-8/24 relative bg-black text-white p-1/24 lg:p-1/48 pointer-events-auto">
      <div class="wrapper w-full">        
        <div class="text-primary flex w-full justify-between">
          <div class="p3">
            Contactformulier
          </div>
          <div class="close cursor-pointer" @click="close">
            <span></span>
            <span></span>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@src/js/event-bus.js'

export default {
  data() {
    return {
      isActive: false,
      textAreaHeight: 1
    }
  },
  props: { 
    privacyUrl: {
      type: String,
      default: '#'
    } 
  },
  methods: {
    close() {
      this.isActive = false
    }
  },
  mounted() {
    eventBus.$on('opensurvey', () => {
      this.isActive = true
    })

    let text = document.querySelector('div.wpforms-container-full .wpforms-form textarea.wpforms-field-medium')
    text.addEventListener('keyup', (event) => {
      if (event.key == "Enter") {
        this.textAreaHeight++

        text.style.height = 1 + this.textAreaHeight + 'em'
      }
    })

    let submitContainer = document.querySelector('.wpforms-submit-container')
    submitContainer.classList.add('flex')
    submitContainer.classList.add('justify-end')
    submitContainer.classList.add('pointer-events-none')

    let checkboxField = document.querySelector('.wpforms-field-checkbox')
    checkboxField.style.width = '50%'
    checkboxField.style.transform = 'translateY(4em)'
    checkboxField.style.overflow = 'visible'

    let label = checkboxField.querySelector('.choice-1 .wpforms-field-label-inline')
    label.innerHTML = 'Ik ga akkoord met de <a style="text-decoration: underline" href="' + this.privacyUrl + '" target="_blank">privacyverklaring</a>'
  },
  watch: {
    isActive: function (val) {
      if (val) {
        document.body.classList.add('is-modal-active')
      } else {
        document.body.classList.remove('is-modal-active')
      }
    }
  }
}
</script>

<style lang="pcss" scoped>
div.wpforms-container-full .wpforms-form input[type="text"],
div.wpforms-container-full .wpforms-form textarea.wpforms-field-medium,
div.wpforms-container-full .wpforms-form input[type="email"] {
  border: none;
  border-bottom: 1px solid white;
  border-radius: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  color: white;
  background: transparent;
  font-size: 14px;
  height: 2em;
  
  &::placeholder {
    @apply text-primary;
    opacity: 1;
  }
}

div.wpforms-container-full .wpforms-form textarea.wpforms-field-medium {
  height: 2em;
  line-height: 1em;
}

div.wpforms-container-full .wpforms-form input[type="checkbox"] {
  opacity: 0;
}

div.wpforms-container-full .wpforms-form .choice-1 {
  @apply relative;
  .wpforms-field-label-inline {
    @apply block absolute top-0 left-0;
    transform: translateY(-1.25em);
    margin-left: 1.5em;
    &::before {
      @apply border border-white;
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      width: 16px;
      height: 16px;
      background: transparent;
      cursor: pointer;
      margin-left: -1.5em;
    }
    &::after {
      @apply absolute;
      margin-left: -1.5em;
      content: '';
      left: 3px;
      top: 7px;
      width: 10px;
      height: 10px;
    }
  }
  &.wpforms-selected .wpforms-field-label-inline::after {
    background: white;
  }
}

div.wpforms-container-full .wpforms-form button[type="submit"] {
  @apply border border-white rounded-full bg-transparent text-white pointer-events-auto;
  font-size: 22px;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 3px;
  padding-bottom: 10px;
  letter-spacing: 0.15px;
  line-height: 1;
}

div.wpforms-container-full .wpforms-form .wpforms-field {
  padding: 12px 0 !important;
}

@screen md {
  div.wpforms-container-full .wpforms-form .wpforms-field {
    padding: 20px 0 !important;
  }
}

.close span {
  @apply border-t border-primary block;
  width: 24px;
  transform: translateY(12px) rotate(45deg);
  &:first-child {
    transform: translateY(13px) rotate(-45deg);
  }
}

#wpforms-modal {
  .fader {
    @apply opacity-0;
    transition: opacity 400ms ease;
  }

  .modal {
    transform: translateY(-200vh);
    transition: transform 400ms ease-out;
  }

  &.active {
    .fader {
      @apply opacity-50;
    }
    .modal {
      transform: translateY(0);
    }
  }
}
</style>
