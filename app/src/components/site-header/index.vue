<script setup>
import { NavMenu } from '@/components'
import useAppStore from '@/bases/store/app'
const appStore = useAppStore()
</script>

<template>
  <div class="flex items-center justify-between mb-6 p-3 bg-white rounded-lg shadow border border-gray-200">
    <!-- Logo和标题容器 -->
    <div class="flex items-center gap-2 cursor-pointer group" @click="$router.push('/')">
      <img :src="appStore.site_metas.base_logo_url" v-if="appStore.site_metas.base_logo_url" alt="Logo" class="w-7 h-7 object-contain transition-transform duration-200 group-hover:scale-105" />
      <h1 class="text-xl font-semibold text-gray-800">
        {{ appStore.site_metas.nv_site_name }}
      </h1>
    </div>

    <!-- 顶部导航 -->
    <nav class="ml-6">
      <nav-menu :navs="appStore.topNav || []" class="flex items-center gap-3" />
    </nav>
  </div>
</template>
<style scoped></style>
