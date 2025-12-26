<template>
	<div class="four04 flex flex-col justify-center items-center">
		<h1 class="text-4xl font-bold">404</h1>
		<p class="text-xl">Page not found</p>
		<button @click="router.push('/')">Go back home</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
