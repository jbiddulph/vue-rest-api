<template>
  <div class="hello">
    <router-link to="/login">Login</router-link>
    <div v-if="displayMessage" :class="msgClass">{{ this.msg }}</div>
    <!-- <CreateCustomerForm :form="form" @onFormSubmit="onFormSubmit" /> -->
    <loader v-if="loader" />
    <MyTaskList 
      :tasks="tasks" 
      @onDelete="onDelete" 
    />
  </div>
</template>

<script>
import axios from 'axios'
import MyTaskList from './MyTaskList'
import loader from '../Loader'

export default {
  name: 'MyTaskList',
  components: {
    MyTaskList,
    loader
  },
  data() {
    return {
      url: 'http://movemeapi.test/api/tasks',
      tasks: [],
    //   form: {first_name: '', last_name: '', email: '', isEdit: false},
      loader: false,
      displayMessage: false,
      msgClass: 'ui green message',
      msg: ''
    }
  },
  methods: {
    getTasks() {
      this.loader = true
      axios.get(this.url).then(data => {
        this.customers = data.data
        this.loader = false
      })
    },
    deleteTask(id) {
      this.loader = true
      axios.delete(`${this.url}/${id}`)
      .then(() => {
        this.successfullyDeleted = true
        this.msg = 'Task Deleted'
        this.msgClass = 'ui red message'
        this.displayMessage = true
        this.getTasks()
      })
      .catch(e => {
        alert(e)
      })
    },
    // createCustomer(data) {
    //   this.loader = true
    //   axios.post(this.url, {
    //     first_name: data.first_name,
    //     last_name: data.last_name,
    //     email: data.email,
    //   })
    //   .then(() => {
    //     this.msg = 'New Customer Created'
    //     this.msgClass = 'ui green message'
    //     this.displayMessage = true
    //     this.getCustomers()
    //   })
    //   .catch(e => {
    //     alert(e)
    //   })
    // },
    // editCustomer(data) {
    //   this.loader = true
    //   axios.put(`${this.url}/${data.id}`,{
    //     first_name: data.first_name,
    //     last_name: data.last_name,
    //     email: data.email,
    //   }).then(() => {
    //     this.msg = 'Customer Edited'
    //     this.msgClass = 'ui yellow message'
    //     this.displayMessage = true
    //     this.getCustomers()
    //   }).catch((e) => {
    //     console.log('Error:', e)
    //   })
      
    // },
    onDelete(id) {
      this.deleteTask(id)
    },
    // onEdit(data) {
    //   this.form = data
    //   this.form.isEdit = true
    //   this.displayMessage = false
    // },
    // onFormSubmit(data) {
    //   if (data.isEdit) {
    //     // edit customer
    //     this.editCustomer(data)
    //   } else {
    //     //create customer
    //     this.createCustomer(data)
    //   }
    // }
  },
  created () {
    this.getTasks()
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
