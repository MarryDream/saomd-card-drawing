<template>
  <div class="draw-container" @contextmenu.prevent>
    <audio ref="bgmAudio" style="display: none" src="https://file.uimentama.com/saomd-assets/sounds/lottery_bgm.ogg" preload="auto" loop="loop"></audio>
    <div class="draw-base" :class="isPoolPage ? 'pool' : 'package'">
      <label for="bgmCheckbox" class="diy-checkout">
        <span>BGM</span>
        <input id="bgmCheckbox" v-model="bgmPlayState" type="checkbox" @change="changeBgmstate" />
        <div class="checkout-box"></div>
      </label>
      <div class="draw-contain">
        <div class="draw-title">
          <div class="pool-title">
            <img :src="require(`@/assets/images/icon/${isPoolPage ? 'scout' : 'scout result'}.png`)" :style="{ width: isPoolPage ? '5.4rem' : '11.1rem' }" alt draggable="false" />
          </div>
        </div>
        <component :is="componentName" :poolType="poolType" :drawList="drawList" @changePoolType="changePoolType"></component>
        <Footer class="footer-box" :poolType="poolType" :pageType="pageType" :allImageInfo="allImageInfo" @addLottery="addLottery" @changePage="changePage" @changePoolType="changePoolType" />
      </div>
    </div>
  </div>
</template>

<script>
import Pool from './components/Pool'
import Result from './components/Package'
import Footer from '@/components/DrawFooter'
import { eventBus } from '@/utils/eventBus'
import { setAllImageInfo, getAllImageInfo } from '@/utils/cookies'

export default {
  name: 'draw',
  components: {
    Pool,
    Result,
    Footer
  },
  data() {
    return {
      poolType: '',
      // 当前页面 2结果页
      pageType: 1,
      drawList: '',
      // 全部图片信息
      allImageInfo: {},
      // bgm播放状态太
      bgmPlayState: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    eventBus.$off('changePoolType')
    eventBus.$off('addLottery')
  },
  computed: {
    // 是否是卡池页
    isPoolPage() {
      return !(this.pageType - 1)
    },
    componentName() {
      return this.isPoolPage ? 'Pool' : 'Result'
    }
  },
  methods: {
    // 初始化方法
    init() {
      this.initImgInfo()
    },
    changePoolType(type) {
      this.poolType = type
    },
    changePage(type) {
      this.pageType = type
    },
    addLottery(list) {
      this.drawList = list
    },
    /* 控制播放bgm */
    changeBgmstate() {
      const audio = this.$refs.bgmAudio
      this.bgmPlayState ? audio.play() : audio.pause()
    },
    initImgInfo() {
      // 先从localStory里面获取，若没有再请求
      const imageInfo = getAllImageInfo()
      if (imageInfo) {
        this.allImageInfo = imageInfo
        return
      }
      this.$http
        .getFileList()
        .then(res => {
          const allImageInfo = {}
          const reg = /(character|weapon)_star(\d)_job(\d+)_(\w+)_(\d+)/
          for (const file of res.files) {
            const fileName = file.name
            const [, type, star, job, attr, id] = fileName.match(reg)
            // 若种类属性不存在，设置为空对象
            if (!allImageInfo[type]) {
              allImageInfo[type] = {}
            }
            const allImageInfoByType = allImageInfo[type]
            // 若星级属性不存在，设置为空数组
            if (!allImageInfoByType[star]) {
              allImageInfoByType[star] = []
            }
            allImageInfoByType[star].push({ id, star, type, job, attr })
          }
          this.allImageInfo = allImageInfo
          // 存放至localstory
          setAllImageInfo(allImageInfo)
        })
        .catch(err => {
          console.log(err || '获取文件失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.draw {
  &-container {
    height: var(--screenHeight);
    display: flex;
    align-items: center;
    background-color: #000;
    .draw-base {
      width: var(--baseWidth);
      height: var(--baseHeight);
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
      &.pool::before {
        background: url('https://file.uimentama.com/saomd-assets/draw-bg.png') center no-repeat;
        background-size: cover;
      }
      &.package::before {
        background: url('https://file.uimentama.com/saomd-assets/bg_result.png') center no-repeat;
        background-size: cover;
      }
      &::after {
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
      }
      > .diy-checkout {
        --background-color-active: #3e83bc;
        --background-color: #da424e;
        display: flex;
        align-items: center;
        $width: 8.8rem;
        $height: 4.2rem;
        $control-width: $height - 1.5rem;
        position: absolute;
        right: 1.5em;
        top: 1.5em;
        z-index: 10;
        > span {
          margin-right: 0.5em;
          font-size: 1.6rem;
          color: #fff;
        }
        #bgmCheckbox {
          display: none;
          &:checked + .checkout-box {
            background-color: var(--background-color-active);
            &::before {
              border: 0.3rem solid var(--background-color-active);
              transform: translateX($width - $control-width - 1.1rem);
            }
          }
        }
        .checkout-box {
          width: $width;
          height: $height;
          display: flex;
          align-items: center;
          border-radius: 2.1rem;
          background-color: var(--background-color);
          box-shadow: 0 0 1px rgba(51, 51, 51, 0.3), 0 1px 3px #333 inset, 0 -1px 1px rgba(204, 204, 204, 0.3) inset, 0 -3px 1px rgba(51, 51, 51, 0.3) inset;
          overflow: hidden;
          &::before {
            content: '';
            width: $control-width;
            height: $control-width;
            border-radius: 50%;
            background-color: #fff;
            border: 0.3rem solid var(--background-color);
            box-shadow: 0 0 0 0.2rem #fff;
            transform: translateX(0.5rem);
            transition: transform 0.2s;
          }
        }
      }
      > .draw-contain {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        z-index: 2;
        > .draw-title {
          height: 8.3rem;
          overflow: hidden;
          > .pool-title {
            width: 23.1rem;
            height: 4.7rem;
            margin-top: 2rem;
            padding-right: 5.1rem;
            background: url('~@/assets/images/icon/panel.png') no-repeat;
            background-size: 23.1rem 4.7rem;
            text-align: center;
            > img {
              height: 3.1rem;
              margin-top: 0.7rem;
            }
          }
        }
        > .footer-box {
          flex: 1;
        }
      }
    }
  }
}
</style>
