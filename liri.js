// MAIN APP FILE!!!
// ********************************************

// Requirement as specified in the instructions
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");


var input = process.argv;
var inputLength = process.argv.length - 2; //subtracting first two arguments(node path and file path)
var userInput = process.argv.slice(3).join(" ");; //     var artistName = process.argv.slice(3).join(" ");


// Separators for the output to make them easier to find
var topLine = "*****************************************\n"
var bottomLine = "\n*****************************************"

console.log("DEBUG: ***** WELCOME TO LIRI *****");
console.log("DEBUG: you have entered: " + input[2] + " and " + userInput);
console.log("DEBUG: You have this many inputs: " + inputLength);

// If statements to parse input and direct to the correct functions
// Guess I could have used switch statements here ¯\_(ツ)_/¯

if (input[2] === "concert-this") {
    console.log("DEBUG: Concerts!")
    concertSearch(userInput);
}
if (input[2] === "spotify-this-song") {
    console.log("DEBUG: Spotify!")
    spotifySearch(userInput);
}
if (input[2] === "movie-this") {
    console.log("DEBUG: Movies?")
    movieSearch(userInput);
}
if (input[2] === "do-what-it-says") {
    console.log("DEBUG: RandomFile!")
    randomFile();
}


//  ***** FUNCTIONS *****

// Function for searching for concerts
function concertSearch(artist) {
    var venueName;
    var venueLocation;
    var concertDate;


    console.log("DEBUG: you have passed in: " + artist)

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            venueName = response.data[0].venue.name;
            venueLocation = response.data[0].venue.city;
            concertDate = response.data[0].datetime;

            // not ideal but for constructing this function it made more visual sense to me how this was done. Likely reduce it to one log statement.
            console.log(topLine);
            console.log("CONCERT INFORMATION FOR " + artist);
            console.log("NEXT EVENT: " + venueName);
            console.log("EVENT LOCATION: " + venueLocation);
            console.log("EVENT DATE: " + concertDate);
            console.log(bottomLine);

            // console Name of Venue
            // console venue location
            // console date of the event
        }).catch(function (error) {
            console.log(error);
        });

}

// Function for searching for songs on Spotify
function spotifySearch(song) {
    var userSong = song;
    var spotify = new Spotify(keys.spotify);


    if (!userSong) {
        userSong = "Ace of Base" // Discussed in class that using the band name instead actually gave the desired results.
    }

    // From Spotify Node API Documentation
    // https://www.npmjs.com/package/node-spotify-api

    spotify
        .search({ type: 'track', query: userSong })
        .then(function (response) {
            console.log("DEBUG: " + userSong)

            // Again will clean this up at another point
            console.log(topLine);
            console.log("SONG NAME: " + response.tracks.items[0].name);
            console.log("ARTIST NAME: " + response.tracks.items[0].artists[0].name);
            console.log("ALBUM NAME: " + response.tracks.items[0].album.name);
            console.log("PREVIEW LINK: " + response.tracks.items[0].external_urls.spotify);

            console.log(bottomLine);
        })
        .catch(function (err) {
            console.log(err);
        });
};




// function for searching for Movies on OMDB
function movieSearch(movie) {
    // Taken heavily from 10.2 levelTwoOmdbInteractive.js activity and modified for this assignment
    var movieInput = movie;

    if (!movieInput) {
        movieInput = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            // Again, a lot of extra code but I like the readability better
            console.log(topLine);
            console.log("MOVIE TITLE: " + response.data.Title);
            console.log("MOVIE YEAR: " + response.data.Year);
            console.log("IMDB RATING: " + response.data.Ratings[0].Value);
            console.log("ROTTEN TOMATOES RATING: " + response.data.Ratings[1].Value);
            console.log("PRODUCTION COUNTRY: " + response.data.Country);
            console.log("MOVIE LANGUAGE: " + response.data.Language);
            console.log("MOVIE CAST: " + response.data.Actors);
            console.log("MOVIE PLOT: " + response.data.Plot);
            console.log(bottomLine);
        });

}

// function for doing what it says
// Heavily influenced by 10.2 Activity 12 from main class Repositiory
function randomFile(butler) {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        console.log(data);

        var fileInput = data.split(",");
        console.log(fileInput);

        for(i=0;i<fileInput.length;i++){
            newCommand = process.argv.push(fileInput[i]);
        }
        
        console.log(newCommand);


        //    var newCommand = process.argv.push(fileInput);
        //    console.log(newCommand);
    });
}