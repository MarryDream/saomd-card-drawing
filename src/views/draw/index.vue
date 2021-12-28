<template>
  <div class="draw-container">
    <component :is="componentName" :poolType="poolType" :drawList="drawList" :allImageInfo="allImageInfo"></component>
    <!-- <SaomdDraw />
    <package />-->
  </div>
</template>

<script>
import Pool from './components/Pool'
import Result from './components/Package'
import { eventBus } from '@/utils/eventBus'
import { setAllImageInfo, getAllImageInfo } from '@/utils/cookies'

export default {
  name: 'draw',
  components: {
    Pool,
    Result
  },
  data() {
    return {
      poolType: '',
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
    componentName() {
      return this.poolType ? 'Result' : 'Pool'
    }
  },
  methods: {
    // 初始化方法
    init() {
      eventBus.$on('changePoolType', type => {
        this.poolType = type
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
    margin: 30px;
  }
}
</style>
