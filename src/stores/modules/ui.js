import axios from 'axios'

export default {
    state: {
        token: localStorage.getItem('access_token') || null,
        url: "http://movemeapi.test/api/"
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        getUrl(state) {
          return state.url
        }
    },
    mutations: {  
      retrieveToken(state, token){
          state.token = token
      },
      destroyToken(state) {
          state.token = null
      }
    },
    actions: {
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
              })
              .then((response) => {
                  const token = response.data.token
                  // localStorage.setItem('access_token', token)
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
        }
    }
}