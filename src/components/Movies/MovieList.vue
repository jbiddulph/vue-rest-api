<template>
  <div>
    <p>
      <input type="text" v-model="searchKey" />
      <button type="submit" v-on:click="searchMovies()">Search</button>
    </p>
    <h2>Results</h2>

    <div v-for="item in moviesList.Search" :key="item.id">
      <div v-bind:movie="item">
        <sui-card>
          <sui-image v-bind:src="item.Poster" />
          <sui-card-content>
            <sui-card-header>{{ item.Title }}</sui-card-header>
            <sui-card-meta>{{ item.Year }}</sui-card-meta>
            <sui-card-description
              >Type:{{ item.Type }}&nbsp;({{
                item.imdbID
              }})</sui-card-description
            >
          </sui-card-content>
          <sui-card-content extra>
            <sui-button
              v-on:click="addFavourite(item)"
              circular
              icon="heart"
              color="red"
            />
          </sui-card-content>
        </sui-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["movie"],
  data() {
    return {
      searchKey: "",
      moviesList: [],
    };
  },
  methods: {
    searchMovies() {
      var url = "http://omdbapi.com/?s=" + this.searchKey + "&apikey=33047d7c";
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.moviesList = data;
        });
    },
    addFavourite(movie) {
      axios
        .post("http://choosapi.test/api/favefilms", movie, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>