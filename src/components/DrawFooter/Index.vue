<template>
  <div class="saomd-footer">
    <a class="one" @mousedown="oneImg = 2" @click="lotteryDraw()">
      <img
        :src="`/img/icon/lottery_${poolType}_1_${oneImg}.png`"
        width="238"
        alt
        draggable="false"
      />
    </a>
    <a class="eleven" @mousedown="elevenImg = 2" @click="lotteryDraw(11)">
      <img
        :src="`/img/icon/lottery_${poolType}_2_${elevenImg}.png`"
        width="238"
        alt
        draggable="false"
      />
    </a>
  </div>
</template>

<script>
import draw from '@/utils/draw';
export default {
  props: {
    poolType: {
      type: String,
      default: 'character',
    },
  },
  data() {
    return {
      oneImg: 1,
      elevenImg: 1,
    };
  },

  mounted() {
    window.addEventListener('mouseup', this.imgButton);
  },

  beforeDestroy() {
    window.removeEventListener('mouseup', this.imgButton);
  },

  methods: {
    imgButton() {
      if (this.oneImg === 1 && this.elevenImg === 1) return;
      [this.oneImg, this.elevenImg] = [1, 1];
    },

    lotteryDraw(item = 1) {
      this.$router.push({
        name: 'result',
        params: { poolType: this.poolType },
      });
      const mutationMethod =
        this.poolType === 'character' ? 'addChara' : 'addWeapon';
      this.$store.commit(`draw/${mutationMethod}`, draw(item, this.poolType));
    },
  },
};
</script>

<style lang="scss" scoped>
.saomd-footer {
  height: 195px;
  padding: 20px 0;
  box-sizing: border-box;
  text-align: center;
  a {
    display: inline-block;
    cursor: pointer;
  }
}
</style>
