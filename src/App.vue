<template>
  <div id="app">
    <Draw :style="{'--screenHeight': screenHeight, '--baseWidth': baseWidth, '--baseHeight': baseHeight}" />
  </div>
</template>

<script>
import Draw from '@/views/draw'
const [defaultBaseWidth, defaultBaseHeight] = [50, 88]
export default {
  components: {
    Draw
  },
  data() {
    return {
      screenHeight: 0,
      baseWidth: 0,
      baseHeight: 0
    }
  },
  created() {
    window.addEventListener('resize', this.resetWindow)
    this.resetWindow()
  },
  methods: {
    resetWindow() {
      const htmlEle = document.documentElement
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
      // 1rem代表多少px
      this.baseWidth = width + 'px'
      this.screenHeight = height + 'px'
      let remSize = width / defaultBaseWidth
      // 当跟随宽度缩放高度要溢出时，修改为固定高度且根据高度缩放
      if (defaultBaseHeight * remSize > height) {
        remSize = height / defaultBaseHeight
        this.baseHeight = height + 'px'
      } else {
        this.baseHeight = defaultBaseHeight * remSize + 'px'
      }
      htmlEle.style.fontSize = remSize + 'px'
    }
  }
}
</script>

<style></style>
