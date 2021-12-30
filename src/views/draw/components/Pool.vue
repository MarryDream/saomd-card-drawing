<template>
  <div class="draw-pool">
    <div class="pool-title">
      <label v-for="(item, index) of categoryList" :key="index" class="select-pool">
        <input type="radio" :value="item.name" v-model="category" @change="poolTitleChange(item.name)" />
        <span :class="item.name">{{ `${item.value}(${item.num})` }}</span>
      </label>
    </div>
    <div class="pool">
      <div class="pools" :class="{ poolTransition: isTransition }" ref="poolsRef">
        <img v-for="(item, index) of poolList" :key="index" class="pools-image" :class="{ active: item.active, poolTransition: isTransition }" :src="require(`@/assets/images/pool/${item.name}.png`)" draggable="false" alt />
      </div>
      <img v-if="leftArrowFlag" class="arrow left" :src="require('@/assets/images/icon/arrow.png')" draggable="false" alt @click="arrowHandle()" />
      <img v-if="rightArrowFlag" class="arrow right" :src="require('@/assets/images/icon/arrow.png')" draggable="false" alt @click="arrowHandle('right')" />
    </div>
    <button class="details">出現角色一覽/説明</button>
  </div>
</template>
<script>
import { eventBus } from '@/utils/eventBus'
export default {
  name: 'Pool',
  data() {
    return {
      category: 'all',
      charaPoolList: [{ type: 'character', name: 'chara', active: false }],
      weaponPoolList: [{ type: 'weapon', name: 'weapon', active: false }],
      allPoolList: [],
      poolList: [],
      categoryList: [],
      activeIndex: 0, // 当前显示的图片在数组中的序号
      isTransition: true, // 是否拥有过度效果
      poolType: ''
    }
  },
  methods: {
    poolTitleChange(name) {
      this.isTransition = false
      switch (name) {
        case 'all':
          this.poolList = this.allPoolList
          break
        case 'chara':
          this.poolList = this.charaPoolList
          break
        case 'weapon':
          this.poolList = this.weaponPoolList
          break
      }
    },

    // 左右点击事件
    arrowHandle(direct = 'left') {
      this.activeIndex = direct === 'left' ? this.activeIndex - 1 : this.activeIndex + 1
      this.poolType = this.poolList[this.activeIndex].type
      this.$refs.poolsRef.style.transform = `translateX(${-260 * this.activeIndex}rem)`
      this.initPoolArr(this.poolList)
    },

    // 切换设置当前卡池active状态
    initPoolArr(poolList) {
      poolList.forEach(item => {
        item.active = false
      })
      poolList[this.activeIndex].active = true
    }
  },
  computed: {
    rightArrowFlag: function () {
      return this.activeIndex !== this.poolList.length - 1
    },
    leftArrowFlag: function () {
      return this.activeIndex !== 0
    }
  },
  watch: {
    poolType(val) {
      eventBus.$emit('changePoolType', val)
    },
    poolList: function (val) {
      this.activeIndex = 0
      this.poolType = this.poolList[this.activeIndex].type
      this.$refs.poolsRef.style.transform = ''
      this.initPoolArr(val)
      this.$refs.poolsRef.style.width = `width:${(240 + 20) * (this.poolList.length - 1) + 507}rem`
      setTimeout(() => {
        this.isTransition = true
      }, 400)
    }
  },
  mounted() {
    this.allPoolList = [...this.charaPoolList, ...this.weaponPoolList]
    this.poolList = this.allPoolList
    this.categoryList = [
      { name: 'all', value: '全部', num: this.allPoolList.length },
      { name: 'chara', value: '角色', num: this.charaPoolList.length },
      { name: 'weapon', value: '武器', num: this.weaponPoolList.length }
    ]
  }
}
</script>
<style lang="scss" scoped>
.draw-pool {
  height: 602rem;
  text-align: center;
  > .pool-title {
    width: 405rem;
    margin: 0 auto;
    display: flex;
    > .select-pool {
      flex: 1;
      > input[type='radio'] {
        display: none;
      }
      &:nth-of-type(1) {
        > input[type='radio'] {
          &:checked + span {
            border-image-source: url('~@/assets/images/icon/all_active.png');
          }
        }
      }
      &:nth-of-type(2) {
        > input[type='radio'] {
          &:checked + span {
            border-image-source: url('~@/assets/images/icon/chara_active.png');
          }
        }
      }
      &:nth-of-type(3) {
        > input[type='radio'] {
          &:checked + span {
            border-image-source: url('~@/assets/images/icon/weapon_active.png');
          }
        }
      }
      > span {
        display: block;
        height: 38rem;
        line-height: 20rem;
        color: #fff;
        box-sizing: border-box;
        border-style: solid;
        margin-left: -5rem;
        cursor: pointer;
      }
      > .all {
        border-width: 10rem 41rem 5rem 42rem;
        border-image: url('~@/assets/images/icon/all_default.png') 10 41 5 42 fill;
      }
      > .chara {
        border-width: 10rem 27rem 5rem 56rem;
        border-image: url('~@/assets/images/icon/chara_default.png') 10 27 5 56 fill;
      }
      > .weapon {
        border-width: 10rem 27rem 5rem 56rem;
        border-image: url('~@/assets/images/icon/weapon_default.png') 10 27 5 56 fill;
      }
    }
  }
  .pool {
    margin-top: 6rem;
    position: relative;
    > .pools {
      height: 507rem;
      width: 200%;
      margin-left: calc(50% - 405rem / 2);
      > .pools-image {
        float: left;
        width: 240rem;
        margin-left: 20rem;
      }
      > .pools-image:first-child {
        margin-left: 0;
      }
      > .active {
        width: 405rem;
      }
    }
    > .arrow {
      width: 32rem;
      height: 54rem;
      position: absolute;
      cursor: pointer;
      top: 50%;
    }
    > .left {
      left: 0;
      transform: translateY(-50%) rotateY(180deg);
      animation: previous 0.35s linear infinite alternate;
    }
    > .right {
      right: 0;
      transform: translateY(-50%);
      animation: next 0.35s linear infinite alternate;
    }
  }
  .details {
    background-color: #0d0d0d;
    position: relative;
    border: 1rem solid #1b979f;
    width: 405rem;
    height: 38rem;
    color: #1b979f;
    text-align: center;
    box-sizing: border-box;
    line-height: 36rem;
    font-size: 14rem;
    margin-top: 9rem;
    cursor: pointer;
    &:active {
      background-color: #d9b626;
      border-color: #e9c322;
      color: #fff;
      box-shadow: 0 0 4rem #e9c322;
    }
  }
}

.poolTransition {
  transition: all 0.4s;
}

@keyframes previous {
  from {
    left: 0;
  }
  to {
    left: -6rem;
  }
}
@keyframes next {
  from {
    right: 0;
  }
  to {
    right: -6rem;
  }
}
</style>
