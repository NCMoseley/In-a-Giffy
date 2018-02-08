import React, { Component } from "react";
import { HTTP } from "meteor/http";

export default class Giphy extends Component {
  render() {
    const apiUrl = "http://api.giphy.com/v1/gifs/random";
    const apiKey = "W9getAhiytCkVjqRtffNqlpcoX7kglmp"; // dev use only. TODO: request production key: https://developers.giphy.com/dashboard/apply/19405/
    const searchQuery = ""; // optional search query
    const apiEndpoint = apiUrl + "?api_key=" + apiKey + "&tag=" + searchQuery;
    console.log("API Endpoint: ", apiEndpoint);

    // https://docs.meteor.com/api/http.html

    const giphyImageURL = HTTP.call("GET", apiEndpoint, (error, result) => {
      if (!error) {
        console.log(result.data.data.image_original_url);
        return result.data.data.image_original_url;
      } else {
        console.log("Error during Giphy API fetch");
      }
    });

    console.log(giphyImageURL);

    return giphyImageURL !== undefined ? (
      <img src={giphyImageURL} alt="In a .giffy" />
    ) : null;
  }
}
