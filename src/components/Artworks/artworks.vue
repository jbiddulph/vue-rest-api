<template>
    <div>
        <AddArtwork1 :publicId="publicId"/>
        <FilterArtworks />
        <h3>Artworks</h3>
        1
              <cld-image cloudName="defb2mzmx" :publicId="publicId" crop="scale" width="300" />
2
    <cld-context cloudName="defb2mzmx">
      <cld-image :publicId="publicId">
        <cld-transformation crop="scale" width="200" angle="10" />
      </cld-image>
    </cld-context>
3
    <cld-image cloudName="defb2mzmx" :publicId="publicId">
    <cld-transformation angle="-45" />
    <cld-transformation effect="trim" angle="45" crop="scale" width="600" />
    <cld-transformation overlay="text:Arial_100:Hello" />
    </cld-image>

        
        <button @click="openUploadModal">Upload files</button>
        <cld-context cloudName="defb2mzmx">
            <div style="display: flex; justify-content: center;">
            <cld-image :publicId="publicId" width="250" crop="scale" />
            <cld-image :publicId="publicId" width="300" crop="scale" />
            <cld-image :publicId="publicId" width="350" crop="scale" />
            <cld-image :publicId="publicId" width="400" crop="scale" />
            <cld-image :publicId="publicId" width="450" crop="scale" />
            </div>
        </cld-context>
        
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
            <div 
                @dblclick="onDblClick(artwork)" 
                v-for="artwork in allArtworks" 
                :key="artwork.id" 
                class="artwork"
                v-bind:class="{'is-complete':artwork.live}"
                >
                {{artwork.title}}
                {{artwork.description}}
                <i @click="deleteArtwork(artwork.id)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>    
</template>

<script>
import FilterArtworks from '../Artworks/FilterArtworks'
import AddArtwork1 from '../Artworks/AddArtwork1'
import { mapGetters, mapActions } from 'vuex'
import { CldContext, CldImage } from 'cloudinary-vue'
export default {
    components: {
        AddArtwork1,
        FilterArtworks,
        CldContext,
        CldImage
    },
    name: 'Artworks',
    data() {
        return {
            url: '',
            publicId: ''
        }
    },
    methods: {
        ...mapActions([
            'fetchArtworks', 
            'getProfile', 
            'deleteArtwork', 
            'updateArtwork'
        ]),
        openUploadModal() {
            window.cloudinary.openUploadWidget(
                { cloud_name: 'defb2mzmx',
                upload_preset: 'choosday'
                },
                (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done uploading..: ', result.info);
                    this.url = result.info.url
                    this.publicId = result.info.public_id
                }
            }).open()
        },
        onDblClick(artwork) {
            const updArtwork = {
                id: artwork.id,
                title: artwork.title,
                description: artwork.description,
                created_by: artwork.created_by,
                live: !artwork.live,
            }
            this.updateTodo(updArtwork)
        }
    },
    computed: {
        ...mapGetters(['allArtworks', 'getUser'])    
    },
    created() {
        this.fetchArtworks()
        this.getProfile()
    },
    
}
</script>

<style scoped>
.legend {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
}
.incomplete-box {
    display: inline-block;
    width:10px;
    height:10px;
    background-color: #41b883;
}
.complete-box {
    display: inline-block;
    width:10px;
    height:10px;
    background-color: #35495e;
}
.is-complete {
    background-color: #35495e!important;
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