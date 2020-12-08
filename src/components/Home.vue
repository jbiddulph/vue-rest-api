<template>
  <div class="hello">
    <div v-if="displayMessage" :class="msgClass">{{ this.msg }}</div>
    <CreateCustomerForm :form="form" @onFormSubmit="onFormSubmit" />
    <loader v-if="loader" />
    <CustomerList 
      :customers="customers" 
      @onDelete="onDelete" 
      @onEdit="onEdit"
    />
  </div>
</template>

<script>
import axios from 'axios'
import CreateCustomerForm from './Customer/CreateCustomerForm'
import CustomerList from './Customer/CustomerList'
import loader from './Loader'

export default {
  name: 'Home',
  components: {
    CreateCustomerForm,
    CustomerList,
    loader
  },
  data() {
    return {
      url: 'http://laravel-rest-api-jwt-auth.test/api/customers',
      customers: [],
      form: {first_name: '', last_name: '', email: '', isEdit: false},
      loader: false,
      displayMessage: false,
      msgClass: 'ui green message',
      msg: '',
      token: this.$store.dispatch('retrieveToken')
    }
  },
  methods: {
    getCustomers(token) {
      this.$store.dispatch('loadCustomers', token)
      .then(response => {
        console.log('RES', response)
        this.$router.push({name: 'about'})
      })
    },
    deleteCustomer(id) {
      if(confirm("Do you really want to delete?")){
        this.loader = true
        axios.delete(`${this.url}/${id}`)
        .then(() => {
          this.successfullyDeleted = true
          this.msg = 'Customer Deleted'
          this.msgClass = 'ui red message'
          this.displayMessage = true
          this.getCustomers()
        })
        .catch(e => {
          alert(e)
        })
      }
    },
    createCustomer(data) {
      this.loader = true
      axios.post(this.url, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      })
      .then(() => {
        this.msg = 'New Customer Created'
        this.msgClass = 'ui green message'
        this.displayMessage = true
        this.getCustomers()
      })
      .catch(e => {
        alert(e)
      })
    },
    editCustomer(data) {
      this.loader = true
      axios.put(`${this.url}/${data.id}`,{
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      }).then(() => {
        this.msg = 'Customer Edited'
        this.msgClass = 'ui yellow message'
        this.displayMessage = true
        this.getCustomers()
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
    console.log('this is the token:', this.data.token)
    this.getCustomers(this.data.token)
    //hide message
    this.msg = ''
    this.msgClass = 'ui red message'
    this.displayMessage = false
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
