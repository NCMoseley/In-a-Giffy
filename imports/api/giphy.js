import { Mongo } from "meteor/mongo";
import { HTTP } from "meteor/http";

export const GiphyUrls = new Mongo.Collection("giphyUrls"); // create a collection to store Giphy images

if (Meteor.isServer) {
  Meteor.publish("giphyUrls", function() {
    return GiphyUrls.find();
  });
}

Meteor.methods({
  "giphyUrls.getImage"(gameId) {
    const apiUrl = "http://api.giphy.com/v1/gifs/random";
    const apiKey = "W9getAhiytCkVjqRtffNqlpcoX7kglmp"; // dev use only. TODO: request production key: https://developers.giphy.com/dashboard/apply/19405/
    const searchQuery = ""; // optional search query
    const apiEndpoint = apiUrl + "?api_key=" + apiKey + "&tag=" + searchQuery;
    console.log(
      "Running giphyUrls.getImage... isSimulation:",
      this.isSimulation
    );

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

    if (!this.isSimulation) {
      const giphurl = getApi("GET", apiEndpoint, gameId)
        .then(result => {
          // console.log(result);
          return result.data.data.image_original_url;
        })
        .catch(error => {
          throw new Meteor.Error("500", `${error.message}`);
        })
        .then(res => {
          if (!GiphyUrls.find({ game: gameId }).count()) {
            console.log(
              "cannot find existing .gif document for this game, inserting new one..."
            );
            GiphyUrls.insert({ url: res, game: gameId });
          } else {
            console.log(
              "found existing .gif document for this game, updating..."
            );
            GiphyUrls.update({ game: gameId }, { $set: { url: res } });
          }
        });
    }

    // GiphyUrls.update("420", {
    //   $set: {
    //     url: res
    //   }
    // });
  }
});
