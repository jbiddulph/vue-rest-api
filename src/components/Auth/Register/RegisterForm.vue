<template>
  <div>
    <div class="page-register">
        <div class="ui centered grid container">
          <div class="six wide column">
            <div class="ui icon warning message">
                <i class="lock icon"></i>
                <div class="content">
                  <div class="header">
                    Register
                  </div>
                  <p>Use your email and password to register</p>
                </div>
              </div>
            <div class="ui fluid card">
              <div class="content">
              <form class="ui form">
                <div class="field">
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    @change="handleChange"
                    :value="form.name"
                    >
                </div>
                <div class="field">
                  <label>User</label>
                  <input 
                    type="email" 
                    name="email" 
                    @change="handleChange"
                    :value="form.email"
                    >
                </div>
                <div class="field">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password"
                    @change="handleChange"
                    :value="form.password"
                    >
                </div>
                <button class="ui primary labeled icon button" @click="onFormSubmit">
                  <i class="unlock alternate icon"></i>
                  Register
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
    }
  },
  props: {
    form: {
      type: Object
    }
  },
  methods: {
    handleChange(event) {
      const { name, value } = event.target
      let form = this.form
      form[name] = value
      this.form = form
    },
    onFormSubmit(event) {
      event.preventDefault()
      // form validation
      if(this.formValidation()){
        //Submit the actual form
        this.$emit('onFormSubmit', this.form)
        
        //clear the form fields
        this.clearFormFields()
      }
    },
    formValidation() {
    
        //name
      if(document.getElementsByName('name')[0].value === "") {
        alert('Enter Name')
        return false
      }
      //email
      if(document.getElementsByName('email')[0].value === "") {
        alert('Enter Email')
        return false
      }
      //Password
      if(document.getElementsByName('password')[0].value === "") {
        alert('Enter Password')
        return false
      }

      return true
    },
    clearFormFields() {
      //clear form data
      this.form.name = ""
      this.form.email = ""
      this.form.password = ""
      this.form.isEdit = false
      
      //clear form fields
      document.querySelector('.form').reset()
    }
  },
  updated() {
    if(this.form.isEdit) {
      this.btnName = "Update"
      this.btnClass = "ui orange button submit-button"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
