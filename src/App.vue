<script setup lang="ts">
import { onMounted, ref } from "vue";
import Draw from "@/views/Draw.vue";

defineOptions( {
    name: "App"
} );

const [ defaultBaseWidth, defaultBaseHeight ] = [ 50, 95 ];

const screenHeight = ref( "0" );
const baseWidth = ref( "0" );
const baseHeight = ref( "0" );

function resetWindow() {
    const htmlEle = document.documentElement;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    // 1rem代表多少px
    screenHeight.value = height + "px";
    baseWidth.value = width + "px";
    // 当跟随宽度缩放高度要溢出时，修改为固定高度且根据高度缩放
    let remSize = width / defaultBaseWidth;
    if ( defaultBaseHeight * remSize > height ) {
        remSize = height / defaultBaseHeight;
        baseHeight.value = height + "px";
    } else {
        baseHeight.value = defaultBaseHeight * remSize + "px";
    }
    htmlEle.style.fontSize = remSize + "px";
}

onMounted( () => {
    window.addEventListener( "resize", resetWindow );
    resetWindow();
} );
</script>

<template>
    <div id="app">
        <Draw :style="{'--screenHeight': screenHeight, '--baseWidth': baseWidth, '--baseHeight': baseHeight}" />
    </div>
</template>
