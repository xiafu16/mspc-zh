<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

// bsz访问统计、返回顶部
import bsz from "./BuSuanZi.vue";
import backtotop from "./BackToTop.vue";

</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">

    <!-- doc-footer-before插槽,当前添加回到顶部的小火箭效果 -->
    <template #doc-footer-before>
      <backtotop />
    </template>

    <!-- layout-top插槽 -->
    <!-- <template #layout-top></template> -->

    <!-- layout-bottom插槽 -->
    <template #layout-bottom>
      <bsz />
    </template>

  </DefaultTheme.Layout>
</template>

<style scoped></style>