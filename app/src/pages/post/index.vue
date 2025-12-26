<script setup>
import { ref, computed } from 'vue';
import { BlockParser } from '@/components'
import { useRouter } from 'vue-router'
import { axiosPost } from '@/assets/utils'
import useAppStore from '@/bases/store/app'
const appStore = useAppStore()
const router = useRouter()
const post = ref({
  metas:{},
  content: {
    blocks: []
  },
  taxonomies:{
    category: [],
    tag: []
  }
})
async function requestData() {
  const { data } = await axiosPost('/nv/front-stage/get-post', {
    slug: encodeURIComponent(decodeURIComponent(appStore.post_slug)),
  })
  if (data.error) {
    router.replace({ name: 'nothing-is-here' })
    return;
  }
  post.value = data
}
requestData()
const category = computed(() => {
  const cats = post.value.taxonomies.category
  // 去除cats中每一项的name
  return cats.map(item => item.name).join(', ')
})
const tags = computed(() => {
  const tag = post.value.taxonomies.tag
  // 去除tag中每一项的name
  return tag.map(item => item.name).join(', ')
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 封面图 -->
    <img :src="post.metas._nv_thumbnail" alt="封面图" class="w-full h-64 object-cover mb-8" />
    <!-- 文章标题 -->
    <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
    <!-- 文章元信息 -->
    <div class="text-gray-500 mb-8">
      <span>作者: {{ post.author_name }}</span> |
      <span>发布日期: {{ new Date(post.modified_time).toLocaleString() }}</span> |
      <span>分类: {{ category }}</span> |
      <span>标签: {{ tags }}</span>
    </div>
    <!-- 文章内容 -->
    <main class="prose max-w-none">
      <BlockParser is="article" :blocks="post.content.blocks" ref="article" />
    </main>
  </div>
</template>
<style scoped></style>
