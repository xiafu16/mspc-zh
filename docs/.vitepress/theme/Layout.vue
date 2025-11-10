<template>
  <Layout>
    <template #doc-before />
    <template #doc-after />
  </Layout>

  <GlobalAudio />
</template>

<script setup lang="ts">
import Layout from 'vitepress/theme'
import GlobalAudio from './components/GlobalAudio.vue'
</script>