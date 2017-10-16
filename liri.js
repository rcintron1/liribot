var keys = require("./keys.js");
var Twitter = require('twitter');
// process parameters

var cliCommand = process.argv[2];
var toScreen = function(text){
    var x = Array(text.length + 1).join("*");
    console.log("\n" + x + "\n" + text + "\n" + x + "\n");
}
var cliParameter = function () {
    var values = '';
    for (i = 3; i < process.argv.length; i++) {
        values += process.argv[i];
        if (i !== process.argv.length - 1) {
            values += '+';
        }
    }
    return values;
}();

// Command line logic
switch (cliCommand) {
    case "my-tweets":
        toScreen("You have selected my-tweets");
        fTweet();
        break;
    case "spotify-this-song":
        toScreen("You have selected to spotify a song");
        fSpotify(cliParameter);
        break;
}

// console.log(cliCommand, cliParameter); //console Parameters
// console.log(keys);

// my-tweets - sow last 20 tweets and when they were created
function fTweet() {
    var twitterClient = new Twitter(keys.twitter);
    var params = {
        screen_name: 'lizstrom'
    };
    // twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
    //     if (!error) {
    //         console.log("***Tweets Below***");
    //         console.log(tweets);
    //         console.log(response);
    //     } else {
    //         console.log(error);
    //     }
    // });
    twitterClient.get('search/tweets', function(error, tweets, response) {
        if(error) throw error[0].message;
        console.log(tweets);  // The favorites.
        console.log(response);  // Raw response object.
      });
}
// spotify-this-song - thiw will show the following:
function fSpotify(track) {
    console.log("Starting Spotify song search");
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: track,
        limit: 5
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
        console.log(data.tracks.items[0].artists[0].name);
    });

}
// Artist, the song's name, a preview link of the song, the album that the song is from



// movie-this


// do-what-it-says