<template>
  <div v-if="poolType" class="saomd-footer">
    <a class="one" @mousedown="oneImg = 2" @click="lotteryDraw()">
      <img :src="require(`@/assets/images/icon/lottery_${poolType}_1_${oneImg}.png`)" width="238" alt draggable="false" />
    </a>
    <a class="eleven" @mousedown="elevenImg = 2" @click="lotteryDraw(11)">
      <img :src="require(`@/assets/images/icon/lottery_${poolType}_2_${elevenImg}.png`)" width="238" alt draggable="false" />
    </a>
  </div>
</template>

<script>
import draw from '@/utils/draw'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'DrawFooter',
  props: {
    poolType: {
      type: String,
      default: 'character'
    },
    // 全部图片信息
    allImageInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      oneImg: 1,
      elevenImg: 1
    }
  },

  mounted() {
    window.addEventListener('mouseup', this.imgButton)
  },

  beforeDestroy() {
    window.removeEventListener('mouseup', this.imgButton)
  },

  methods: {
    // 全局监控鼠标谈起事件，还原图片状态
    imgButton() {
      if (this.oneImg === 1 && this.elevenImg === 1) return
      ;[this.oneImg, this.elevenImg] = [1, 1]
    },

    lotteryDraw(time = 1) {
      eventBus.$emit('addLottery', draw(this.allImageInfo, this.poolType, time))
      eventBus.$emit('changePoolType', this.poolType)
      eventBus.$emit('changePage', 2)
    }
  }
}
</script>

<style lang="scss" scoped>
.saomd-footer {
  height: 19.5rem;
  padding: 2rem 0;
  box-sizing: border-box;
  text-align: center;
  a {
    display: inline-block;
    cursor: pointer;
    img {
      width: 23.8rem;
      height: 12rem;
    }
  }
}
</style>
