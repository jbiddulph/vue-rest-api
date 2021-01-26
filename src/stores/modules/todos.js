import axios from "axios"

const state = {
    todos: []
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('http://choosapi.test/api/todos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        commit('SET_TODOS', response.data)
    },
    async addTodo({ commit }, todo) {
        const response = await axios.post('http://choosapi.test/api/todos', 
            todo, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        console.log('RESPONSE: ',response)
        commit('NEW_TODO', response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`http://choosapi.test/api/todos/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })  
        commit('REMOVE_TODO', id)
    },
    async filterTodos({ commit }, e) {
        // get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const response = await axios.get(`http://choosapi.test/api/todos?_limit=${limit}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        commit('SET_TODOS', response.data)
    },
    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(`http://choosapi.test/api/todos/${updTodo.id}`, updTodo, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        console.log(response.data)
        commit('UPDATE_TODO', response.data)
    }
}

const mutations = {
    SET_TODOS: (state, todos) => (state.todos = todos),
    NEW_TODO: (state, todo) => state.todos.unshift(todo),
    REMOVE_TODO: (state, id) => 
        state.todos = state.todos.filter(todo => todo.id !== id),
    UPDATE_TODO: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id)
        if(index !== -1) {
            state.todos.splice(index, 1, updTodo)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
