<template>
	<div class="four04 flex flex-col justify-center items-center">
		<div class="title">Lost</div>
		<p>放眼望去，这里一片荒芜，只剩白雪茫茫……<br>疲惫的旅人，您迷路了吗？</p>
		<p><button @click="router.replace('/')">带我回家</button></p>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
