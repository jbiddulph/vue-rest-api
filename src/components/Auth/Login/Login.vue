<template>  
    <div>
      <LoginForm :form="form" @onFormSubmit="onFormSubmit" />
      <loader v-if="loader" />
    </div>
</template>

<script>
// import axios from 'axios'
import LoginForm from './LoginForm'
import loader from '../../Loader'

export default {
  components: {
    LoginForm,
    loader
  },
  name: 'Login',
    data() {
      return {
        url: 'http://movemeapi.test/api/login',
        form: {email: '', password: ''},
        loader: false,
        displayMessage: false,
        msgClass: 'ui green message',
        msg: ''
      }
    },
  methods: {
    loginUser(data) {
      this.$store.dispatch('retrieveToken', {
        email: data.email,
        password: data.password
      })
      .then(response => {
        console.log('loginRES', response)
        this.$router.push({name: 'home'})
      })
      // this.loader = true
      // axios.post(this.url, {
      //   email: data.email,
      //   password: data.password,
      // })
      // .then((data) => {
      //   this.msg = 'Login Successful'
      //   this.msgClass = 'ui green message'
      //   this.displayMessage = true
      //   this.loader = false
      //   console.log('Logged in', data.data.token)
      // })
      // .catch(e => {
      //   alert(e)
      // })
    },
    handleChange(event) {
      const { name, value } = event.target
      let form = this.form
      form[name] = value
      this.form = form
    },
    onFormSubmit(data) {
      event.preventDefault()

      // form validation
      if(this.formValidation()){
        //Submit the actual form
        this.loginUser(data)
        
        //clear the form fields
        this.clearFormFields()
      }
    },
    formValidation() {
      //username
      if(document.getElementsByName('email')[0].value === "") {
        alert('Enter Email')
        return false
      }
      //password
      if(document.getElementsByName('password')[0].value === "") {
        alert('Enter password')
        return false
      }

      return true
    },
    clearFormFields() {
      //clear form data
      this.form.email = ""
      this.form.password = ""
      
      //clear form fields
      document.querySelector('.form').reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
