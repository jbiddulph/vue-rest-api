import Vue from 'vue'
import Vuex from 'vuex'

import todos from './modules/todos'
import UIModule from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        todos,
        ui: UIModule
    },
})