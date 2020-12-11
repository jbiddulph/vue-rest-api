import axios from 'axios'

export default {
    state: {
        token: localStorage.getItem('access_token') || null
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
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
                    axios.post('http://laravel-rest-api-jwt-auth.test/api/logout', {
                      headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
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
              axios.get('http://laravel-rest-api-jwt-auth.test/api/customers', {
                headers: {
                  'Authorization': 'Bearer ' + context.state.token
                }
              })
            .then((response) => {
                _resolve(response)
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
        retrieveToken(context, credentials) {
            return new Promise((_resolve, _reject) => {
                axios.post('http://laravel-rest-api-jwt-auth.test/api/login', {
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
                axios.post('http://laravel-rest-api-jwt-auth.test/api/register', {
                name: credentials.name,
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
        }
    }
}