<template>
  <div class="create-event-form">
    <form class="ui form">
        <div class="fields">
          <div class="ui three column grid">
            <div class="field column">
                <label for="Event ID">Event ID</label>
                <input 
                  type="text" 
                  name="id" 
                  placeholder="Event ID"
                  @change="handleChange"
                  :value="event.id"
                  >
            </div>
            
            <div class="field column">
                <label for="Event Name">Event Name</label>
                <input 
                  type="text" 
                  name="eventName" 
                  placeholder="Event Name"
                  @change="handleChange"
                  :value="event.eventName"
                  >
            </div>

            <div class="field column">
                <label for="Event Type">Event Type</label>
                <input 
                  type="text" 
                  name="eventType" 
                  placeholder="Event Type"
                  @change="handleChange"
                  :value="event.eventType"
                  >
            </div>

            <div class="field column">
                <label for="Event Date">Date</label>
                <input 
                  type="text" 
                  name="eventDate" 
                  placeholder="Date"
                  @change="handleChange"
                  :value="event.eventDate"
                  >
            </div>

            <div class="field column">
                <label for="Start Time">Start Time</label>
                <input 
                  type="text" 
                  name="eventTimeStart" 
                  placeholder="Time Start"
                  @change="handleChange"
                  :value="event.eventTimeStart"
                  >
            </div>

            <div class="field column">
                <label for="End Time">VenueEnd Time</label>
                <input 
                  type="text" 
                  name="eventTimeEnd" 
                  placeholder="Time End"
                  @change="handleChange"
                  :value="event.eventTimeEnd"
                  >
            </div>

            <div class="field column">
                <label for="Venue">Venue ID</label>
                <input 
                  type="text" 
                  name="venue_id" 
                  placeholder="Venue ID"
                  @change="handleChange"
                  :value="event.venue_id"
                  >
            </div>

            <div class="field column">
                <label for="Event Cost">Event Cost</label>
                <input 
                  type="text" 
                  name="eventCost" 
                  placeholder="Event Cost"
                  @change="handleChange"
                  :value="event.eventCost"
                  >
            </div>

            
            <div class="field column">
                <label for="Live">Live</label>
                <input 
                  type="text" 
                  name="is_live" 
                  placeholder="is_live"
                  @change="handleChange"
                  :value="event.is_live"
                  >
            </div>
            
            <div class="field column">
              <button :class="btnClass" @click="onFormSubmit">{{ btnName }}</button>
            </div>
            
          </div>
        </div>
        <div v-if="displayMessage" :class="msgClass">{{ this.msg }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EventFullForm',
  data() {
    return {
      btnName: 'Save',
      btnClass: 'ui primary button submit-button',
      displayMessage: false,
      msgClass: 'ui green message mb4',
      msg: '',
    }
  },
  props: {
    event: {
      type: Object
    }
  },
  methods: {
    handleChange(event) {
      const { name, value } = event.target
      let form = this.venue
      form[name] = value
      this.form = form
    },
    onFormSubmit(event) {
      event.preventDefault()
      this.displayMessage = false
      this.msg = ""
      // form validation
      if(this.formValidation()){

        //Submit the actual form
        this.$emit('onFormSubmit', this.event)

        //change the button to SAVE
        this.btnName = "Save"
        this.btnClass = "ui primary button submit-button"
        
      }
    },
    formValidation() {
      //Event Name
      if(document.getElementsByName('eventName')[0].value === "") {
        alert('Enter event name')
        return false
      }
      //Event Type
      if(document.getElementsByName('eventType')[0].value === "") {
        alert('Enter Event Type')
        return false
      }
      //event Date
      if(document.getElementsByName('eventDate')[0].value === "") {
        alert('Enter Event Date')
        return false
      }
      this.displayMessage = true
      this.msg = "Event Edited Successfully!"
      return true
    }
  },
  updated() {    
    this.btnName = "Update"
    this.btnClass = "ui orange button submit-button"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
