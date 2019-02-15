// MAIN APP FILE!!!
// ********************************************

// Requirement as specified in the instructions
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");

var input = process.argv;
var inputLength = process.argv.length - 2; //subtracting first two arguments(node path and file path)


console.log("DEBUG: ***** WELCOME TO LIRI *****");
console.log("DEBUG: you have entered: " + input[2] + " and " + input[3]);
console.log("DEBUG: You have this many inputs: " + inputLength);

// If statements to parse input and direct to the correct functions
// Guess I could have used switch statements here ¯\_(ツ)_/¯

if (input[2] === "concert-this") {
    console.log("DEBUG: Concerts!")
    var band = "queen";
    concertSearch(band);
}
if (input[2] === "spotify-this-song") {
    console.log("DEBUG: Spotify!")
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
    var concertdate;

    console.log("DEBUG: you have entered: " + artist)

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            // console.log(response);
            venueName = response.id;
            // venueLocationc = response.data.
                console.log("Response is: " + venueName);

            // console Name of Venue
            // console venue location
            // console date of the event
        }).catch(function(error) {
            console.log(error);
        });

}

// FUnction for searching for songs on Spotify
function spotifySearch() {

}

// function for searching for Movies on OMDB
function movieSearch() {


    // Taken largely from 10.2 levelTwoOmdbInteractive.js activity, modified for the homework

    // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    // axios.get(queryUrl).then(
    //     function(response) {
    //         console.log("Release Year: " + response.data.Year);
    //     }

}

//  function for doing what it says
function alfred() {
    // need to install fs
    // spotifySearch();
}