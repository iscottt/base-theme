var path = require('path');
var fs = require('fs');
set_frontstage_rendering_mode('SSR')
const initExpressActions = () => {
  register_static_url('/srcs', get_theme_path('./srcs/'))
}
add_action('init_express', initExpressActions)

register_nav_menus({
	topNav: '顶部菜单',
	catNav: '分类菜单',
})

add_submenu_page({
	parent_slug: "appearance",
	page_title: "主题设置",
	menu_title: "主题设置",
	menu_slug: "theme-settings",
	power: 10,
	position: 9,
	component_url: "/srcs/page-settings/index.vue",
})

// 使用metabox组件便捷生成
add_meta_box({
	post_types: ['article'],
	meta_box_slug: "article-metabox-likes",
	content: {
		title: '点赞量',
		items: [{
			label: "", type: "InputNumber", meta_key: "likes",config: {min:0, defaultValue: 0},
		}]
	}
})

add_meta_box({
	post_types: ['article'],
	meta_box_slug: "article-metabox-views",
	content: {
		title: '阅读量',
		items: [{
			label: "", type: "InputNumber", meta_key: "views",config: {min:0, defaultValue: 0},
		}]
	}
})


add_post_type_support('page', 'thumbnail')

register_rest_route('base','site-metas',{
	methods: 'post',
	callback(data,req) {
		var opts = get_options([
			'nv_site_name',
			'nv_site_description',
			'nv_date_format',
			'nv_time_format',
			'require_name_email',
			'enable_comment',
			'comment_registration',
			
			// 主题定义
			'base_logo_url',
			'base_copyright',
			]);
		return {...opts}
	}
});

// 引入其他模块
require('./function-post.js')
require('./function-ssr.js')
