<script setup lang="ts">
import { computed } from "vue";
import type { ImageInfo } from "@/type/ImageInfo";

defineOptions( {
    name: "Package"
} );

const props = withDefaults( defineProps<{
    poolType?: ImageInfo["type"];
    drawList?: ImageInfo[];
}>(), {
    poolType: "character",
    drawList: () => []
} );

const cardImgStyle = computed( () => {
    return props.poolType === "character" ? {
        width: "11.3rem",
        left: "0.5rem",
        top: "1.2rem"
    } : {
        width: "10.3rem",
        left: "0.9rem",
        top: "1.8rem"
    };
} );
</script>

<template>
    <div class="result-pool">
        <div class="pool-contain">
            <div class="background-icon"></div>
            <div class="card-contain">
                <div :key="index" v-for="(item, index) in drawList" class="card">
                    <img class="card-iframe"
                         :src="`https://s3.marrydream.top/saomd/images/frame/frame_${item.star}.png`" alt="ERROR"
                         draggable="false" />
                    <img class="card-img" :style="cardImgStyle"
                         :src="`https://s3.marrydream.top/saomd/images/items/${item.type}_star${item.star}_job${item.job}_${item.attr}_${item.id}.png`"
                         alt="ERROR" draggable="false" />
                    <div class="attr-box">
                        <img class="card-attr"
                             :src="`https://s3.marrydream.top/saomd/images/attribute/icon_attribute_${item.attr}.png`"
                             alt="ERROR"
                             draggable="false" />
                        <img class="card-job"
                             :src="`https://s3.marrydream.top/saomd/images/job/icon_job_${item.job}.png`" alt="ERROR"
                             draggable="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.result-pool {
    height: 59.2rem;
    margin-top: 1rem;

    .pool-contain {
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 auto;
        padding: 1.5rem 0;
        width: 48.8rem;
        height: 55rem;
        background-color: rgba(205, 205, 205, 0.85);
        background-clip: content-box;
        overflow: hidden;

        &::before,
        &::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 1.5rem;
            background-color: #dfdfdf;
            opacity: 0.95;
        }

        &::before {
            top: 0;
            box-shadow: 0 0 0.3rem 0.3rem #fff inset, 0 0.5rem 0.3rem #888;
        }

        &::after {
            bottom: 0;
            box-shadow: 0 0 0.3rem 0.3rem #fff inset, 0 -0.5rem 0.3rem #888;
        }
        
        .background-icon {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;

            background:
                url("/src/assets/images/icon/result_bg_2.png") 0 14rem / 30rem 34.1rem no-repeat,
                url("/src/assets/images/icon/result_bg_1.png") 28.8rem 1.5rem / 20rem 18rem no-repeat;

            opacity: .5;
        }

        > * {
            position: relative;
            z-index: 1;
        }

        .card-contain {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            position: relative;

            .card {
                width: 12rem;
                height: 13.6rem;
                position: relative;
                margin: 0.1rem -0.1rem;
                background: url("/src/assets/images/icon/card_bg.png") 0.9rem 1.2rem no-repeat;
                background-size: 10.4rem 11.6rem;

                &:last-child {
                    margin-right: 11.4rem;
                }

                .attr-box {
                    width: 2.8rem;
                    height: 2.8rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    right: 0.7rem;
                    bottom: 0.3rem;
                    z-index: 20;

                    .card-attr {
                        width: inherit;
                    }

                    .card-job {
                        width: 2rem;
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
                    }
                }
            }
        }
    }
}
</style>
