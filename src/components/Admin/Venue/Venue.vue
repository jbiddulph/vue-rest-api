<template> 
    <tr>
        <td>{{venue.id}}
          <img :src=getBaseUrl+changeImgPath height="100" />
        </td>
        <td>{{venue.venuename}} <small>{{venue.venuetype}}</small></td>
        <td>{{venue.address}}</td>
        <td>
            <i class="edit icon ui blue" @click="onEdit()"></i>
            <sui-button @click="toggle()">Show Modal</sui-button>
            <sui-modal v-model="open">
            <sui-modal-header>{{venue.venuename}}</sui-modal-header>
            <sui-modal-content scrolling image>
                <sui-image
                wrapped
                size="medium"
                :src=getBaseUrl+changeImgPath
                />
                <sui-modal-description>
                <sui-header>Default Profile Image</sui-header>
                </sui-modal-description>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive @click.native="toggle">
                OK
                </sui-button>
            </sui-modal-actions>
            </sui-modal>
            <button class="mini ui orange button" @click="onFullEdit()">Edit</button>
            <button class="mini ui red button" @click="onDelete()">Delete</button>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'Venue',
  props: {
      venue: {
          type: Object
      }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
      toggle() {
        this.open = !this.open;
        this.$emit("toggle", this.venue)
      },
      scrollToTop() {
        window.scrollTo(0,0);
      },
      onDelete() {
        this.$emit("onDelete", this.venue.id)
      },
      onEdit() {
        this.scrollToTop()
        this.$emit("onEdit", this.venue)
      }
  },
  computed: {
    getUrl() {
      return this.$store.getters.getUrl
    },
    getBaseUrl() {
      return this.$store.getters.getBaseUrl
    },
    changeImgPath() {
      return this.venue.photo.replace(/^public\//, 'storage/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
