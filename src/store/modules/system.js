export default {
  namespaced: true,
  state: {
    website_logo: '',
    website_chinese_title: '',
    website_english_title: '',
    website_short_title: '',
    website_basic_title: '',
    website_description: '',
    copyright: ''
  },
  mutations: {
    updateWebsiteLogo (state, title) {
      state.logo = title
    },
    updateWebsiteChineseTitle (state, title) {
      state.website_chinese_title = title
    },
    updateWebsiteEnglishTitle (state, title) {
      state.website_english_title = title
    },
    updateWebsiteShortTitle (state, title) {
      state.website_short_title = title
    },
    updateWebsiteBasicTitle (state, title) {
      state.website_basic_title = title
    },
    updateWebsiteDescription (state, title) {
      state.website_description = title
    },
    updateCopyright (state, title) {
      state.copyright = title
    }
  }
}
