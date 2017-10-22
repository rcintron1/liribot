var keys = require("./keys.js");
var Twitter = require('twitter');
// process parameters

var cliCommand = process.argv[2];

//function to wrap text with "**"
var toScreen = function (text) {
    var x;
    if (arguments.length > 1) {
        x = Array(arguments[1]).join("*");
    } else {
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
// do-what-it-says
switch (cliCommand) {
    case "my-tweets":
        var twitterHandle = cliParameter;
        twitterHandle = twitterHandle.length > 1?twitterHandle:'lizstrom';
        toScreen("You have selected " + twitterHandle + " tweets");
        fTweet(twitterHandle);
        break;
    case "spotify":
        toScreen("You have selected to spotify a song");
        fSpotify(cliParameter);
        break;
    case "movie-this":
        var title = cliParameter;
        title = title.length > 1?title:'Home+Alone';
        toScreen("You have selected the movie " + title.replace("+"," "));
        movieThis(title);
        break;
    default:
        toScreen("Welcome to Liri, the CLI operated intelligence software\n" +
        "type my-tweets and a twitter handle\n"+
        "type spotify and a song name");
}

// my-tweets - sow last 20 tweets and when they were created
function fTweet(twitterHandle) {
    var twitterClient = new Twitter(keys.twitter);
    var params = {
        screen_name: twitterHandle
    };

    twitterClient.get('search/tweets', {
        q: twitterHandle
    }, function (error, tweets, response) {
        if (error) console.log(error);
        // console.log(tweets);  // The favorites.
        var statuses = tweets.statuses;
        var msg = "";
        for (var i = 0; i < statuses.length; i++) {
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
        var songs = data.tracks.items;
        var msg = 'Bands who play ' + track.split("+").join(" ") + "\n";
        var count = msg.length;
        msg += Array(count).join("*") + "\n";
        songs.forEach(function (song) {
            var x = song.artists[0].name;
            if (msg.indexOf(x) === -1){
            msg += x + "\n";
            count = x.length > count ? x.length : count;
            }
        });
        toScreen(msg.trim(), count);
    });
}

// movie-this
function movieThis(title){
    var request = require('request-promise');
    
    var options = {
        uri: 'http://www.omdbapi.com/',
        qs: {
            apikey: '40e9cece',
            t: title
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    
    request(options)
        .then(function(data){
            var op = ""; //output of data 
            op += "Title of movie -> " + data.Title + "\n";
            op += "Year movie came out -> " + data.Year + "\n";
            op += "IMDB rating is -> " + data.imdbRating + "\n";
            op += "Country movie was produced -> " + data.Country + "\n";
            op += "Language -> " + data.Language + "\n";
            op += "Plot -> " + data.Plot + "\n";
            op += "Actors -> " + data.Actors;
            toScreen(op)

        })
        .catch(function (err){
            console.log(err);
        });
}