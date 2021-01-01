<template>
  <div class="create-event-form">
    <form class="ui form">
        <div class="fields">
            <div class="four wide field">
                <label for="Event Name">Event Name</label>
                <input 
                  type="text" 
                  name="eventName" 
                  placeholder="Event Name"
                  @change="handleChange"
                  :value="form.eventName"
                  >
            </div>

            <div class="four wide field">
                <label for="Event Type">Event Type</label>
                <input 
                  type="text" 
                  name="eventType" 
                  placeholder="Event Type"
                  @change="handleChange"
                  :value="form.eventType"
                  >
            </div>

            <div class="six wide field">
                <label for="Event Date">Event Date</label>
                <input 
                  type="text" 
                  name="eventDate" 
                  placeholder="Event Date"
                  @change="handleChange"
                  :value="form.eventDate"
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
  name: 'EventForm',
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
      //event name
      if(document.getElementsByName('eventName')[0].value === "") {
        alert('Enter Event ?Name')
        return false
      }
      //event type
      if(document.getElementsByName('eventType')[0].value === "") {
        alert('Enter Event Type')
        return false
      }
      //Event Date
      if(document.getElementsByName('eventDate')[0].value === "") {
        alert('Enter Event Date')
        return false
      }

      return true
    },
    clearFormFields() {
      //clear form data
      this.form.eventName = ""
      this.form.eventType = ""
      this.form.eventDate = ""
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
