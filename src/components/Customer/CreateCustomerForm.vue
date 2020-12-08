<template>
  <div class="create-customer-form">
    <form class="ui form">
        <div class="fields">
            <div class="four wide field">
                <label for="First Name">First Name</label>
                <input 
                  type="text" 
                  name="first_name" 
                  placeholder="First Name"
                  @change="handleChange"
                  :value="form.first_name"
                  >
            </div>

            <div class="four wide field">
                <label for="Last Name">Last Name</label>
                <input 
                  type="text" 
                  name="last_name" 
                  placeholder="Last Name"
                  @change="handleChange"
                  :value="form.last_name"
                  >
            </div>

            <div class="six wide field">
                <label for="First Name">E-mail</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="email"
                  @change="handleChange"
                  :value="form.email"
                  >
            </div>

            <div class="two wide field">
              <button :class="btnClass" @click="onFormSubmit">{{ btnName }}</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateCustomerForm',
  data() {
    return {
      btnName: 'Save',
      btnClass: 'ui primary button submit-button',
    }
  },
  props: {
    form: {
      type: Object
    },
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

        //change the button to SAVE
        this.btnName = "Save"
        this.btnClass = "ui primary button submit-button"
        
        //clear the form fields
        this.clearFormFields()
      }
    },
    formValidation() {
      //first_name
      if(document.getElementsByName('first_name')[0].value === "") {
        alert('Enter First name')
        return false
      }
      //last_name
      if(document.getElementsByName('last_name')[0].value === "") {
        alert('Enter Last name')
        return false
      }
      //email
      if(document.getElementsByName('email')[0].value === "") {
        alert('Enter Email')
        return false
      }

      return true
    },
    clearFormFields() {
      //clear form data
      this.form.first_name = ""
      this.form.last_name = ""
      this.form.email = ""
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
