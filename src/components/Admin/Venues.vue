<template>
  <div class="hello">
    <div v-if="displayMessage" :class="msgClass">{{ this.msg }}</div>
    <VenueForm :form="form" @onFormSubmit="onFormSubmit" />
    <LargeLoader v-if="loader" />
    <VenueList 
      :venues="venues" 
      @onDelete="onDelete" 
      @onEdit="onEdit"
      @toggle="toggle"
    />
  </div>
</template>

<script>
import axios from 'axios'
import VenueForm from './Venue/VenueForm'
import VenueList from './Venue/VenueList'
import LargeLoader from '../LargeLoader'


export default {
  name: 'Venues',
  components: {
    VenueForm,
    VenueList,
    LargeLoader
  },
  data() {
    return {
      venues: [],
      form: {venuename: '', venuetype: '', address: '', isEdit: false},
      loader: false,
      displayMessage: false,
      msgClass: 'ui green message',
      msg: '',
      token: localStorage.getItem('access_token')
    }
  },
  mounted() {
    this.getVenues(localStorage.getItem('access_token'))
  },
  methods: {
    getVenues(token) {
      this.loader = true
      this.$store.dispatch('loadVenues', {
        token
      })
      .then(response => {
        this.loader = false
        localStorage.setItem('access_token', token)
        this.venues = response.data.data
        // this.$router.push({name: 'home'})
      })
    },
    deleteVenue(id) {
      if(confirm("Do you really want to delete?")){
        this.loader = true
        axios.delete(`${this.getUrl}venue/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.loader = false
          this.successfullyDeleted = true
          this.msg = 'Venue Deleted'
          this.msgClass = 'ui red message'
          this.displayMessage = true
          this.getVenues(localStorage.getItem('access_token'))
        })
        .catch(e => {
          alert(e)
        })
      }
    },
    createVenue(data) {
      this.loader = true
      axios.post(this.getUrl + 'venues', {
        venuename: data.venuename,
        venuetype: data.venuetype,
        address: data.address,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(() => {
        this.loader = false
        this.msg = 'New Venue Created'
        this.msgClass = 'ui green message'
        this.displayMessage = true
        this.getVenues(localStorage.getItem('access_token'))
      })
      .catch(e => {
        alert(e)
      })
    },
    editVenue(data) {
      this.loader = true
      axios.put(`${this.getUrl}venue/${data.id}`,{
        venuename: data.venuename,
        venuetype: data.venuetype,
        address: data.address,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(() => {
        this.loader = false
        this.msg = 'Venue Edited'
        this.msgClass = 'ui yellow message'
        this.displayMessage = true
        console.log('still go token: ', localStorage.getItem('access_token'))
        this.getVenues(localStorage.getItem('access_token'))
      }).catch((e) => {
        console.log('Error:', e)
      })
      
    },
    onDelete(id) {
      this.deleteVenue(id)
    },
    onEdit(data) {
      this.form = data
      this.form.isEdit = true
      this.displayMessage = false
    },
    toggle(data) {
      console.log('data: ', data)
      this.form = data
      this.form.isEdit = true
      this.displayMessage = false
    },
    onFormSubmit(data) {
      if (data.isEdit) {
        // edit venue
        this.editVenue(data)
      } else {
        //create venue
        this.createVenue(data)
      }
    }
  },
  created () {
    // console.log('this is the token:', this.token)
    // this.getCustomers(this.token)
    //hide message
    this.msg = ''
    this.msgClass = 'ui red message'
    this.displayMessage = false
  },
  computed: {
    getUrl() {
      return this.$store.getters.getUrl
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.data {
  margin-top:15px;
}
thead tr th {
  background:#e0e0e0!important ;
}
.ui.inverted.dimmer {
  background-color: rgba(255, 255, 255, 0)!important;
}
</style>
