<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import type { ImageInfo } from "@/type/ImageInfo";
import type { Category, ICategoryItem, IPoolItem } from "@/type/pool";

defineOptions( {
    name: "Pool"
} );

const emit = defineEmits<{
    changePoolType: [ type: ImageInfo["type"] ];
}>();

const category = ref<Category>( "all" );
const charaPoolList = ref<IPoolItem[]>( [ { type: "character", name: "chara", active: false } ] );
const weaponPoolList = ref<IPoolItem[]>( [ { type: "weapon", name: "weapon", active: false } ] );
const allPoolList = ref<IPoolItem[]>( [] );
const poolList = ref<IPoolItem[]>( [] );
const categoryList = ref<ICategoryItem[]>( [] );
const activeIndex = ref( 0 );
const isTransition = ref( false );
const poolType = ref<ImageInfo["type"] | "">( "" );
const poolsRef = useTemplateRef<HTMLDivElement>( "poolsRef" );

const leftArrowFlag = computed( () => activeIndex.value !== 0 );
const rightArrowFlag = computed( () => activeIndex.value !== poolList.value.length - 1 );

onMounted( () => {
    allPoolList.value = [ ...charaPoolList.value, ...weaponPoolList.value ];
    poolList.value = allPoolList.value;
    categoryList.value = [
        { name: "all", value: "全部", num: allPoolList.value.length },
        { name: "chara", value: "角色", num: charaPoolList.value.length },
        { name: "weapon", value: "武器", num: weaponPoolList.value.length }
    ];
} );

watch( poolList, ( list: IPoolItem[] ) => {
    activeIndex.value = 0;
    poolType.value = poolList.value[activeIndex.value].type;
    const poolDiv = poolsRef.value;
    if ( poolDiv ) {
        poolDiv.style.transform = "";
        poolDiv.style.width = `width:${ ( 24 + 2 ) * ( poolList.value.length - 1 ) + 50.7 }rem`;
    }
    initPoolArr( list );
    setTimeout( () => {
        isTransition.value = true;
    }, 400 );
} );

watch( poolType, type => {
    if ( type ) {
        emit( "changePoolType", type );
    }
} );

function poolTitleChange( name: Category ) {
    isTransition.value = false;
    switch ( name ) {
        case "all":
            poolList.value = allPoolList.value;
            break;
        case "chara":
            poolList.value = charaPoolList.value;
            break;
        case "weapon":
            poolList.value = weaponPoolList.value;
            break;
    }
}

/* 左右点击事件 */
function arrowHandle( direct: "left" | "right" ) {
    activeIndex.value = direct === "left" ? activeIndex.value - 1 : activeIndex.value + 1;
    poolType.value = poolList.value[activeIndex.value].type;
    const poolsDiv = poolsRef.value;
    if ( poolsDiv ) {
        poolsDiv.style.transform = `translateX(${ -26 * activeIndex.value }rem)`;
    }
    initPoolArr( poolList.value );
}

/* 切换设置当前卡池active状态 */
function initPoolArr( list: IPoolItem[] ) {
    list.forEach( item => {
        item.active = false;
    } );
    list[activeIndex.value].active = true;
}
</script>

<template>
    <div class="draw-pool">
        <div class="pool-title">
            <label v-for="(item, index) of categoryList" :key="index" class="select-pool">
                <input type="radio" :value="item.name" v-model="category" @change="poolTitleChange(item.name)" />
                <span :class="item.name">{{ `${ item.value }(${ item.num })` }}</span>
            </label>
        </div>
        <div class="pool">
            <div class="pools" :class="{ poolTransition: isTransition }" ref="poolsRef">
                <img v-for="(item, index) of poolList" :key="index" class="pools-image"
                     :class="{ active: item.active, poolTransition: isTransition }"
                     :src="`https://s3.marrydream.top/saomd/images/pool/${item.name}.png`"
                     draggable="false" alt="ERROR" />
            </div>
            <img v-if="leftArrowFlag" class="arrow left" src="/src/assets/images/icon/arrow.png" draggable="false"
                 alt="ERROR"
                 @click="arrowHandle('left')" />
            <img v-if="rightArrowFlag" class="arrow right" src="/src/assets/images/icon/arrow.png" draggable="false"
                 alt="ERROR"
                 @click="arrowHandle('right')" />
        </div>
        <button class="details">出現角色一覽/説明</button>
    </div>
</template>

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

      > input[type="radio"] {
        display: none;
      }

      &:nth-of-type(1) {
        > input[type="radio"] {
          &:checked + span {
            border-image-source: url("/src/assets/images/icon/all_active.png");
          }
        }
      }

      &:nth-of-type(2) {
        > input[type="radio"] {
          &:checked + span {
            border-image-source: url("/src/assets/images/icon/chara_active.png");
          }
        }
      }

      &:nth-of-type(3) {
        > input[type="radio"] {
          &:checked + span {
            border-image-source: url("/src/assets/images/icon/weapon_active.png");
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
        border-image: url("/src/assets/images/icon/all_default.png") 10 41 5 42 fill;
      }

      > .chara {
        border-width: 1rem 2.7rem 0.5rem 5.6rem;
        border-image: url("/src/assets/images/icon/chara_default.png") 10 27 5 56 fill;
      }

      > .weapon {
        border-width: 1rem 2.7rem 0.5rem 5.6rem;
        border-image: url("/src/assets/images/icon/weapon_default.png") 10 27 5 56 fill;
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
