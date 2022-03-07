<template>
  <div id="app">
    <Draw :style="{'--screenHeight': screenHeight, '--baseWidth': baseWidth, '--baseHeight': baseHeight}" />
  </div>
</template>

<script lang="ts">
import Draw from "@/views/draw/index.vue"
import {defineComponent, onMounted, reactive, toRefs} from "vue";

export default defineComponent({
  name: "App",
  components: {
    Draw
  },
  setup() {
    const [defaultBaseWidth, defaultBaseHeight] = [50, 95]
    
    interface IState {
      screenHeight: string
      baseWidth: string
      baseHeight: string
    }
    
    const state: IState = reactive({
      screenHeight: "0",
      baseWidth: "0",
      baseHeight: "0"
    })
    
    
    function resetWindow() {
      const htmlEle = document.documentElement
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
      // 1rem代表多少px
      state.baseWidth = width + 'px'
      state.screenHeight = height + 'px'
      let remSize = width / defaultBaseWidth
      // 当跟随宽度缩放高度要溢出时，修改为固定高度且根据高度缩放
      if (defaultBaseHeight * remSize > height) {
        remSize = height / defaultBaseHeight
        state.baseHeight = height + 'px'
      } else {
        state.baseHeight = defaultBaseHeight * remSize + 'px'
      }
      htmlEle.style.fontSize = remSize + 'px'
    }
    
    onMounted(() => {
      window.addEventListener('resize', resetWindow)
      resetWindow()
    })
    
    return {
      ...toRefs(state)
    }
  }
})
</script>
