<script setup>
import useAppStore from '@/bases/store/app'
import { ArticleCard, Pagination, NavMenu } from '@/components';
import { axiosPost } from '@/assets/utils';
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
const appStore = useAppStore()
const term_names = ref([])
const articles = ref([])
const totalNum = ref(0)
const totalPages = computed(() => {
  return Math.ceil(totalNum.value / 12)
})
const currentPage = ref(parseInt(route.params.page || '1'))
watch(() => term_names.value, () => {
  document.title = `${appStore.site_metas.nv_site_name} - ${term_names.value[0] || '全部文章'}`;
})
async function requestData() {
  const { data } = await axiosPost('/base/post-list', {
    post_type: 'article',
    // 这里假设每页显示10篇文章
    current_page: appStore.current_page,
    taxonomy: appStore.taxonomy,
    term_slug: appStore.term_slug,
    current_page: appStore.current_page,
  })
  articles.value = data.articles;
  term_names.value = data.term_names;
  // 检查是不是没有获取到数据。total是0 || current_page大于总的可能分页数。返回没有相关数据页面
  var { total, posts_per_page, current_page } = data.pagination;
  if (!total || !posts_per_page || !current_page || (Math.ceil(total / posts_per_page) < current_page)) {
    router.replace({ name: 'nothing-is-here' })
  } else {
    totalNum.value = total;
  }
}
function handlePageChange(page) {
  currentPage.value = page
  if (!appStore.term_slug) {
    router.push(`/articles/${page}`)
    return;
  }
  router.push(`/${appStore.taxonomy}/${appStore.term_slug}/${page}`)
}
requestData()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 分类标题 -->
    <h1 class="text-3xl font-bold mb-6">{{ term_names[0] || '全部文章' }}</h1>
    <nav class="mb-8">
      <nav-menu :navs="appStore.cateNav || []" />
    </nav>
    <!-- 该分类下的文章列表 -->
    <section v-if="articles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article-card v-for="item in articles" :key="item.id" :item="item" class="mb-6" />
    </section>
    <p v-else class="text-center text-gray-500 h-64 bg-gray-100 rounded-lg leading-64">暂无数据</p>
    <!-- 分页导航 -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
  </div>
</template>
<style scoped></style>
