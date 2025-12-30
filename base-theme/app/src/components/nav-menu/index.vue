<script setup>
import NavSubmenu from './nav-submenu.vue'

defineProps({
  navs: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <nav-submenu :items="navs" :level="1" />
</template>
