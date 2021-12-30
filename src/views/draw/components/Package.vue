<template>
  <div class="result-pool">
    <div class="pool-contain">
      <div class="card-contain">
        <div :key="index" v-for="(item, index) in drawList" class="card">
          <img class="card-iframe" :src="require(`@/assets/images/chara/character_frame_${item.star}.png`)" alt draggable="false" />
          <img class="card-img" :src="`https://file.uimentama.com/saomd/${item.type}_star${item.star}_job${item.job}_${item.attr}_${item.id}.png`" alt draggable="false" />
          <div class="attr-box">
            <img class="card-attr" :src="require(`@/assets/images/attribute/icon_attribute_${item.attr}.png`)" alt draggable="false" />
            <img class="card-job" :src="require(`@/assets/images/job/icon_job_${item.job}.png`)" alt draggable="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.result-pool {
  height: 592rem;
  margin-top: 10rem;
  .pool-contain {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    padding: 15rem 0;
    width: 488rem;
    height: 550rem;
    background-color: rgba(205, 205, 205, 0.85);
    background-clip: content-box;
    overflow: hidden;
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 15rem;
      background-color: #dfdfdf;
      opacity: 0.95;
    }
    &::before {
      top: 0;
      box-shadow: 0 0 3rem 3rem #fff inset, 0 5rem 3rem #888;
    }
    &::after {
      bottom: 0;
      box-shadow: 0 0 3rem 3rem #fff inset, 0 -5rem 3rem #888;
    }
    .card-contain {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;
      .card {
        width: 120rem;
        height: 136rem;
        position: relative;
        margin: 1rem -1rem;
        background: url('~@/assets/images/icon/card_bg.png') 9rem 12rem no-repeat;
        background-size: 104rem 116rem;
        &:last-child {
          margin-right: 114rem;
        }
        .attr-box {
          width: 28rem;
          height: 28rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 7rem;
          bottom: 3rem;
          z-index: 20;
          .card-attr {
            width: inherit;
          }
          .card-job {
            width: 20rem;
          }
        }
        img {
          position: absolute;
          &.card-iframe {
            width: inherit;
            z-index: 10;
          }
          &.card-img {
            position: absolute;
            width: 113rem;
            left: 5rem;
            top: 12rem;
          }
        }
      }
    }
  }
}
</style>
