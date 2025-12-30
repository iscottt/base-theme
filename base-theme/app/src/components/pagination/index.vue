<script setup>
import { computed } from 'vue'
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['pageChange'])
const pageItems = computed(() => {
  const items = []
  const delta = 1 // 当前页前后显示页码数

  // 始终添加第一页
  items.push(1)

  // 计算中间页码范围
  const leftStart = Math.max(2, props.currentPage - delta)
  const rightEnd = Math.min(props.totalPages - 1, props.currentPage + delta)

  // 处理左侧省略号
  if (leftStart > 2)
    items.push('...')

  // 添加中间页码
  for (let i = leftStart; i <= rightEnd; i++) {
    items.push(i)
  }

  // 处理右侧省略号
  if (rightEnd < props.totalPages - 1)
    items.push('...')

  // 添加最后一页（当总页数大于1时）
  if (props.totalPages > 1)
    items.push(props.totalPages)

  return items
})

const prevPage = computed(() => Math.max(1, props.currentPage - 1))
const nextPage = computed(() => Math.min(props.totalPages, props.currentPage + 1))
</script>

<template>
  <nav class="flex items-center justify-center space-x-2" role="navigation">
    <!-- 上一页 -->
    <a v-if="currentPage > 1" class="group" @click="emits('pageChange', prevPage)">
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
        <span class="btn-meta">上一页</span>
      </button>
    </a>

    <!-- 页码列表 -->
    <template v-for="(item, index) in pageItems" :key="index">
      <!-- 普通页码 -->
      <a v-if="typeof item === 'number' && item !== currentPage"
        class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        @click="emits('pageChange', item)">
        {{ item }}
      </a>

      <!-- 当前页码 -->
      <span v-else-if="typeof item === 'number'" aria-current="page"
        class="px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-lg">
        {{ item }}
      </span>

      <!-- 省略号 -->
      <span v-else class="px-3 py-2 text-sm font-medium text-gray-500">
        ...
      </span>
    </template>

    <!-- 下一页 -->
    <a v-if="currentPage < totalPages" class="group" @click="emits('pageChange', nextPage)">
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
        <span class="btn-meta">下一页</span>
      </button>
    </a>
  </nav>
</template>
