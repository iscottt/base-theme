/* eslint-disable array-callback-return */
import { defineStore } from 'pinia'
import { axiosPost, storage } from '@/assets/utils'
const useAppStore = defineStore('app', {
  state: () => {
    return {
      topNav: [],
      site_metas: {},
      post_title: '',
      comment_count: 0,
      comment_page: 1,
      id: 0,
      wikiList: [],
      guest: storage.cookie.get('guest') ? JSON.parse(storage.cookie.get('guest')) : {
        name: '',
        email: '',
        url: '',
      },
      current_user: {},
    }
  },
  actions: {
    setGuest(guest) {
      storage.cookie.set('guest', JSON.stringify(guest))
      this.guest = guest
    },
    setPostTitle(title) {
      this.post_title = title
    },
    setCommentCount(count) {
      this.comment_count = count
    },
    setWikiList(wikiList) {
      this.wikiList = wikiList
    },
    setViewId(id) {
      storage.local.set('viewId', id)
      this.id = id
    },
    async checkNonce() {
      const { data } = await axiosPost('/nv/check-nonce')
      this.current_user = data || {
        id: null,
        name: '',
        email: '',
        role: '',
        avatar_url: '',
        power: 0,
        url: '',
      }
    },
    handleRouterChange(to) {
      const routeState = {
        post_slug: to.params.post_slug || '',
        taxonomy: to.params.taxonomy || '',
        category_slug: to.params.category_slug || '',
        term_slug: to.params.term_slug || '',
        comment_page: Number.parseInt(to.params.comment_page) || 1,
        current_page: Number.parseInt(to.params.page) || 1,
        isPost: to.meta.isPost || false,
        isHome: to.meta.isHome || false,
        // 总是重置为0，分页查询后再在组件里面更新它
        posts_per_page: 0,
        total: 0,
      }
      Object.keys(routeState).map((key) => {
        this[key] = routeState[key]
      })
    },
  },
})

export default useAppStore
