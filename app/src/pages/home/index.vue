<script setup>
import { ref } from 'vue'
import { Pagination, ArticleCard, NavMenu } from '@/components'
import { axiosPost } from '@/assets/utils'
import useAppStore from "@/bases/store/app";
const appStore = useAppStore()
const articles = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
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
  totalPages.value = data.pagination.total
}
requestData()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 分类菜单 -->
    <nav class="mb-8">
      <nav-menu :navs="appStore.cateNav" />
    </nav>
    <!-- 文章列表 -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <template v-for="item in articles" :key="item.id">
        <article-card :item="item" />
      </template>

    </section>
    <!-- 分页导航 -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
    <!-- 站点底部 -->
    <footer class="mt-12 text-center text-gray-500">
      {{ appStore.site_metas.base_copyright }}
    </footer>
  </div>
</template>
<style scoped></style>
