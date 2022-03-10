<template>
  <div class="draw-pool">
    <div class="pool-title">
      <label v-for="(item, index) of categoryList" :key="index" class="select-pool">
        <input type="radio" :value="item.name" v-model="category" @change="poolTitleChange(item.name)"/>
        <span :class="item.name">{{ `${item.value}(${item.num})` }}</span>
      </label>
    </div>
    <div class="pool">
      <div class="pools" :class="{ poolTransition: isTransition }" ref="poolsRef">
        <img v-for="(item, index) of poolList" :key="index" class="pools-image"
             :class="{ active: item.active, poolTransition: isTransition }"
             :src="`https://file.uimentama.com/saomd-assets/pool/${item.name}.png`" draggable="false" alt="ERROR"/>
      </div>
      <img v-if="leftArrowFlag" class="arrow left" src="/src/assets/images/icon/arrow.png" draggable="false" alt="ERROR"
           @click="arrowHandle('left')"/>
      <img v-if="rightArrowFlag" class="arrow right" src="/src/assets/images/icon/arrow.png" draggable="false"
           alt="ERROR"
           @click="arrowHandle('right')"/>
    </div>
    <button class="details">出現角色一覽/説明</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, computed, ref, Ref, toRefs, onMounted, watch, PropType} from "vue"
import {IPropState, IPoolItem, Category} from "@/type/pool";

export default defineComponent({
  name: "Pool",
  emits: ["changePoolType"],
  setup(props, {emit}) {
    const state: IPropState = reactive({
      category: 'all',
      charaPoolList: [{type: 'character', name: 'chara', active: false}],
      weaponPoolList: [{type: 'weapon', name: 'weapon', active: false}],
      allPoolList: [],
      poolList: [],
      categoryList: [],
      activeIndex: 0, // 当前显示的图片在数组中的序号
      isTransition: false, // 是否拥有过度效果
      poolType: ''
    })

    const poolsRef: Ref<HTMLDivElement | null> = ref(null)

    const leftArrowFlag = computed(() => state.activeIndex !== 0)
    const rightArrowFlag = computed(() => state.activeIndex !== state.poolList.length - 1)

    onMounted(() => {
      state.allPoolList = [...state.charaPoolList, ...state.weaponPoolList]
      state.poolList = state.allPoolList
      state.categoryList = [
        {name: 'all', value: '全部', num: state.allPoolList.length},
        {name: 'chara', value: '角色', num: state.charaPoolList.length},
        {name: 'weapon', value: '武器', num: state.weaponPoolList.length}
      ]
    })

    watch(() => state.poolList, (list: IPoolItem[]) => {
      state.activeIndex = 0
      state.poolType = state.poolList[state.activeIndex].type
      const poolDiv = poolsRef.value
      if (poolDiv) {
        poolDiv.style.transform = ''
        poolDiv.style.width = `width:${(24 + 2) * (state.poolList.length - 1) + 50.7}rem`
      }
      initPoolArr(list)
      setTimeout(() => {
        state.isTransition = true
      }, 400)
    })

    function poolTitleChange(name: Category) {
      state.isTransition = false
      switch (name) {
        case 'all':
          state.poolList = state.allPoolList
          break
        case 'chara':
          state.poolList = state.charaPoolList
          break
        case 'weapon':
          state.poolList = state.weaponPoolList
          break
      }
    }

    watch(() => state.poolType, (type: string) => {
      emit('changePoolType', type)
    })

    // 左右点击事件
    function arrowHandle(direct: "left" | "right") {
      state.activeIndex = direct === 'left' ? state.activeIndex - 1 : state.activeIndex + 1
      state.poolType = state.poolList[state.activeIndex].type
      const poolsDiv = poolsRef.value
      if (poolsDiv) {
        poolsDiv.style.transform = `translateX(${-26 * state.activeIndex}rem)`
      }
      initPoolArr(state.poolList)
    }

    // 切换设置当前卡池active状态
    function initPoolArr(poolList: IPoolItem[]) {
      poolList.forEach(item => {
        item.active = false
      })
      poolList[state.activeIndex].active = true
    }

    return {
      ...toRefs(state),
      poolsRef,
      leftArrowFlag,
      rightArrowFlag,
      poolTitleChange,
      arrowHandle
    }
  }
})
</script>
<style lang="scss" scoped>
.draw-pool {
  height: 60.2rem;
  text-align: center;

  > .pool-title {
    width: 40.5rem;
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
            border-image-source: url('/src/assets/images/icon/all_active.png');
          }
        }
      }

      &:nth-of-type(2) {
        > input[type='radio'] {
          &:checked + span {
            border-image-source: url('/src/assets/images/icon/chara_active.png');
          }
        }
      }

      &:nth-of-type(3) {
        > input[type='radio'] {
          &:checked + span {
            border-image-source: url('/src/assets/images/icon/weapon_active.png');
          }
        }
      }

      > span {
        display: block;
        height: 3.8rem;
        line-height: 2rem;
        color: #fff;
        box-sizing: border-box;
        border-style: solid;
        margin-left: -0.5rem;
        cursor: pointer;
      }

      > .all {
        border-width: 1rem 4.1rem 0.5rem 4.2rem;
        border-image: url('/src/assets/images/icon/all_default.png') 10 41 5 42 fill;
      }

      > .chara {
        border-width: 1rem 2.7rem 0.5rem 5.6rem;
        border-image: url('/src/assets/images/icon/chara_default.png') 10 27 5 56 fill;
      }

      > .weapon {
        border-width: 1rem 2.7rem 0.5rem 5.6rem;
        border-image: url('/src/assets/images/icon/weapon_default.png') 10 27 5 56 fill;
      }
    }
  }

  .pool {
    margin-top: 0.6rem;
    position: relative;

    > .pools {
      height: 50.7rem;
      width: 200%;
      margin-left: calc(50% - 40.5rem / 2);

      > .pools-image {
        float: left;
        width: 24rem;
        margin-left: 2rem;
      }

      > .pools-image:first-child {
        margin-left: 0;
      }

      > .active {
        width: 40.5rem;
      }
    }

    > .arrow {
      width: 3.2rem;
      height: 5.4rem;
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
    border: 0.1rem solid #1b979f;
    width: 40.5rem;
    height: 3.8rem;
    color: #1b979f;
    text-align: center;
    box-sizing: border-box;
    line-height: 3.6rem;
    font-size: 1.4rem;
    margin-top: 0.9rem;
    cursor: pointer;

    &:active {
      background-color: #d9b626;
      border-color: #e9c322;
      color: #fff;
      box-shadow: 0 0 0.4rem #e9c322;
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
    left: -0.6rem;
  }
}

@keyframes next {
  from {
    right: 0;
  }
  to {
    right: -0.6rem;
  }
}
</style>
