<template>
  <div class="draw-container">
    <component :is="componentName" :poolType="poolType"></component>
    <!-- <SaomdDraw />
    <package /> -->
  </div>
</template>

<script>
import Pool from './components/Index';
import Result from './components/Package';
import { mapState } from 'vuex'

export default {
  components: {
    Pool,
    Result,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      poolType: (state) => state.draw.poolType,
    }),
    componentName() {
      return this.poolType ? 'Result' : 'Pool';
    },
  },
};
</script>

<style lang="scss" scoped>
.draw {
  &-container {
    margin: 30px;
  }
}
</style>
