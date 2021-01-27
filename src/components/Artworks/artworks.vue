<template>
    <div>
        <AddArtwork />
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
import AddArtwork from '../Artworks/AddArtwork'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        AddArtwork,
        FilterArtworks
    },
    name: 'Artworks',
    methods: {
        ...mapActions([
            'fetchArtworks', 
            'getProfile', 
            'deleteArtwork', 
            'updateArtwork'
        ]),
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