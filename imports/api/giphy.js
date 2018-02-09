import React, { Component } from "react";
import { HTTP } from "meteor/http";

export default class Giphy extends Component {
  render() {
    const apiUrl = "http://api.giphy.com/v1/gifs/random";
    const apiKey = "W9getAhiytCkVjqRtffNqlpcoX7kglmp"; // dev use only. TODO: request production key: https://developers.giphy.com/dashboard/apply/19405/
    const searchQuery = ""; // optional search query
    const apiEndpoint = apiUrl + "?api_key=" + apiKey + "&tag=" + searchQuery;
    // console.log("API Endpoint: ", apiEndpoint);

    // https://docs.meteor.com/api/http.html

    const doTheThing = HTTP.call("GET", apiEndpoint, (error, result) => {
      if (!error) {
        const giphyImageURL = result.data.data.image_original_url;
        const giphyImageElement =
          "<img src='" + giphyImageURL + "' alt='Giphy image' />";

        document.write(giphyImageElement);
      } else {
        return "Error during Giphy API fetch";
      }
    });

    return null;
  }
}
