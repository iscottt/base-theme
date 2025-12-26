<script setup>
import { ref } from 'vue';
import { BlockParser } from '@/components'
import { useRouter } from 'vue-router'
import { axiosPost } from '@/assets/utils'
import useAppStore from '@/bases/store/app'
const appStore = useAppStore()
const router = useRouter()
const post = ref({
  content: {
    blocks: []
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
  post.value = data.post
}
</script>

<template>
  <div>
    <!-- 封面图 -->
    <img alt="封面图" class="w-full h-64 object-cover mb-8" />
    <!-- 文章标题 -->
    <h1 class="text-4xl font-bold mb-4">文章标题</h1>
    <!-- 文章元信息 -->
    <div class="text-gray-500 mb-8">
      <span>作者: 张三</span> |
      <span>发布日期: 2024-06-01</span> |
      <span>分类: 分类1</span> |
      <span>标签: 标签A, 标签B</span>
    </div>
    <!-- 文章内容 -->
    <main>
      <BlockParser is="article" :blocks="post.content.blocks" ref="article" />
    </main>
  </div>
</template>
<style scoped></style>
