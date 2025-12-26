<script setup>
import { ref, computed } from 'vue'
import { Pagination, ArticleCard, NavMenu } from '@/components'
import { axiosPost } from '@/assets/utils'
import useAppStore from "@/bases/store/app";
const appStore = useAppStore()
const articles = ref([])
const currentPage = ref(1)
const totalNum = ref(0)
const totalPages = computed(() => {
  return Math.ceil(totalNum.value / 12)
})
const handlePageChange = (page) => {
  currentPage.value = page
  requestData()
  globalThis.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
const requestData = async () => {
  const { data } = await axiosPost('/nv/front-stage/get-post-list', {
    post_type: 'article',
    current_page: currentPage.value,
    posts_per_page: 12
  })
  articles.value = data.data
  totalNum.value = data.pagination.total
}
requestData()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4">首页</h1>
    <!-- 分类菜单 -->
    <nav class="mb-8">
      <nav-menu :navs="appStore.cateNav || []" />
    </nav>
    <!-- 文章列表 -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <template v-for="item in articles" :key="item.id">
        <article-card :item="item" />
      </template>

    </section>
    <!-- 分页导航 -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
  </div>
</template>
<style scoped></style>
