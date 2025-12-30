# Pagination 分页组件

### 参数说明
1、totalPages  	Number 		总页数
2、currentPage 	Number 		当前页数
3、pageChange  	Function 	分页改变时触发的回调函数，参数为当前页数

### 分页组件的使用方法

``` vue
<script setup>
const currentPage = ref(1)
const totalNum = ref(0)
const totalPages = computed(() => {
  return Math.ceil(totalNum.value / 12)
})
function requestData(){
	// 伪代码
	axios({
		url: '/api/getTotalNum',
		method: 'GET',
	}).then(res => {
		totalNum.value = res.data.totalNum
	})
}
// 不切换路由，只在当前页面翻页
const handlePageChange = page => {
  currentPage.value = page
	requestData()
}

// 切换路由，跳转到对应评论页
function handlePageChange(page) {
  currentPage.value = page
	// 伪代码
  router.push(`/xxx/${page}`)
}
</script>
<template>
	<Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
</template>
```

