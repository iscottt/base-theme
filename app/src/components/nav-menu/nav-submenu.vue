<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    default: 1
  }
})
// 将url的http://xxxx去除，只保留路径部分进行匹配
function stripOrigin(url) {
  try {
    const u = new URL(url)
    return u.pathname + u.search + u.hash
  } catch {
    return url
  }
}
const route = useRoute()
const cleanPath = computed(() => {
  return route.path.replace(/\/{2,}/g, '/')
})

function isActiveItem(item) {
  if (item.url === '') return false
  if (item.url === '/') return cleanPath.value === '/'
  return cleanPath.value.includes(stripOrigin(item.url))
}
</script>

<template>
  <ul :class="[
    level === 1
      ? 'flex items-center space-x-1'
      : 'absolute left-0 top-0 ml-1 min-w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50',
    // 第三级及以后，调整位置到右侧
    level > 2 ? 'left-full top-0' : ''
  ]">
    <li v-for="item in items" :key="item.id" :class="[
      'relative',
      level === 1 ? 'group' : 'group/submenu',
      // 为有子菜单的项添加指示器
      item.children && item.children.length ? 'has-children' : ''
    ]">
      <!-- 菜单项链接 -->
      <router-link :to="stripOrigin(item.url)" :target="item.opennew ? '_blank' : '_self'" :class="[
        level === 1
          ? 'flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200'
          : 'flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200',
        isActiveItem(item) ? 'text-indigo-600 bg-indigo-50' : ''
      ]" v-html="item.label">
      </router-link>

      <!-- 递归子菜单 -->
      <nav-submenu v-if="item.children && item.children.length" :items="item.children" :level="level + 1" :class="[
        // 第二级菜单：相对于第一级向下展开
        level === 1 ? 'absolute left-0 top-full mt-1' : '',
        // 防止最右边的子菜单超出屏幕
        level === 1 ? 'right-0' : ''
      ]" />
    </li>
  </ul>
</template>

<style scoped>
/* 确保所有层级的子菜单默认隐藏 */
ul:not(:first-child) {
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
}

/* 悬停时显示子菜单 */
.group:hover>ul,
.group\/submenu:hover>ul {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* 为有子菜单的项添加视觉提示 */
.has-children>a::after {
  content: '';
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
