<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { frontmatter } = useData()

const state = reactive({
  audio: new Audio(),
  isUserInteracted: false,
  isPlaying: false,
  volume: 0.6,
})

const playAudio = (src?: string) => {
  if (!src) return
  state.audio.src = src
  state.audio.loop = true
  state.audio.volume = state.volume
  state.audio.play()
    .then(() => { state.isPlaying = true })
    .catch(err => console.warn('播放失败:', err))
}

const togglePlay = () => {
  if (!state.isUserInteracted) return
  if (state.isPlaying) {
    state.audio.pause()
    state.isPlaying = false
  } else {
    playAudio(state.audio.src)
  }
}

const changeVolume = (e: Event) => {
  const target = e.target as HTMLInputElement
  state.volume = parseFloat(target.value)
  state.audio.volume = state.volume
}

// 监听页面 frontmatter.audio 变化
watch(
  () => [route.path, frontmatter.value?.audio],
  ([, audioSrc]) => {
    if (!state.isUserInteracted) return
    if (audioSrc) {
      playAudio(audioSrc)
    } else {
      state.audio.pause()
      state.isPlaying = false
    }
  },
  { immediate: true }
)

// 第一次交互后解锁播放权限
onMounted(() => {
  const unlock = () => {
    state.isUserInteracted = true
    if (frontmatter.value?.audio) {
      playAudio(frontmatter.value.audio)
    }
    document.removeEventListener('click', unlock)
    document.removeEventListener('touchstart', unlock)
  }
  document.addEventListener('click', unlock)
  document.addEventListener('touchstart', unlock)
})
</script>

<template>
  <div
    class="fixed bottom-4 right-4 bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-4 py-2 flex items-center gap-3 z-50 border border-gray-200"
  >
    <button
      @click="togglePlay"
      class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition"
      :title="state.isPlaying ? '暂停' : '播放'"
    >
      <span v-if="!state.isPlaying">▶️</span>
      <span v-else>⏸️</span>
    </button>

    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      :value="state.volume"
      @input="changeVolume"
      class="w-24 accent-blue-500"
      title="音量调节"
    />
  </div>
</template>

<style scoped>
.fixed {
  font-size: 14px;
}
</style>