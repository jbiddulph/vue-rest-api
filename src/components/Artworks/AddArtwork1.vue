<template lang="html">
  <div>
    <sui-button @click.native="toggle">Add Artwork</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>Add Artwork</sui-modal-header>
      <sui-modal-content scrolling image>
        <sui-image
          wrapped
          size="medium"
          src="static/images/avatar/large/rachel.png"
        />
        <cld-context cloudName="defb2mzmx">
            <cld-image :publicId="publicId">
                <cld-transformation crop="scale" width="200" angle="10" />
            </cld-image>
        </cld-context>
        <sui-modal-description>
          <sui-header>Default Profile Image</sui-header>
          <sui-form @submit="onSubmit(artwork)">
            <sui-form-field>
                <label>Title</label>
                <input v-model="artwork.title" type="text" placeholder="Add a title..." />
            </sui-form-field>
            <sui-form-field>
                <label>Description</label>
                <textarea v-model="artwork.description" placeholder="Add a short description..." rows="2"></textarea>
            </sui-form-field>
            <sui-button type="submit" :disabled="!isValid" @click.prevent="onSubmit(artwork)">Submit</sui-button>
            </sui-form>
            <!-- <form >
              <input type="text" v-model="artwork.title" placeholder="Add Artwork...">
              <input type="text" v-model="artwork.description" placeholder="enter something...">
              
              <button :disabled="!isValid" @click.prevent="onSubmit(artwork)">Add</button>
          </form> -->
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddArtworkModal",
  props: ["userid", "publicId"],
  data() {
    return {
      open: false,
      artwork: {
        title: "",
        description: "",
        primary_art: "",
        created_by: 0,
        completed: 0,
      },
    };
  },
  methods: {
    ...mapActions(["addArtwork"]),
    toggle() {
      this.open = !this.open;
    },
    onSubmit(artwork) {
      this.created_by = this.getUser.id;
      console.log("ARTWORK: ", artwork);
      //this.addArtwork(artwork)
    }
  },
  computed: {
    isValid() {
      return this.artwork.title !== "" && this.artwork.description !== "";
    },
    ...mapGetters(["getUser"]),
  },
};
</script>