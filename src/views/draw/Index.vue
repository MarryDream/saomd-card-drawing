<template>
  <div class="draw-container">
    <SaomdDraw />
    <package />
  </div>
</template>

<script>
import SaomdDraw from './components/Index'
import Package from './components/Package'

export default {
  components: {
    SaomdDraw,
    Package
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.draw {
  &-container {
    margin: 30px;
  }
}
</style>
