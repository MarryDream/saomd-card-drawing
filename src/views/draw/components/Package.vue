<template>
  <div class="result-pool">
    <div class="pool-contain">
      <div :key="index" v-for="(item, index) in drawList" class="card">
        <img class="card-iframe" :src="require(`@/assets/images/chara/character_frame_${item.star}.png`)" alt draggable="false" />
        <img class="card-img" :src="`https://file.uimentama.com/saomd/${item.type}_star${item.star}_job${item.job}_${item.attr}_${item.id}.png`" alt draggable="false" />
        <img class="card-attr" :src="require(`@/assets/images/attribute/icon_attribute_${item.attr}.png`)" alt draggable="false" />
        <img class="card-job" :src="require(`@/assets/images/job/icon_job_${item.job}.png`)" alt draggable="false" />
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
    flex-wrap: wrap;
    align-items: center;
    padding: 0 5rem;
    .card {
      width: 110rem;
      height: 130rem;
      display: inline-block;
      position: relative;
      margin: 5rem;
      img {
        position: absolute;
        &.card-iframe {
          width: 108rem;
          z-index: 10;
        }
        &.card-img {
          position: absolute;
          width: 100rem;
          left: 5rem;
          top: 12rem;
        }
        &.card-attr {
          width: 60rem;
          right: 0;
          bottom: 0;
          z-index: 20;
        }
        &.card-job {
          width: 40rem;
          right: 10rem;
          bottom: 10rem;
          z-index: 30;
        }
      }
    }
  }
}
</style>
