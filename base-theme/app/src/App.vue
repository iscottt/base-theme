<script setup>
import { useRoute } from 'vue-router'
import { axiosPost } from '@/assets/utils'
import useAppStore from '@/bases/store/app'
import { SiteHeader, SiteFooter } from '@/components'
const appStore = useAppStore()
const route = useRoute()
async function getSiteMetas() {
  const { data } = await axiosPost('/base/site-metas')
  appStore.site_metas = data
}
async function getMenus() {
  const { data } = await axiosPost('/nv/get_nav_menu')
  appStore.topNav = data.topNav
  appStore.cateNav = data.catNav
}
getSiteMetas()
getMenus()
</script>

<template>
  <SiteHeader />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
  <SiteFooter />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html,
body {
  overflow-x: hidden;
}

button {
  cursor: pointer;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
