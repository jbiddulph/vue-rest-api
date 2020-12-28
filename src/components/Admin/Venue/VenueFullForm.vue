<template>
  <div class="create-venue-form">
    <form class="ui form">
        <div class="fields">
          <div class="ui three column grid">
            <div class="field column">
                <label for="Venue ID">Venue ID</label>
                <input 
                  type="text" 
                  name="id" 
                  placeholder="Venue ID"
                  @change="handleChange"
                  :value="venue.id"
                  >
            </div>
            
            <div class="field column">
                <label for="Venue Name">Venue Name</label>
                <input 
                  type="text" 
                  name="venuename" 
                  placeholder="Venue Name"
                  @change="handleChange"
                  :value="venue.venuename"
                  >
            </div>

            <div class="field column">
                <label for="Venue Type">Venue Type</label>
                <input 
                  type="text" 
                  name="venuetype" 
                  placeholder="Venue Type"
                  @change="handleChange"
                  :value="venue.venuetype"
                  >
            </div>

            <div class="field column">
                <label for="First Name">Address</label>
                <input 
                  type="text" 
                  name="address" 
                  placeholder="address"
                  @change="handleChange"
                  :value="venue.address"
                  >
            </div>

            <div class="field column">
                <label for="First Name">Address 2</label>
                <input 
                  type="text" 
                  name="address2" 
                  placeholder="address2"
                  @change="handleChange"
                  :value="venue.address2"
                  >
            </div>

            <div class="field column">
                <label for="Venue Town">Venue Town</label>
                <input 
                  type="text" 
                  name="town" 
                  placeholder="Venue Town"
                  @change="handleChange"
                  :value="venue.town"
                  >
            </div>

            <div class="field column">
                <label for="Venue County">Venue County</label>
                <input 
                  type="text" 
                  name="county" 
                  placeholder="Venue County"
                  @change="handleChange"
                  :value="venue.county"
                  >
            </div>

            <div class="field column">
                <label for="PostCode">Postcode</label>
                <input 
                  type="text" 
                  name="postcode" 
                  placeholder="postcode"
                  @change="handleChange"
                  :value="venue.postcode"
                  >
            </div>

            <div class="field column">
                <label for="Postal Search">Postal Search</label>
                <input 
                  type="text" 
                  name="postalsearch" 
                  placeholder="postalsearch"
                  @change="handleChange"
                  :value="venue.postalsearch"
                  >
            </div>

            <div class="field column">
                <label for="Telephone">Telephone</label>
                <input 
                  type="text" 
                  name="telephone" 
                  placeholder="telephone"
                  @change="handleChange"
                  :value="venue.telephone"
                  >
            </div>

            <div class="field column">
                <label for="Latitude">Latitude</label>
                <input 
                  type="text" 
                  name="latitude" 
                  placeholder="latitude"
                  @change="handleChange"
                  :value="venue.latitude"
                  >
            </div>

            <div class="field column">
                <label for="Longitude">Longitude</label>
                <input 
                  type="text" 
                  name="longitude" 
                  placeholder="longitude"
                  @change="handleChange"
                  :value="venue.longitude"
                  >
            </div>

            <div class="field column">
                <label for="Website">Website</label>
                <input 
                  type="text" 
                  name="website" 
                  placeholder="website"
                  @change="handleChange"
                  :value="venue.website"
                  >
            </div>

            <div class="field column">
                <label for="Photo">Photo</label>
                <input 
                  type="text" 
                  name="photo" 
                  placeholder="photo"
                  @change="handleChange"
                  :value="venue.photo"
                  >
            </div>

            <div class="field column">
                <label for="Live">Live</label>
                <input 
                  type="text" 
                  name="is_live" 
                  placeholder="is_live"
                  @change="handleChange"
                  :value="venue.is_live"
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
  name: 'VenueFullForm',
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
    venue: {
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
        this.$emit('onFormSubmit', this.venue)

        //change the button to SAVE
        this.btnName = "Save"
        this.btnClass = "ui primary button submit-button"
        
      }
    },
    formValidation() {
      //first_name
      if(document.getElementsByName('venuename')[0].value === "") {
        alert('Enter venue name')
        return false
      }
      //last_name
      if(document.getElementsByName('venuetype')[0].value === "") {
        alert('Enter Venue Type')
        return false
      }
      //email
      if(document.getElementsByName('address')[0].value === "") {
        alert('Enter Address')
        return false
      }
      this.displayMessage = true
      this.msg = "Venue Edited Successfully!"
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
