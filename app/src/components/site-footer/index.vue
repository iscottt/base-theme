<script setup>
import useAppStore from "@/bases/store/app";
const appStore = useAppStore()
</script>

<template> <!-- 站点底部 -->
  <footer class="mt-12 text-center text-gray-500">
    {{ appStore.site_metas.base_copyright }}
  </footer>
</template>
<style scoped></style>
