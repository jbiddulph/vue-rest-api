import axios from 'axios'

const state = {
  token: localStorage.getItem('access_token') || null,
  url: "http://choosapi.test/api/auth/",
  baseurl: "http://choosapi.test/",
  users: [],
  events: [],
  venues: []
}
const getters = {
  loggedIn(state) {
      return state.token !== null
  },
  getUrl(state) {
    return state.url
  },
  getBaseUrl(state) {
    return state.baseurl
  },
  allVenues: state => state.venues
}
const mutations = {  
  setVenues: (state, venues) => ( state.venues = venues ),
  newVenues: (state, venue) => state.venues.unshift(venue),
  removeVenue: (state, id) => state.venues = state.venues.filter(venue => venue.id !== id),
  retrieveToken(state, token){
      state.token = token
  },
  destroyToken(state) {
      state.token = null
  }
}
const actions = {
  async fetchVenues({commit}) {
    const response = await axios.get(
      state.url + 'venue', {
        headers: {
          'Authorization': 'Bearer ' + state.token
        }
      })
    commit('setVenues', response.data.data)
  },
  async addVenue({commit}, venues) {
    const response = await axios.post(
      state.url + 'venue', {
        venuename: venues.venuename,
        address: venues.address,
        address2: venues.address2,
        town: venues.town,
        county: venues.county,
        postcode: venues.postcode,
        postalsearch: venues.postalsearch,
        telephone: venues.telephone,
        latitude: venues.latitude,
        longitude: venues.longitude,
        website: venues.website,
        venuetype: venues.venuetype,
    },{
        headers: {
          'Authorization': 'Bearer ' + state.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    commit('newVenues', response.data.data)
  },
  async deleteVenune({commit}, id) {
    await axios.delete(state.url + `venue/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + state.token
      }
    })
    commit('removeVenue', id)
  },
  
  destroyToken(context) {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if(context.getters.loggedIn) {
          return new Promise((_resolve, _reject) => {
              axios.post(context.state.url + 'logout', {
                headers: {
                  'Authorization': 'Bearer ' + context.state.token
                }
              })
            .then((response) => {
                localStorage.removeItem('access_token')
                context.commit('destroyToken')
                _resolve(response)
            })
            .catch(e => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              _reject(e)
            })
          })        
      }
  },
  loadCustomers(context) {
    return new Promise((_resolve, _reject) => {
        axios.get(context.state.url + 'customers', {
          headers: {
            'Authorization': 'Bearer ' + context.state.token
          }
        })
      .then((response) => {
          _resolve(response)
      })
      .catch(e => {
        alert(e)
        _reject(e)
      })
    })
  },
  loadVenues(context) {
    return new Promise((_resolve, _reject) => {
        axios.get(context.state.url + 'venue', {
          headers: {
            'Authorization': 'Bearer ' + context.state.token
          }
        })
      .then((response) => {
          _resolve(response)
        // this.msg = 'Login Successful'
        // this.msgClass = 'ui green message'
        // this.displayMessage = true
        // this.loader = false
        // console.log('Logged inxx', data.data.token)
      })
      .catch(e => {
        alert(e)
        _reject(e)
      })
    })
  },
  loadEvents(context) {
    return new Promise((_resolve, _reject) => {
        axios.get(context.state.url + 'eventlist', {
          headers: {
            'Authorization': 'Bearer ' + context.state.token
          }
        })
      .then((response) => {
          _resolve(response)
      })
      .catch(e => {
        alert(e)
        _reject(e)
      })
    })
  },
  // updateCustomer(context) {
  //   return new Promise((_resolve, _reject) => {
  //     axios.put(context.state.url + `customers/${context.id}`, {
  //       first_name: context.first_name,
  //       last_name: context.last_name,
  //       email: context.email,
  //     }, {
  //       headers: {
  //         'Authorization': 'Bearer ' + context.state.token
  //       }
  //     })
  //     .then((response) => {
  //         _resolve(response)
  //         // this.loader = false
  //         // this.msg = 'Customer Edited'
  //         // this.msgClass = 'ui yellow message'
  //         // this.displayMessage = true
  //         // this.getCustomers()
  //     })
  //     .catch(e => {
  //       alert(e)
  //       _reject(e)
  //     })
  //   })
  // },
  retrieveToken(context, credentials) {
      return new Promise((_resolve, _reject) => {
          axios.post(context.state.url + 'login', {
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
            const token = response.data.token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            _resolve(response)
          // this.msg = 'Login Successful'
          // this.msgClass = 'ui green message'
          // this.displayMessage = true
          // this.loader = false
          // console.log('Logged inxx', data.data.token)
        })
        .catch(e => {
          alert(e)
          _reject(e)
        })
      })
  },
  registerRetrieveToken(context, credentials) {
      return new Promise((_resolve, _reject) => {
          axios.post(context.state.url + 'register', {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.password_confirmation,
        })
        .then((response) => {
            const token = response.data.token
            context.commit('retrieveToken', token)
            _resolve(response)
        })
        .catch(e => {
          alert(e)
          _reject(e)
        })
      })
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}