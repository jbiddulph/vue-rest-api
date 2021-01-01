<template>
  <div class="hello">
    <div v-if="displayMessage" :class="msgClass">{{ this.msg }}</div>
    <CreateCustomerForm :form="form" @onFormSubmit="onFormSubmit" />
    <loader v-if="loader" />
    <div v-if="error"><sui-message warning>
      {{error}}
    </sui-message></div>
    <CustomerList 
      :customers="customers" 
      @onDelete="onDelete" 
      @onEdit="onEdit"
    />
  </div>
</template>

<script>
import axios from 'axios'
import CreateCustomerForm from '../Customer/CreateCustomerForm'
import CustomerList from '../Customer/CustomerList'
import loader from '../Loader'

export default {
  name: 'Home',
  components: {
    CreateCustomerForm,
    CustomerList,
    loader
  },
  data() {
    return {
      customers: [],
      form: {first_name: '', last_name: '', email: '', isEdit: false},
      loader: false,
      displayMessage: false,
      msgClass: 'ui green message',
      msg: '',
      token: localStorage.getItem('access_token'),
      error: null
    }
  },
  mounted() {
    console.log('URL: ' , this.getUrl)
    this.getCustomers(localStorage.getItem('access_token'))
  },
  methods: {
    getCustomers(token) {
      this.loader = true
      this.$store.dispatch('loadCustomers', {
        token
      })
      // this.$store.dispatch('loadCustomers', this.token)
      .then(response => {
        this.loader = false
        localStorage.setItem('access_token', token)
        this.customers = response.data
        // this.$router.push({name: 'home'})
      })
      .catch((error) => {
        this.error = JSON.stringify(error.message)
        this.$router.push('login')
      })
    },
    deleteCustomer(id) {
      if(confirm("Do you really want to delete?")){
        this.loader = true
        axios.delete(`${this.getUrl}customers/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.loader = false
          this.successfullyDeleted = true
          this.msg = 'Customer Deleted'
          this.msgClass = 'ui red message'
          this.displayMessage = true
          this.getCustomers(localStorage.getItem('access_token'))
        })
        .catch((error) => {
          this.error = JSON.stringify(error.message)
        })
      }
    },
    createCustomer(data) {
      this.loader = true
      axios.post(this.getUrl + 'customers', {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(() => {
        this.loader = false
        this.msg = 'New Customer Created'
        this.msgClass = 'ui green message'
        this.displayMessage = true
        this.getCustomers(localStorage.getItem('access_token'))
      })
      .catch(e => {
        alert(e)
      })
    },
    editCustomer(data) {
      this.loader = true
      axios.put(`${this.getUrl}customers/${data.id}`,{
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(() => {
        this.loader = false
        this.msg = 'Customer Edited'
        this.msgClass = 'ui yellow message'
        this.displayMessage = true
        console.log('still go token: ', localStorage.getItem('access_token'))
        this.getCustomers(localStorage.getItem('access_token'))
      }).catch((e) => {
        console.log('Error:', e)
      })
      
    },
    onDelete(id) {
      this.deleteCustomer(id)
    },
    onEdit(data) {
      this.form = data
      this.form.isEdit = true
      this.displayMessage = false
    },
    onFormSubmit(data) {
      if (data.isEdit) {
        // edit customer
        this.editCustomer(data)
      } else {
        //create customer
        this.createCustomer(data)
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
