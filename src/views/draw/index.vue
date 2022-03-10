<template>
  <div class="draw-container" @contextmenu.prevent>
    <audio ref="bgmAudio" style="display: none" src="https://file.uimentama.com/saomd-assets/sounds/lottery_bgm.ogg"
           preload="auto" loop="true"></audio>
    <div class="draw-base" :class="isPoolPage ? 'pool' : 'package'">
      <label for="bgmCheckbox" class="diy-checkout">
        <span>BGM</span>
        <input id="bgmCheckbox" v-model="bgmPlayState" type="checkbox" @change="changeBgmstate"/>
        <div class="checkout-box"></div>
      </label>
      <div class="draw-contain">
        <div class="draw-title">
          <div class="pool-title">
            <img :src="getAssetsFile(`icon/${isPoolPage ? 'scout' : 'scout result'}.png`)"
                 :style="{ width: isPoolPage ? '5.4rem' : '11.1rem' }" alt="ERROR" draggable="false"/>
          </div>
        </div>
        <Pool v-if="isPoolPage" @changePoolType="changePoolType"></Pool>
        <Result v-else :poolType="poolType" :drawList="drawList"></Result>
        <Footer class="footer-box" :poolType="poolType" :pageType="pageType" :allImageInfo="allImageInfo"
                @addLottery="addLottery" @changePage="changePage" @changePoolType="changePoolType"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, computed, ComputedRef, ref, Ref, reactive, toRefs} from "vue"
import Pool from "./components/Pool.vue"
import Result from "./components/Package.vue"
import Footer from "@/components/DrawFooter/index.vue"
import {setAllImageInfo, getAllImageInfo} from "@/utils/cookies"
import {isAllImageInfo} from "@/type/check"
import $http from "@/api"
import {ImageInfo, AllImageInfo} from "@/type/ImageInfo"
import {IDrawState} from "@/type/draw"
import {getAssetsFile} from "@/utils/pub-use"

export default defineComponent({
  name: "Draw",
  components: {
    Pool,
    Result,
    Footer
  },
  setup() {
    const state: IDrawState = reactive({
      poolType: "character",
      pageType: 1, // 当前页面 2结果页
      drawList: [],
      bgmPlayState: false, // bgm播放状态
      allImageInfo: {}
    })

    // 是否是卡池页
    const isPoolPage: ComputedRef<boolean> = computed(() => !(state.pageType - 1))

    onMounted(() => {
      initImgInfo()
    })


    function initImgInfo() {
      // 先从localStory里面获取，若没有再请求
      const imageInfo = getAllImageInfo()
      if (isAllImageInfo(imageInfo)) {
        state.allImageInfo = imageInfo
        return
      }
      $http.getImageList({ src: '/saomd' }, "get").then((res: any) => {
        const allImageInfo: AllImageInfo = {}
        const reg: RegExp = /(character|weapon)_star(\d)_job(\d+)_(\w+)_(\d+)/
        for (const file of res.data.files) {
          const fileName = file.name
          let type: ImageInfo["type"], star: ImageInfo["star"], job: ImageInfo["job"], attr: ImageInfo["attr"],
            id: ImageInfo["id"]
          [, type, star, job, attr, id] = fileName.match(reg)
          // 若种类属性不存在，设置为空对象
          if (!allImageInfo[type]) {
            allImageInfo[type] = {}
          }
          const allImageInfoByType = allImageInfo[type] || []
          // 若星级属性不存在，设置为空数组
          allImageInfoByType[star] = allImageInfoByType[star] || []
          allImageInfoByType[star]!.push({id, star, type, job, attr})
        }
        state.allImageInfo = allImageInfo
        // 存放至localstory
        setAllImageInfo(allImageInfo)
      })
        .catch((err: any) => {
          console.log(err || '获取文件失败')
        })
    }

    function changePoolType(type: ImageInfo["type"]) {
      state.poolType = type
    }

    function changePage(type: IDrawState["pageType"]) {
      state.pageType = type
    }

    function addLottery(list: ImageInfo[]) {
      state.drawList = list
    }

    const bgmAudio: Ref<HTMLMediaElement | null> = ref(null)

    /* 控制播放bgm */
    function changeBgmstate() {
      const audio = bgmAudio.value
      if (audio) {
        state.bgmPlayState ? audio.play() : audio.pause()
      }
    }

    return {
      ...toRefs(state),
      getAssetsFile,
      bgmAudio,
      changePoolType,
      changePage,
      addLottery,
      changeBgmstate,
      isPoolPage
    }
  }
})
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
            background: url('/src/assets/images/icon/panel.png') no-repeat;
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
