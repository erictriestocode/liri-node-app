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
}
if (input[2] === "do-what-it-says") {
    console.log("DEBUG: DO MY WORK BITCH")
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
        userSong = "Ace of Bass" //I think this is spelled properly? If only there was a website I could go to and check. Discussed in class that using the band name instead actually gave the desired results.
    }

    // From Spotify Node API Documentation
    // https://www.npmjs.com/package/node-spotify-api

    spotify
        .search({ type: 'track', query: userSong })
        .then(function (response) {
            console.log("DEBUG: " + userSong)
            console.log(response.tracks.items[0]);

            console.log
        })
        .catch(function (err) {
            console.log(err);
        });
};




// function for searching for Movies on OMDB
function movieSearch(movie) {

    var movieInput = movie;
    // Taken largely from 10.2 levelTwoOmdbInteractive.js activity, modified for the homework

    // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    // axios.get(queryUrl).then(
    //     function(response) {
    //         console.log("Release Year: " + response.data.Year);
    //     }

}

// function for doing what it says
// Named it Alfred after everyone's favorite butler
function alfred(butler) {
    // need to install fs
    // spotifySearch();
}