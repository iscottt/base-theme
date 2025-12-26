<script setup>
import useAppStore from '@/bases/store/app'
import { ArticleCard, Pagination, NavMenu } from '@/components';
import { axiosPost } from '@/assets/utils';
import { ref, watch } from 'vue';
const appStore = useAppStore()
const currentPage = ref(1)
const term_names = ref([])
const articles = ref([])
const totalPages = ref(0)
watch(() => term_names.value, () => {
  document.title = `${appStore.site_metas.nv_site_name} - ${term_names.value[0] || '全部文章'}`;
})
async function requestData() {
    const { data } = await axiosPost('/base/post-list', {
      post_type: 'article',
      // 这里假设每页显示10篇文章
      current_page: currentPage.value,
      taxonomy: appStore.taxonomy,
      term_slug: appStore.term_slug,
      current_page: appStore.current_page,
    })
    articles.value = data.articles;
    term_names.value = data.term_names;
    // 检查是不是没有获取到数据。total是0 || current_page大于总的可能分页数。返回没有相关数据页面
    var { total, posts_per_page, current_page } = data.pagination;
    if (!total || !posts_per_page || !current_page || (Math.ceil(total / posts_per_page) < current_page)) {
      this.$router.replace({ name: 'nothing-is-here' })
    } else {
      totalPages.value = total;
    }
  }
function handlePageChange(oage) {
    currentPage.value = page
    requestData()
    globalThis.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
requestData()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 分类标题 -->
    <h1 class="text-3xl font-bold mb-6">{{term_names[0] || '全部文章'}}</h1>
    <nav class="mb-8">
      <nav-menu :navs="appStore.cateNav || []" />
    </nav>
    <!-- 该分类下的文章列表 -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article-card v-for="item in articles" :key="item.id" :item="item" class="mb-6" />
    </section>
    <!-- 分页导航 -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
  </div>
</template>
<style scoped></style>
