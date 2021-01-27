import axios from "axios"

const state = {
    artworks: []
}

const getters = {
    allArtworks: (state) => state.artworks
}

const actions = {
    async fetchArtworks({ commit }) {
        const response = await axios.get('http://choosapi.test/api/artworks', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        commit('SET_ARTWORKS', response.data)
    },
    async addArtwork({ commit }, artwork) {
        const response = await axios.post('http://choosapi.test/api/artworks', 
            artwork, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        commit('NEW_ARTWORK', response.data)
    },
    async deleteArtwork({ commit }, id) {
        await axios.delete(`http://choosapi.test/api/artworks/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })  
        commit('REMOVE_ARTWORK', id)
    },
    async filterArtworks({ commit }, e) {
        // get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const response = await axios.get(`http://choosapi.test/api/artworks?limit=${limit}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        commit('SET_ARTWORKS', response.data)
    },
    async updateArtwork({ commit }, updArtwork) {
        const response = await axios.put(`http://choosapi.test/api/artworks/${updArtwork.id}`, updArtwork, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        commit('UPDATE_ARTWORK', response.data)
    }
}

const mutations = {
    SET_ARTWORKS: (state, artworks) => (state.artworks = artworks),
    NEW_ARTWORK: (state, artwork) => state.artworks.unshift(artwork),
    REMOVE_ARTWORK: (state, id) => 
        state.artworks = state.artworks.filter(artwork => artwork.id !== id),
    UPDATE_ARTWORK: (state, updArtwork) => {
        const index = state.artworks.findIndex(artwork => artwork.id === updArtwork.id)
        if(index !== -1) {
            state.artworks.splice(index, 1, updArtwork)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
