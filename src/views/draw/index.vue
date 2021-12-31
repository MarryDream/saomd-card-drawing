<template>
  <div class="draw-container">
    <div class="draw-base" :class="isPoolPage ? 'pool' : 'package'">
      <div class="draw-contain">
        <div class="draw-title">
          <div class="pool-title">
            <img :src="require(`@/assets/images/icon/${isPoolPage ? 'scout' : 'scout result'}.png`)" :style="{ width: isPoolPage ? '54rem' : '111rem' }" alt draggable="false" />
          </div>
        </div>
        <component :is="componentName" :poolType="poolType" :drawList="drawList"></component>
        <Footer :poolType="poolType" :allImageInfo="allImageInfo" />
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
      // 当前页面
      pageType: 1,
      drawList: '',
      // 全部图片信息
      allImageInfo: {}
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
      eventBus.$on('changePoolType', type => {
        this.poolType = type
      })
      eventBus.$on('changePage', type => {
        this.pageType = type
      })
      eventBus.$on('addLottery', list => {
        this.drawList = list
      })
      this.initImgInfo()
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
      > .draw-contain {
        position: relative;
        z-index: 2;
        > .draw-title {
          height: 83rem;
          overflow: hidden;
          > .pool-title {
            width: 231rem;
            height: 47rem;
            margin-top: 20rem;
            padding-right: 51rem;
            background: url('~@/assets/images/icon/panel.png') no-repeat;
            background-size: 231rem 47rem;
            text-align: center;
            > img {
              height: 31rem;
              margin-top: 7rem;
            }
          }
        }
      }
    }
  }
}
</style>
