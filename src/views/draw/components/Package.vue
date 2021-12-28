<template>
  <div class="result-base">
    <div class="result-contain">
      <div class="result-title">
        <div class="pool-title">
          <img :src="require('@/assets/images/icon/scout.png')" alt />
        </div>
      </div>
      <div class="result-pool">
        <div class="pool-contain">
          <div :key="index" v-for="(item, index) in drawList" class="card">
            <img class="card-iframe" :src="require(`@/assets/images/chara/character_frame_${item.star}.png`)" alt />
            <img class="card-img" :src="`https://file.uimentama.com/saomd/${item.type}_star${item.star}_job${item.job}_${item.attr}_${item.id}.png`" alt />
            <img class="card-attr" :src="require(`@/assets/images/attribute/icon_attribute_${item.attr}.png`)" alt />
            <img class="card-job" :src="require(`@/assets/images/job/icon_job_${item.job}.png`)" alt />
          </div>
        </div>
      </div>
      <Footer :poolType="poolType" :allImageInfo="allImageInfo" />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/DrawFooter'

export default {
  name: 'Package',
  props: {
    poolType: {
      type: String,
      default: 'character'
    },
    // 抽卡结果列表
    drawList: {
      type: Array,
      default: () => []
    },
    // 全部图片信息
    allImageInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    Footer
  }
}
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
    background: url('~@/assets/images/bg_result.png') 0 -40px no-repeat;
    background-size: 110%;
  }
  &::after {
    background-color: rgba(0, 0, 0, 0.5);
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
        background: url('~@/assets/images/icon/panel.png') no-repeat;
        > img {
          margin: 7px 0 0 63px;
        }
      }
    }
    > .result-pool {
      height: 592px;
      margin-top: 10px;
      .pool-contain {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 0 5px;
        .card {
          width: 110px;
          height: 130px;
          display: inline-block;
          position: relative;
          margin: 5px;
          img {
            position: absolute;
            &.card-iframe {
              width: 108px;
              z-index: 10;
            }
            &.card-img {
              position: absolute;
              width: 100px;
              left: 5px;
              top: 12px;
            }
            &.card-attr {
              width: 60px;
              right: 0;
              bottom: 0;
              z-index: 20;
            }
            &.card-job {
              width: 40px;
              right: 10px;
              bottom: 10px;
              z-index: 30;
            }
          }
        }
      }
    }
  }
}
</style>
