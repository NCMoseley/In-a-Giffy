import { Mongo } from "meteor/mongo";
import { HTTP } from "meteor/http";

export const GiphyUrls = new Mongo.Collection("giphyUrls");

if (Meteor.isServer) {
  Meteor.publish("currentGify", function() {
    return GiphyUrls.findOne();
  });
}

Meteor.methods({
  "giphyUrls.getImage"() {
    const apiUrl = "http://api.giphy.com/v1/gifs/random";
    const apiKey = "W9getAhiytCkVjqRtffNqlpcoX7kglmp"; // dev use only. TODO: request production key: https://developers.giphy.com/dashboard/apply/19405/
    const searchQuery = ""; // optional search query
    const apiEndpoint = apiUrl + "?api_key=" + apiKey + "&tag=" + searchQuery;
    // console.log("API Endpoint: ", apiEndpoint);

    const getApi = (type, url, options) => {
      return new Promise((resolve, reject) => {
        HTTP.call(type, url, options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    };

    const giphurl = getApi("GET", apiEndpoint)
      .then(result => {
        console.log(result);
        return result.data.data.image_original_url;
      })

      .catch(error => {
        throw new Meteor.Error("500", `${error.message}`);
      })
      .then(res =>
        GiphyUrls.insert({
          url: res
        })
      );
  }
});
