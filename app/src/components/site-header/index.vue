<script setup>
import { NavMenu } from '@/components';
import useAppStore from "@/bases/store/app";
const appStore = useAppStore()
</script>

<template>
  <!-- Logo + 站点标题 -->
  <div class="flex items-center mb-8 p-4">
    <img @click="$router.push('/')" :src="appStore.site_metas.base_logo_url" alt="Logo" class="w-8 h-8 mr-4" />
    <h1 class="text-3xl font-bold">{{ appStore.site_metas.nv_site_name }}</h1>
    <!-- 顶部导航 -->
    <nav class="ml-auto">
      <nav-menu :navs="appStore.topNav" />
    </nav>
  </div>
</template>
<style scoped></style>
