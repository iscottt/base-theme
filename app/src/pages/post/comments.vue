<script setup>
import { ref, onMounted, computed } from 'vue';
import { Pagination } from '@/components';
import useAppStore from '@/bases/store/app'
// 假设这是你封装的请求方法
import { axiosPost } from '@/assets/utils';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
const appStore = useAppStore()
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
const comments = ref([]);
const newComment = ref('');
const email = ref('');
const url = ref('');
const username = ref('');
const isLoading = ref(false);
const isSubmitting = ref(false);
const reply2 = ref(0);
const totalNum = ref(0)
const totalPages = computed(() => {
  return Math.ceil(totalNum.value / 12)
})
const currentPage = ref(parseInt(route.params.comment_page || '1'))


// 获取评论列表
async function fetchComments() {
  isLoading.value = true;
  try {
    const { data } = await axiosPost('/nv/front-stage/get-comment-list', {
      post: props.post.id,
      current_page: currentPage.value,
      comments_per_page: 2
    });
    if (data && data.data) {
      comments.value = data.data;
      totalNum.value = data.pagination.total
    }
  } catch (error) {
    console.error('获取评论失败:', error);
  } finally {
    isLoading.value = false;
  }
}
function handlePageChange(page) {
  currentPage.value = page
  router.push(`/${props.post.slug}/comment-page-${page}`)
}


// 提交新评论
async function submitComment() {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;
  try {
    // 模拟提交请求，请替换为实际的API调用
    const { data } = await axiosPost('/nv/add-comment', {
      content: newComment.value,
      post_id: props.post.id,
      email: email.value,
      url: url.value,
      name: username.value,
      parent: reply2.value || undefined,
    });
    if (data.error) {
      window.$message.error(data.error)
      return
    }
    if (data.public) {
      if (!reply2.value)
        current_page.value = 1
      // 评论发表成功
      fetchComments();
    }
    else {
      // 需要审核
    }
    newComment.value = ''; // 清空评论输入框
    email.value = ''; // 清空邮箱输入框
    url.value = ''; // 清空URL输入框
    username.value = ''; // 清空名称输入框
  } catch (error) {
    console.error('提交评论失败:', error);
  } finally {
    isSubmitting.value = false;
  }
}


// 组件挂载时获取评论
onMounted(() => {
  fetchComments();
  if (route.params.comment_page) {
    const commentElement = document.getElementById('comments');
    if (commentElement) {
      setTimeout(() => {
        commentElement.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到评论区域
      }, 300);
    }
  }
});
</script>

<template>
  <section>
    <div class="overflow-hidden" id="comments">
      <!-- 标题 -->
      <div class="py-4">
        <h2 class="text-xl font-bold text-gray-800">评论列表 ({{ comments.length }})</h2>
      </div>

      <!-- 评论输入区 -->
      <teleport :to="reply2 ? `#comment-item-${reply2}` : null" :disabled="!reply2">
        <div class="p-6 bg-gray-50 rounded-lg">
          <!-- 新增的三个输入框 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <input v-model="username" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="你的名字" />
            </div>
            <div>
              <input v-model="email" type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="电子邮箱" />
            </div>
            <div>
              <input v-model="url" type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="个人网站" />
            </div>
          </div>

          <div class="mb-4">
            <textarea v-model="newComment" rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="分享你的想法..."></textarea>
          </div>
          <div class="flex justify-end">
            <button @click="submitComment" :disabled="isSubmitting || !newComment.trim()" :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
              isSubmitting || !newComment.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            ]">
              {{ isSubmitting ? '发布中...' : '发布评论' }}
            </button>
            <button
              class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-gray-300 text-gray-500 hover:bg-gray-400 ml-2"
              @click="reply2 = null" v-if="reply2">取消回复</button>
          </div>
        </div>
      </teleport>

      <!-- 评论列表 -->
      <div class="divide-y divide-gray-100 mt-5">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="p-8 text-center text-gray-500">
          <svg class="animate-spin h-8 w-8 text-blue-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          加载评论中...
        </div>

        <!-- 空状态 -->
        <div v-else-if="!comments.length" class="p-8 text-center text-gray-500">
          <p>暂无评论，快来发表第一条评论吧！</p>
        </div>

        <!-- 评论列表 -->
        <ul v-else class="divide-y divide-gray-100">
          <li v-for="comment in comments" :id="`comment-item-${comment.id}`" :key="comment.id" class="p-6">
            <div class="flex items-start">
              <!-- 头像 -->
              <div class="shrink-0 mr-4">
                <div
                  class="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {{ comment.name ? comment.name.charAt(0).toUpperCase() : 'U' }}
                </div>
              </div>

              <!-- 评论内容 -->
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="text-sm font-medium text-gray-900">{{ comment.name }}</h3>
                  <div class="mt-2 flex space-x-4 text-xs">
                    <span class=" text-gray-500">{{ new Date(comment.date).toLocaleString() }}</span>
                    <button @click="reply2 = comment.id"
                      class="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors flex items-center">
                      回复
                    </button>
                  </div>
                </div>
                <p class="text-gray-700 whitespace-pre-line">{{ comment.content }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 分页导航 -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
  </section>
</template>
