import Vue from 'vue'
import Vuex from 'vuex'

import todos from './modules/todos'
import artworks from './modules/artworks'
import UIModule from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        todos,
        artworks,
        ui: UIModule
    },
})