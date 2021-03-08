<template>
  <div class="package-base">
    <div class="package-contain">
      <div>
        <span>chara:</span>
        <div :key="index" v-for="(item, index) in drawChara" class="card">
          <img :src="`/img/chara/character_frame_${item}.png`" alt="" />
        </div>
      </div>
      <div>
        <span>weapon:</span>
        <div :key="index" v-for="(item, index) in drawWeapon" class="card">
          <img :src="`/img/chara/character_frame_${item}.png`" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(
      {
        drawChara: state => state.draw.chara,
        drawWeapon: state => state.draw.weapon,
      },
    ),
  },
}
</script>

<style lang="scss" scoped>
.package-base {
  background-color: #e6e6e6;
  padding: 20px;
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  .package-contain {
    .card {
      margin-left: 10px;
      display: inline-block;
    }
    img {
      width: 50px;
    }
  }
}
</style>