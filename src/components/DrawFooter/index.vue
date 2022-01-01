<template>
  <div class="saomd-footer">
    <div v-if="poolType" class="footer-lottery-btn">
      <a class="one" @mousedown="lotteryBtnDown($event, 'oneImg')" @touchstart="oneImg = 2" @click="lotteryDraw()">
        <img :src="require(`@/assets/images/icon/lottery_${poolType}_1_${oneImg}.png`)" width="238" alt draggable="false" />
      </a>
      <a class="eleven" @mousedown="lotteryBtnDown($event, 'elevenImg')" @touchstart="elevenImg = 2" @click="lotteryDraw(11)">
        <img :src="require(`@/assets/images/icon/lottery_${poolType}_2_${elevenImg}.png`)" width="238" alt draggable="false" />
      </a>
    </div>
    <div class="footer-navigator-btn">
      <div class="footer-back-btn" v-show="pageType !== 1" @click="backToPoll">
        <img :src="require('@/assets/images/icon/back_button_icon.png')" alt draggable="false" />
      </div>
    </div>
  </div>
</template>

<script>
import draw from '@/utils/draw'

export default {
  name: 'DrawFooter',
  props: {
    poolType: {
      type: String,
      default: 'character'
    },
    pageType: {
      type: Number,
      default: 1
    },
    /* 全部图片信息 */
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
    window.addEventListener('touchend', this.imgButton)
    window.addEventListener('touchcancel', this.imgButton)
  },

  beforeDestroy() {
    window.removeEventListener('mouseup', this.imgButton)
    window.removeEventListener('touchend', this.imgButton)
    window.removeEventListener('touchcancel', this.imgButton)
  },

  methods: {
    /* 全局监控鼠标谈起事件，还原图片状态 */
    imgButton() {
      if (this.oneImg === 1 && this.elevenImg === 1) return
      ;[this.oneImg, this.elevenImg] = [1, 1]
    },

    /* 鼠标按下时修改图片样式 */
    lotteryBtnDown(e, type) {
      /* 按下了左键 */
      if (e.button === 0) {
        this[type] = 2
      }
      return false
    },
    /**
     * 抽卡方法
     * @param time {Number} 抽卡次数
     */
    lotteryDraw(time = 1) {
      this.$emit('addLottery', draw(this.allImageInfo, this.poolType, time))
      this.$emit('changePoolType', this.poolType)
      this.$emit('changePage', 2)
    },
    /* 返回卡池页 */
    backToPoll() {
      this.$emit('changePage', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.saomd-footer {
  position: relative;
  .footer-lottery-btn {
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

  /* 只是个抽卡网站，没那水平做私服 */
  .footer-navigator-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    .footer-back-btn {
      $img: '~@/assets/images/icon/back_button.png';
      $width: 11rem;
      position: relative;
      width: $width;
      height: 8.7rem;
      transform-origin: 0 100%;
      transition: all 0.1s;
      cursor: pointer;
      &:active {
        transform: scale(1.154);
        &::before {
          transform: translateX(-100%);
          filter: blur(0.13rem) drop-shadow($width 0 0 #ffd016);
        }
        img {
          filter: brightness(1000%);
        }
      }
      &::before {
        content: '';
        position: absolute;
        width: inherit;
        height: inherit;
        background: url($img) center no-repeat;
        background-size: cover;
      }
      img {
        width: 5.4rem;
        height: 4.2rem;
        position: absolute;
        top: 3.5rem;
        right: 3.6rem;
      }
    }
  }
}
</style>
