<template>
  <div class="video-player relative">
    <div ref="thumbnail" @click="play" class="thumbnail absolute inset-0 z-10">
      <figure class="fit">
        <img :src="thumbnail" alt="">        
      </figure>
    </div>
      <video ref="video" width="100%" height="100%" controls>
      <source :src="source" :type="type">
      Your browser does not support the video tag.
    </video> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World'
    }
  },
  props: [
    'source', 'thumbnail', 'type'
  ],
  methods: {
    play() {
      this.$refs.thumbnail.style.display = 'none'
      this.$refs.video.play()
    }
  }
}
</script>

<style lang="pcss" scoped>
</style>
