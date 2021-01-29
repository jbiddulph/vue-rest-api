<template>
  <div>
    <AddArtwork1 />
    <FilterArtworks />
    <h3>Artworks</h3>

    <div class="legend">
      <span>double click to mark complete</span>
      <span>
        <span class="incomplete-box">Incomplete</span>
      </span>
      <span>
        <span class="complete-box">Complete</span>
      </span>
    </div>
    <div class="artworks">
      <sui-card-group :items-per-row="3">
        <sui-card
          @dblclick="onDblClick(artwork)"
          v-for="artwork in allArtworks"
          :key="artwork.id"
          class="artwork"
          v-bind:class="{ 'is-complete': artwork.live }"
        >
          <sui-image :src="artwork.primary_art" />
          <sui-card-content>
            <sui-card-header>{{ artwork.title }}</sui-card-header>
            <sui-card-meta>Friends</sui-card-meta>
            <sui-card-description>
              {{ artwork.description }}
            </sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <sui-icon name="user" /> {{ artwork.status }}
            <span slot="right"
              ><i
                @click="deleteArtwork(artwork.id)"
                class="fas fa-trash-alt"
              ></i
            ></span>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </div>
  </div>
</template>

<script>
import FilterArtworks from "../Artworks/FilterArtworks";
import AddArtwork1 from "../Artworks/AddArtwork1";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AddArtwork1,
    FilterArtworks,
  },
  name: "Artworks",
  methods: {
    ...mapActions([
      "fetchArtworks",
      "getProfile",
      "deleteArtwork",
      "updateArtwork",
    ]),
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          { cloud_name: "defb2mzmx", upload_preset: "choosday" },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.url = result.info.url;
              this.publicId = result.info.public_id;
            }
          }
        )
        .open();
    },
    onDblClick(artwork) {
      const updArtwork = {
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        status: artwork.status,
        primary_art: artwork.primary_art,
        height: artwork.height,
        width: artwork.width,
        cost: artwork.cost,
        live: !artwork.live,
        created_by: artwork.created_by,
      };
      this.updateArtwork(updArtwork);
    },
  },
  computed: {
    ...mapGetters(["allArtworks", "getUser"]),
  },
  created() {
    this.fetchArtworks();
    this.getProfile();
  },
};
</script>

<style scoped>
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #41b883;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #35495e;
}
.is-complete {
  background-color: #35495e !important;
  color: #ffffff;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #ffffff;
  cursor: pointer;
}
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  background-color: #41b883;
  color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
