<template>
  <div class="darw-base" @mouseup="oneImg=1;elevenImg=1">
    <div class="darw-contain">
      <div class="darw-title">
        <div class="pool-title">
          <img src="/img/icon/scout.png" alt />
        </div>
      </div>
      <div class="darw-pool">
        <div class="pool-title">
          <label v-for="(item,index) of categoryList" :key="index" class="select-pool">
            <input
              type="radio"
              :value="item.name"
              v-model="category"
              @change="poolTitleChange(item.name)"
            />
            <span :class="item.name">{{`${item.value}(${item.num})`}}</span>
          </label>
        </div>
        <div class="pool">
          <div class="pools">
            <img
              v-for="(item,index) of poolList"
              :key="index"
              :class="item.active?'active':'default'"
              :src="`/img/pool/${item.name}.png`"
              draggable="false"
              alt
            />
          </div>
          <img class="arrow left" src="/img/icon/arrow.png" draggable="false" alt />
          <img class="arrow right" src="/img/icon/arrow.png" draggable="false" alt />
        </div>
        <button class="details">出現角色一覽/説明</button>
      </div>
      <div class="darw-footer">
        <a class="one" @mousedown="oneImg=2">
          <img :src="`/img/icon/button_lottery_1_${oneImg}.png`" width="238" alt draggable="false" />
        </a>
        <a class="eleven" @mousedown="elevenImg=2">
          <img
            :src="`/img/icon/button_lottery_2_${elevenImg}.png`"
            width="238"
            alt
            draggable="false"
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oneImg: 1,
      elevenImg: 1,
      categoryList: [
        { name: 'all', value: '全部', num: 2 },
        { name: 'chara', value: '角色', num: 1 },
        { name: 'weapon', value: '武器', num: 1 },
      ],
      category: 'all',
      charaPoolList: [{ name: 'chara', active: true }],
      weaponPoolList: [{ name: 'weapon', active: false }],
      allPoolList: [],
      poolList: [],
    };
  },
  methods: {
    poolTitleChange(name) {
      switch (name) {
        case 'all':
          this.poolList = this.allPoolList;
          break;
        case 'chara':
          this.poolList = this.charaPoolList;
          break;
        case 'weapon':
          this.poolList = this.weaponPoolList;
          break;
      }
    },
  },
  mounted() {
    this.allPoolList = [...this.charaPoolList, ...this.weaponPoolList];
    this.poolList = this.allPoolList;
  },
};
</script>
<style lang="less" scoped>
.darw-base {
  min-height: 100%;
  padding-top: 20px;
  background: url('/img/background.jpg') fixed center center no-repeat;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  z-index: -2;
  > .darw-contain {
    width: 495px;
    margin: 0 auto;
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: url('/img/draw-bg.png') -80px no-repeat;
      background-size: cover;
      z-index: -1;
    }
    > .darw-title {
      height: 83px;
      overflow: hidden;
      > .pool-title {
        width: 231px;
        height: 47px;
        margin-top: 20px;
        background: url('/img/icon/panel.png') no-repeat;
        > img {
          margin: 7px 0 0 63px;
        }
      }
    }
    > .darw-pool {
      height: 602px;
      text-align: center;
      > .pool-title {
        width: 405px;
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
                border-image-source: url('/img/icon/all_active.png');
              }
            }
          }
          &:nth-of-type(2) {
            > input[type='radio'] {
              &:checked + span {
                border-image-source: url('/img/icon/chara_active.png');
              }
            }
          }
          &:nth-of-type(3) {
            > input[type='radio'] {
              &:checked + span {
                border-image-source: url('/img/icon/weapon_active.png');
              }
            }
          }
          > span {
            display: block;
            height: 38px;
            line-height: 20px;
            color: #fff;
            box-sizing: border-box;
            border-style: solid;
            margin-left: -5px;
            cursor: pointer;
          }
          > .all {
            border-width: 10px 41px 5px 42px;
            border-image: url('/img/icon/all_default.png') 10 41 5 42 fill;
          }
          > .chara {
            border-width: 10px 27px 5px 56px;
            border-image: url('/img/icon/chara_default.png') 10 27 5 56 fill;
          }
          > .weapon {
            border-width: 10px 27px 5px 56px;
            border-image: url('/img/icon/weapon_default.png') 10 27 5 56 fill;
          }
        }
      }
      .pool {
        margin-top: 6px;
        position: relative;
        > .pools {
          height: 507px;
          width: 200%;
          margin-left: 25px;
          > img {
            float: left;
            // width: 240px;
            width: 405px;
            margin-left: 20px;
          }
        }
        > .arrow {
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
        border: 1px solid #1b979f;
        width: 405px;
        height: 38px;
        color: #1b979f;
        text-align: center;
        box-sizing: border-box;
        line-height: 36px;
        font-size: 14px;
        margin-top: 9px;
        cursor: pointer;
        &:active {
          background-color: #d9b626;
          border-color: #e9c322;
          color: #fff;
          box-shadow: 0 0 4px #e9c322;
        }
      }
    }
    > .darw-footer {
      height: 195px;
      text-align: center;
      padding: 20px 0;
      box-sizing: border-box;
      a {
        display: inline-block;
        cursor: pointer;
      }
    }
  }
}
@keyframes previous {
  form {
    left: 0;
  }
  to {
    left: -6px;
  }
}
@keyframes next {
  form {
    right: 0;
  }
  to {
    right: -6px;
  }
}
</style>