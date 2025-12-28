<script setup>
  import {computed} from 'vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const category = computed(() => {
  if(!props.item.taxonomies) return props.item.categories.join(',') || ''
  const cats = props.item.taxonomies.category || []
  // 去除cats中每一项的name
  return cats.map(item => item.name).join(', ')
})
</script>

<template>
  <article
    class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-6 border border-gray-100">
    <!-- 文章图片区域 -->
    <div class="relative h-48 overflow-hidden">
      <img :src="item.metas._nv_thumbnail" v-if="item.metas._nv_thumbnail" :alt="item.title"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
      <div v-else class="w-full h-full bg-gray-200"></div>
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-full">
          {{ category || '无分类' }}
        </span>
      </div>
    </div>

    <!-- 文章内容区域 -->
    <div class="p-6">
      <!-- 文章标题 -->
      <h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
        {{ item.title || '未设置标题' }}
      </h2>

      <!-- 文章摘要 -->
      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ item.excerpt }}
      </p>

      <!-- 文章元信息 -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center space-x-4">
          <!-- 作者信息 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">{{ item.author_name || '匿名作者' }}</span>
          </div>

          <!-- 发布日期 -->
          <div class="flex items-center space-x-1 text-sm text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{{ item.date || '2024-01-01' }}</span>
          </div>
        </div>

        <!-- 阅读更多按钮 -->
        <router-link :to="`/${item.slug}`"
          class="inline-flex items-center p-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
          阅读更多
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </router-link>
      </div>
    </div>
  </article>
</template>
