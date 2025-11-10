# 音频播放器使用指南

## 简介

`AudioPlayer` 是一个功能完整的音频播放组件，可以在 Markdown 文档中直接使用，实现智慧导览功能。

## 基本用法

在 Markdown 文件中，你可以直接使用 `<AudioPlayer>` 组件：

```markdown
<AudioPlayer src="/audio/example.mp3" />
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `src` | `string` | **必填** | 音频文件的路径（相对路径或完整 URL） |
| `title` | `string` | `''` | 音频标题，显示在播放器上方 |
| `autoplay` | `boolean` | `false` | 是否自动播放（需要用户交互后才能播放） |
| `loop` | `boolean` | `false` | 是否循环播放 |
| `volume` | `number` | `0.7` | 初始音量（0-1 之间） |
| `showVolume` | `boolean` | `true` | 是否显示音量控制 |

## 使用示例

### 基础用法

最简单的用法，只需要提供音频路径：

```markdown
<AudioPlayer src="/audio/marine-life.mp3" />
```

### 添加标题

为音频添加标题，方便用户识别：

```markdown
<AudioPlayer 
  src="/audio/shark-intro.mp3" 
  title="鲨鱼知识讲解"
/>
```

### 循环播放

适用于背景音乐或持续播放的内容：

```markdown
<AudioPlayer 
  src="/audio/ocean-ambience.mp3" 
  title="海洋环境音"
  :loop="true"
/>
```

### 自定义音量

设置初始音量：

```markdown
<AudioPlayer 
  src="/audio/guide.mp3" 
  title="导览音频"
  :volume="0.8"
/>
```

### 完整配置示例

```markdown
<AudioPlayer 
  src="https://example.com/audio/tour.mp3" 
  title="海洋生物导览"
  :autoplay="false"
  :loop="false"
  :volume="0.75"
  :showVolume="true"
/>
```

## 功能特性

- ✅ 播放/暂停控制
- ✅ 进度条拖拽跳转
- ✅ 音量调节（0-100%）
- ✅ 静音切换
- ✅ 循环播放切换
- ✅ 时间显示（当前时间/总时长）
- ✅ 响应式设计（移动端适配）
- ✅ 自动适配主题（深色/浅色模式）

## 音频文件路径

### 相对路径

如果音频文件放在 `docs/public/audio/` 目录下：

```markdown
<AudioPlayer src="/audio/example.mp3" />
```

### 绝对 URL

也可以使用完整的 URL：

```markdown
<AudioPlayer src="https://example.com/audio/tour.mp3" />
```

## 注意事项

1. **浏览器自动播放策略**：由于浏览器的自动播放策略，即使设置了 `autoplay`，也需要用户与页面交互后才会开始播放。

2. **音频格式支持**：建议使用 `MP3` 格式以确保最大兼容性，也可以使用 `OGG`、`WAV` 等格式。

3. **文件大小**：大文件可能影响页面加载速度，建议压缩音频文件或使用 CDN。

4. **移动端体验**：组件已针对移动端进行了优化，在小屏幕设备上会自动调整布局。

## 在 VitePress 中的集成

组件已经在 `.vitepress/theme/index.ts` 中注册为全局组件，无需额外导入即可在任何 Markdown 文件中使用。

