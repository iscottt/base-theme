<script setup>
const { ref, onMounted } = nv.Vue
const { $axios, $API } = nv
const formConfig = {
	form: {
		labelWidth: '9em',
		submitText: '保存设置',
	},
	items: [
		{
			label: "站点身份", type: "FormSubtitle",
		},
		{
			label: "站点徽标", type: "ThumbnailUploader", prop: "base_logo_url",
			config: {
				clearable: true,
				width: 140,
				height: 60,
			},
			desc: "显示在页面顶部Logo位置",
		},
		{
			label: "版权说明", type: "Input", prop: "base_copyright",
			config: {
				clearable: true,
				width: 140,
				height: 60,
			},
			desc: "显示在页面顶部Logo位置",
		}
	],
}
const formModel = ref({})
function handleSubmit() {
	$fullLoading.start()
	$axios({
		method: 'post',
		url: $API + '/nv/set-options',
		data: {
			...formModel.value
		},
	})
		.then(({ data }) => {
			$message.success('保存成功')
		})
		.catch(error => {
			$message.warning('保存设置请求失败')
			console.log(error)
		})
		.finally(() => {
			$fullLoading.end()
		})
}
// 初始化数据
function requestData() {
	$fullLoading.start()
	$axios({
		method: 'post',
		url: $API + '/nv/get-options',
		data: {
			names: ['base_logo_url','','base_copyright'],
		},
	})
		.then(({ data }) => {
			formModel.value = data.expand_options || {}
		})
		.catch(error => {
			$message.warning('读取设置请求失败')
			console.log(error)
		})
		.finally(() => {
			$fullLoading.end()
		})
}
onMounted(requestData)
</script>

<template>
	<div class="nv-admin-page nv-packages-installed">
		<div class="page-title">主题设置</div>
		<div class="page-content flex-grow">
			<pd-form :config="formConfig" :data="formModel" @submit="handleSubmit">
			</pd-form>
		</div>
	</div>
</template>
