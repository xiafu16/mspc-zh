<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

// 组件1、2、3
import BSZ from "./BuSuanZi.vue";
</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">

    <!-- doc-footer-before插槽 -->
    <!-- <template #doc-footer-before></template> -->

    <!-- layout-top插槽 -->
    <!-- <template #layout-top></template> -->

    <!-- layout-bottom插槽 -->
    <template #layout-bottom>
      <BSZ />
    </template>

  </DefaultTheme.Layout>
</template>

<style scoped>
</style>