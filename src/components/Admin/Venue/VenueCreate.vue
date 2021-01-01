<template>
    <div>
        <h3>Add Venue</h3>
        <div class="add">
            <sui-form @submit="onSubmit">
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Venue name</label>
                        <input type="text" v-model="venuename" placeholder="Venue name" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Address</label>
                        <input type="text" v-model="address" placeholder="address" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Address 2</label>
                        <input type="text" v-model="address2" placeholder="address" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Town</label>
                        <input type="text" v-model="town" placeholder="Town" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>County</label>
                        <input type="text" v-model="county" placeholder="County" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Post Code</label>
                        <input type="text" v-model="postcode" placeholder="postcode" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Postal Search</label>
                        <input type="text" v-model="postalsearch" placeholder="Postal Search" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Telephone</label>
                        <input type="text" v-model="telephone" placeholder="Telephone" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Venue Type</label>
                        <input type="text" v-model="venuetype" placeholder="Venue Type" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Latitude</label>
                        <input type="text" v-model="latitude" placeholder="Latitude" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Longitude</label>
                        <input type="text" v-model="longitude" placeholder="Longitude" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Website</label>
                        <input type="text" v-model="website" placeholder="Website" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-button type="submit">Submit</sui-button>
            </sui-form>
        </div>
    </div>    
</template>

<script>
import { mapActions } from 'vuex' 

export default {
    name: "VenueCreate",
    data() {
       return {
           venue: {
             venuename: '',
             address: '',
             address2: '',
             town: '',
             county: '',
             postcode: '',
             postalsearch: '',
             telephone: '',
             venuetype: '',
             latitude: '',
             longitude: '',
             website: '',
           }
       } 
    },
    methods: {
        ...mapActions(['addVenue']),
        onSubmit(e) {
            e.preventDefault()
            this.addVenue(this.venue)
        }
    }
}
</script>

<style scoped>

</style>