<template>
  <div class="result-base">
    <div class="result-contain">
      <div class="result-title">
        <div class="pool-title">
          <img src="/img/icon/scout.png" alt />
        </div>
      </div>
      <div class="result-pool">
        <div class="pool-contain">
          <div :key="index" v-for="(item, index) in drawList" class="card">
            <img :src="`/img/chara/character_frame_${item}.png`" alt="" />
          </div>
        </div>
      </div>
      <Footer :poolType="poolType" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Footer from '@/components/DrawFooter/Index';
export default {
  props: {
    poolType: {
      type: String,
      default: 'character',
    },
  },
  components: {
    Footer,
  },
  computed: {
    ...mapState({
      drawChara: (state) => state.draw.chara,
      drawWeapon: (state) => state.draw.weapon,
    }),
    drawList() {
      return this.poolType === 'character'
        ? this.drawChara
        : this.poolType === 'weapon'
        ? this.drawWeapon
        : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.result-base {
  width: 495px;
  position: relative;
  overflow: hidden;
  user-select: none;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &::before {
    background: url('/img/bg_result.png') 0 -40px no-repeat;
    background-size: 110%;
  }
  &::after {
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 1;
  }
  > .result-contain {
    position: relative;
    z-index: 2;
    > .result-title {
      height: 83px;
      overflow: hidden;
      > .pool-title {
        width: 231px;
        height: 47px;
        margin-top: 20px;
        background: url('/img/icon/panel.png') no-repeat;
        > img {
          margin: 7px 0 0 63px;
        }
      }
    }
    > .result-pool {
    height: 592px;
    margin-top: 10px;
    text-align: center;
    .card {
      display: inline-block;
    }
    img {
      width: 100px;
    }
  }
  }
}
</style>