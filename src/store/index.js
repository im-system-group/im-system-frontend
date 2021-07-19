import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})

// 按功能排序

// --- articles ---
// accessArticle
// accessArticles
// accessComments
// createArticle
// createComments
// createLike

// --- user ---
// accessProfile
// authLogin
// authLogout
// authRegister
// updatePassword
// updateProfile
// updateProfilePhoto
