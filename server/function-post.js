// 列表页相关
var path = require('path');
var fs = require('fs');
global.base_lite_post = (post)=>{
	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		modified_time: post.modified_time,
		views: get_post_meta(post.id,'views') || 0,
		likes: get_post_meta(post.id,'likes') || 0,
		comments: post.comment_count,
		thumbnail: get_the_post_thumbnail_url(post.id),
		categories: nv_get_object_terms(post.id, 'category')
					.map(term=>term.name),
		tags: nv_get_object_terms(post.id, 'tag')
					.map(term=>term.name),
		metas: get_post_meta(post.id),
	}
}
register_rest_route('base','post-list',{
	methods: 'post',
	callback(data,req) {
		var {taxonomy,term_slug,current_page} = data;

		var queryOpt = {
			post_type: 'article',
			status: 'publish',
			posts_per_page: 12,
			current_page,
		};
		// 传了tax和slug才查询，否则就当做全部文章时间线来查
		if (taxonomy && term_slug) {
			queryOpt.tax_query = {
				relation: "AND",
				opts: [
					{
						taxonomy,
						terms: Array.isArray(term_slug) ? term_slug : [term_slug],
						operator: "IN"
					}
				]
			}
		}
		var posts = query_posts(queryOpt);
		return {
			term_names: term_slug
						?
						get_terms({
							taxonomy,
							include: Array.isArray(term_slug) ? term_slug : [term_slug],
						}).map(term=>term.name)
						: [],
			articles: posts.data.map(post=>base_lite_post(post)),
			pagination: posts.pagination
		}
	}
});
