<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavSubmenu from './nav-submenu.vue'

defineProps({
  navs: {
    type: Array,
    required: true
  }
})

const route = useRoute()
const cleanPath = computed(() => {
  return route.path.replace(/\/{2,}/g, '/')
})
</script>

<template>
  <nav-submenu :items="navs" :level="1" />
</template>
