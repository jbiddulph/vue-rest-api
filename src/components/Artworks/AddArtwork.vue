<template lang="html">
  <div>
    <sui-button @click.native="toggle">Add Artwork</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>Add Artwork</sui-modal-header>
      <sui-modal-content scrolling image>
        <cld-context cloudName="defb2mzmx">
            <div style="display: flex; justify-content: center;">
                <cld-image :publicId="publicId" width="300" crop="scale" />
            </div>
        </cld-context>
        <sui-modal-description>
          <!-- <sui-header>Default Profile Image</sui-header> -->
          <button class="large ui teal button" @click="openUploadModal">Upload your artwork</button>
          <sui-form @submit="onSubmit(artwork)">
            <sui-form-field>
                <label>Title</label>
                <input v-model="artwork.title" type="text" placeholder="Add a title..." />
            </sui-form-field>
            <sui-form-field>
                <label>Description</label>
                <textarea v-model="artwork.description" placeholder="Add a short description..." rows="2"></textarea>
            </sui-form-field>
            <sui-form-field>
                <label>Image path</label>
                <input v-model="artwork.primary_art" type="text" placeholder="Upload your artwork" disabled @click="openUploadModal" />
            </sui-form-field>
            <sui-form-fields fields="three">
      <sui-form-field>
        <label>Height</label>
        <input type="text" v-model="artwork.height" placeholder="Height" />
      </sui-form-field>
      <sui-form-field>
        <label>Width</label>
        <input type="text" v-model="artwork.width" placeholder="Width" />
      </sui-form-field>
      <sui-form-field>
        <label>Cost</label>
        <input type="text" v-model="artwork.cost" placeholder="Cost" />
      </sui-form-field>
    </sui-form-fields>
    <sui-form-fields fields="two">
      <sui-form-field>
      <label>Status</label>
      <sui-form-fields grouped>
      <label for="status">Select your status:</label>
      <sui-form-field>
        <sui-checkbox radio v-model="artwork.status" name="status" label="gallery ready" value="1" />
      </sui-form-field>
      <sui-form-field>
        <sui-checkbox radio v-model="artwork.status" name="status" label="not teady" value="2" />
      </sui-form-field>
      <sui-form-field>
        <sui-checkbox radio v-model="artwork.status" name="status" label="insiration" value="3" />
      </sui-form-field>
      <sui-form-field>
        <sui-checkbox radio v-model="artwork.status" name="status" label="other" value="4" />
      </sui-form-field>
    </sui-form-fields>
    </sui-form-field>
    <sui-form-field>
      <sui-checkbox toggle label="Live" v-model="artwork.live" />
    </sui-form-field>
      </sui-form-fields>
            <sui-button type="submit" :disabled="!isValid" @click.prevent="onSubmit(artwork)">Submit</sui-button>
            </sui-form>
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
import { CldContext, CldImage } from "cloudinary-vue";
export default {
  name: "AddArtworkModal",
  props: ["userid"],
  components: {
    CldContext,
    CldImage,
  },
  data() {
    return {
      open: false,
      artwork: {
        title: "",
        description: "",
        status: "",
        primary_art: "",
        width: "",
        height: "",
        cost: "",
        created_by: 4,
        live: 0,
      },
      url: "",
      publicId: "",
      statusoptions: [
        {
          text: "unfinished",
          value: 1,
        },
        {
          text: "Gallery ready",
          value: 2,
        },
      ],
    };
  },
  methods: {
    ...mapActions(["addArtwork"]),
    toggle() {
      this.open = !this.open;
    },
    onSubmit(artwork) {
      artwork.created_by = this.getUser.id
      //console.log("ARTWORK: ", artwork);
      this.addArtwork(artwork)
    },
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          { cloud_name: "defb2mzmx", upload_preset: "choosday" },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.url = result.info.url;
              this.publicId = result.info.public_id;
              this.artwork = {
                primary_art: this.url,
              };
            }
          }
        )
        .open();
    },
  },
  computed: {
    isValid() {
      return this.artwork.title !== "" && this.artwork.description !== "";
    },
    ...mapGetters(["getUser"]),
  },
};
</script>