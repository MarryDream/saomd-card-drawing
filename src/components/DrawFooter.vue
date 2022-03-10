<template>
  <div class="saomd-footer">
    <div v-if="poolType" class="footer-lottery-btn">
      <a class="one" @mousedown="lotteryBtnDown($event, 'oneImg')" @touchstart="oneImg = 2" @click="lotteryDraw()">
        <img :src="getAssetsFile(`icon/lottery_${poolType}_1_${oneImg}.png`)" width="238" alt="ERROR"
             draggable="false"/>
      </a>
      <a class="eleven" @mousedown="lotteryBtnDown($event, 'elevenImg')" @touchstart="elevenImg = 2"
         @click="lotteryDraw(11)">
        <img :src="getAssetsFile(`icon/lottery_${poolType}_2_${elevenImg}.png`)" width="238" alt="ERROR"
             draggable="false"/>
      </a>
    </div>
    <div class="footer-navigator-btn">
      <div class="footer-back-btn" v-show="pageType !== 1" @click="backToPoll">
        <img src="/src/assets/images/icon/back_button_icon.png" alt="ERROR" draggable="false"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, PropType, reactive, toRefs} from "vue"
import draw, {DrawTime} from '@/utils/draw'
import {AllImageInfo, ImageInfo} from "@/type/ImageInfo"
import {IFooterState} from "@/type/footer"
import {PageType} from "@/type/draw"
import {getAssetsFile} from "@/utils/pub-use"

export default defineComponent({
  name: "DrawFooter",
  emits: ["addLottery", "changePoolType", "changePage"],
  props: {
    poolType: {
      type: String as PropType<ImageInfo["type"]>,
      default: 'character'
    },
    pageType: {
      type: Number as PropType<PageType>,
      default: 1
    },
    /* 全部图片信息 */
    allImageInfo: {
      type: Object as PropType<AllImageInfo>,
      default: () => {
        return {}
      }
    }
  },
  setup(props, {emit}) {
    const state: IFooterState = reactive({
      oneImg: 1,
      elevenImg: 1
    })

    /* 全局监控鼠标谈起事件，还原图片状态 */
    function imgButton() {
      if (state.oneImg === 1 && state.elevenImg === 1) return;
      [state.oneImg, state.elevenImg] = [1, 1]
    }

    onMounted(() => {
      window.addEventListener('mouseup', imgButton)
      window.addEventListener('touchend', imgButton)
      window.addEventListener('touchcancel', imgButton)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('mouseup', imgButton)
      window.removeEventListener('touchend', imgButton)
      window.removeEventListener('touchcancel', imgButton)
    })

    /* 鼠标按下时修改图片样式 */
    function lotteryBtnDown(e: MouseEvent, type: keyof IFooterState) {
      /* 按下了左键 */
      if (e.button === 0) {
        state[type] = 2
      }
      return false
    }

    /* 抽卡方法 */
    function lotteryDraw(time: DrawTime = 1) {
      emit('addLottery', draw(props.allImageInfo, props.poolType, time))
      emit('changePoolType', props.poolType)
      emit('changePage', 2)
    }

    /* 返回卡池页 */
    function backToPoll() {
      emit('changePage', 1)
    }

    return {
      ...toRefs(state),
      getAssetsFile,
      lotteryBtnDown,
      lotteryDraw,
      backToPoll
    }
  }
})
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
      $img: '/src/assets/images/icon/back_button.png';
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
