<template>
  <div class="create-venue-form">
    <form class="ui form">
        <div class="fields">
            <div class="four wide field">
                <label for="Venue Name">Venue Name</label>
                <input 
                  type="text" 
                  name="venuename" 
                  placeholder="Venue Name"
                  @change="handleChange"
                  :value="form.venuename"
                  >
            </div>

            <div class="four wide field">
                <label for="Venue Type">Venue Type</label>
                <input 
                  type="text" 
                  name="venuetype" 
                  placeholder="Venue Type"
                  @change="handleChange"
                  :value="form.venuetype"
                  >
            </div>

            <div class="six wide field">
                <label for="First Name">Address</label>
                <input 
                  type="text" 
                  name="address" 
                  placeholder="address"
                  @change="handleChange"
                  :value="form.address"
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
  name: 'VenueForm',
  data() {
    return {
      btnName: 'Save',
      btnClass: 'ui primary button submit-button'
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
      if(document.getElementsByName('venuename')[0].value === "") {
        alert('Enter venune name')
        return false
      }
      //last_name
      if(document.getElementsByName('venuetype')[0].value === "") {
        alert('Enter Vennue Type')
        return false
      }
      //email
      if(document.getElementsByName('address')[0].value === "") {
        alert('Enter Address')
        return false
      }

      return true
    },
    clearFormFields() {
      //clear form data
      this.form.venuename = ""
      this.form.venuetype = ""
      this.form.address = ""
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
