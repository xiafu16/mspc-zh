<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  src: string
  title?: string
  autoplay?: boolean
  loop?: boolean
  volume?: number
  showVolume?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  autoplay: false,
  loop: false,
  volume: 0.7,
  showVolume: true
})

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const currentVolume = ref(props.volume)
const isMuted = ref(false)
const isLoop = ref(props.loop)
const audioReady = ref(false)

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// 初始化音频
onMounted(() => {
  if (!props.src) {
    console.warn('AudioPlayer: src 属性是必需的')
    return
  }

  audio.value = new Audio(props.src)
  audio.value.volume = currentVolume.value
  audio.value.loop = isLoop.value

  // 音频事件监听
  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = audio.value!.duration
    audioReady.value = true
  })

  audio.value.addEventListener('timeupdate', () => {
    if (audio.value) {
      currentTime.value = audio.value.currentTime
    }
  })

  audio.value.addEventListener('ended', () => {
    isPlaying.value = false
    if (!isLoop.value) {
      currentTime.value = 0
    }
  })

  audio.value.addEventListener('play', () => {
    isPlaying.value = true
  })

  audio.value.addEventListener('pause', () => {
    isPlaying.value = false
  })

  audio.value.addEventListener('error', (e) => {
    console.error('音频加载错误:', e)
    audioReady.value = false
  })

  // 如果设置了自动播放，需要用户交互后才能播放
  if (props.autoplay) {
    const handleFirstInteraction = () => {
      if (audio.value && audioReady.value) {
        audio.value.play().catch(err => {
          console.warn('自动播放失败，需要用户交互:', err)
        })
      }
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })
  }
})

// 清理资源
onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value.src = ''
    audio.value = null
  }
})

// 监听 props 变化
watch(() => props.src, (newSrc) => {
  if (audio.value && newSrc) {
    audio.value.src = newSrc
    audio.value.load()
    currentTime.value = 0
  }
})

watch(() => props.loop, (newLoop) => {
  isLoop.value = newLoop
  if (audio.value) {
    audio.value.loop = newLoop
  }
})

// 播放/暂停切换
const togglePlay = () => {
  if (!audio.value || !audioReady.value) return

  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play().catch(err => {
      console.error('播放失败:', err)
    })
  }
}

// 跳转到指定位置
const seekTo = (e: MouseEvent) => {
  if (!audio.value || !audioReady.value) return

  const progressContainer = e.currentTarget as HTMLElement
  const rect = progressContainer.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  const newTime = percent * duration.value

  audio.value.currentTime = newTime
  currentTime.value = newTime
}

// 切换静音
const toggleMute = () => {
  if (!audio.value) return

  if (isMuted.value) {
    audio.value.volume = currentVolume.value
    isMuted.value = false
  } else {
    audio.value.volume = 0
    isMuted.value = true
  }
}

// 改变音量
const changeVolume = (e: Event) => {
  const target = e.target as HTMLInputElement
  const newVolume = parseFloat(target.value)
  currentVolume.value = newVolume

  if (audio.value) {
    audio.value.volume = newVolume
    isMuted.value = newVolume === 0
  }
}

// 切换循环
const toggleLoop = () => {
  isLoop.value = !isLoop.value
  if (audio.value) {
    audio.value.loop = isLoop.value
  }
}

// 格式化时间显示
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00'

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="audio-player-wrapper">
    <div class="audio-player">
      <button
        @click="togglePlay"
        :disabled="!audioReady"
        class="play-button"
        :class="{ playing: isPlaying, paused: !isPlaying }"
        :title="isPlaying ? '暂停' : '播放'"
      >
        <svg v-if="!isPlaying" class="play-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else class="pause-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
      </button>

      <div class="audio-info">
        <div class="audio-title" v-if="title">{{ title }}</div>
        <div class="audio-controls">
          <div class="progress-container" @click="seekTo">
            <div class="progress-bar">
              <div class="progress-filled" :style="{ width: progressPercentage + '%' }"></div>
              <div class="progress-handle" :style="{ left: progressPercentage + '%' }"></div>
            </div>
          </div>
          <div class="time-info">
            <span class="time-current">{{ formatTime(currentTime) }}</span>
            <span class="time-separator">/</span>
            <span class="time-total">{{ formatTime(duration) }}</span>
          </div>
        </div>
      </div>

      <div class="audio-actions">
        <div class="volume-control" v-if="showVolume">
          <button
            @click="toggleMute"
            class="volume-button"
            :title="isMuted ? '取消静音' : '静音'"
          >
            <svg v-if="isMuted || currentVolume === 0" class="volume-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
            <svg v-else-if="currentVolume < 0.5" class="volume-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
            <svg v-else class="volume-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="isMuted ? 0 : currentVolume"
            @input="changeVolume"
            class="volume-slider"
            title="音量调节"
          />
        </div>
        <button
          @click="toggleLoop"
          class="loop-button"
          :class="{ active: isLoop }"
          :title="isLoop ? '取消循环' : '循环播放'"
        >
          <svg class="loop-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-player-wrapper {
  margin: 1.5rem 0;
}

.audio-player {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.audio-player:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.play-button {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.play-button:hover:not(:disabled) {
  background: var(--vp-c-brand-light);
  transform: scale(1.05);
}

.play-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* .play-button.playing {
  background: var(--vp-c-brand-dark);
} */

.play-icon,
.pause-icon {
  width: 24px;
  height: 24px;
}

.audio-info {
  flex: 1;
  min-width: 0;
}

.audio-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.audio-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-container {
  cursor: pointer;
  padding: 8px 0;
  margin: -8px 0;
}

.progress-bar {
  position: relative;
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}

.progress-filled {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 3px;
  transition: width 0.1s linear;
}

.progress-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-container:hover .progress-handle {
  opacity: 1;
}

.time-info {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.time-separator {
  color: var(--vp-c-text-3);
}

.audio-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.volume-button:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.volume-icon {
  width: 20px;
  height: 20px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  accent-color: var(--vp-c-brand);
  cursor: pointer;
}

.loop-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.loop-button:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.loop-button.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.loop-icon {
  width: 20px;
  height: 20px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .audio-player {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .audio-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .volume-control {
    flex: 1;
  }

  .volume-slider {
    flex: 1;
    max-width: 120px;
  }
}
</style>
