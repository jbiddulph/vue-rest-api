<template>
    <div>
        <h3>Add Venue</h3>
        <div class="add">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="error in errors" :key="error.id">{{ error }}</li>
                </ul>
            </p>
            <sui-form @submit="onSubmit">
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Venue name</label>
                        <input type="text" v-model="venues.venuename" placeholder="Venue name" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Address</label>
                        <input type="text" v-model="venues.address" placeholder="address" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Address 2</label>
                        <input type="text" v-model="venues.address2" placeholder="Address 2" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Town</label>
                        <input type="text" v-model="venues.town" placeholder="Town" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>County</label>
                        <input type="text" v-model="venues.county" placeholder="County" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Post Code</label>
                        <input type="text" v-model="venues.postcode" placeholder="postcode" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Website</label>
                        <input type="text" v-model="venues.website" placeholder="Website" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Postal Search</label>
                        <input type="text" v-model="venues.postalsearch" placeholder="Postal Search" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Venue Type</label>
                        <input type="text" v-model="venues.venuetype" placeholder="Venune Type" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields fields="three">
                    <sui-form-field>
                        <label>Latitude</label>
                        <input type="text" v-model="venues.latitude" placeholder="Latitude" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Longitude</label>
                        <input type="text" v-model="venues.longitude" placeholder="Longitude" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>Telephone</label>
                        <input type="text" v-model="venues.telephone" placeholder="Telephone" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-button type="submit">Submit</sui-button>
            </sui-form>
        </div>
    </div>    
</template>

<script>
import { mapActions } from 'vuex' 
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
    name: "VenueCreate",
    data() {
       return {
           errors: [],
           venues: {
             venuename: null,
             address: null,
             venuetype: null,
             address2: null,
             town: null,
             county: null,
             postcode: null,
             postalsearch: null,
             telephone: null,
             latitude: null,
             longitude: null,
             website: null,
           }
       } 
    },
    validations: {
        venuename: {
            required, 
            minLength: minLength(3),
            maxLength: maxLength(50)
        },
        address: {
            required
        },
        town: {
            required
        },
        county: {
            required
        },
        postcode: {
            required
        },
        telephone: {
            required
        },
        venuetype: {
            required
        },
        latitude: {
            required
        },
        longitude: {
            required
        },

    },
    methods: {
        ...mapActions(['addVenue']),
        onSubmit(e) {
            if (this.venues.venuename && 
            this.venues.town &&
            this.venues.address &&
            this.venues.county &&
            this.venues.postcode &&
            this.venues.telephone &&
            this.venues.latitude &&
            this.venues.longitude &&
            this.venues.venuetype) {
                return true;
            }

            this.errors = [];

            if (!this.venues.venuename) {
                this.errors.push('Name required.');
            }
            if (!this.venues.address) {
                this.errors.push('Address required.');
            }
            if (!this.venues.town) {
                this.errors.push('Town required.')
            }
            if (!this.venues.county) {
                this.errors.push('County required.');
            }
            if (!this.venues.postcode) {
                this.errors.push('Postcode required.');
            }
            if (!this.venues.telephone) {
                this.errors.push('Telephone required.');
            }
            if (!this.venues.latitude) {
                this.errors.push('Latitude required.');
            }
            if (!this.venues.longitude) {
                this.errors.push('Longitude required.');
            }
            if (!this.venues.venuetype) {
                this.errors.push('Venue Type required.');
            }
            

    
            e.preventDefault()
            console.log(this.venues)
            this.addVenue(this.venues)
        }
    }
}
</script>

<style scoped>

</style>