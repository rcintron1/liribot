var keys = require("./keys.js");
var Twitter = require('twitter');
// process parameters

var cliCommand = process.argv[2];

//function to wrap text with "**"
var toScreen = function(text){
    var x;
    if (arguments.length>1){
        x = Array(arguments[1]).join("*");
    }else{
        x = Array(text.length + 1).join("*");
    }
    console.log(x + "\n" + text + "\n" + x + "\n");
};

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
    case "spotify":
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

    twitterClient.get('search/tweets',{q: 'lizstrom'}, function(error, tweets, response) {
        if(error) console.log(error);
        // console.log(tweets);  // The favorites.
        var statuses = tweets.statuses;
        var msg = "";
        for (var i = 0; i < statuses.length; i++){
            //  (i < statuses.length-1) ? msg += statuses[i].text + "\n" : msg += statuses[i].text;
            toScreen(statuses[i].text);
        };
        // console.log(response);  // Raw response object.
        // toScreen(msg, 10);
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
            //return console.log('Error occurred: ' + err);
            return err;
        }

        console.log(data);
        console.log(data.tracks.items[0].artists[0].name);
    });

}

// movie-this


// do-what-it-says