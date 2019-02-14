// Requirement as specified in the instructions
require("dotenv").config();
var keys = require("./keys.js");

var input = process.argv[2];







//  ***** FUNCTIONS *****

// Function for searching for concerts 
function concertSearch(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then( function(response){
        console.log(response);
        // console Name of Venue
        // console venue location
        // console date of the event
    }).catch(function(error){
        console.log(error);
    });
}

// FUnction for searching for songs on Spotify
function spotifySearch(){

}

// function for searching for Movies on OMDB
function movieSearch(){

}

//  function for doing what it says
function alfred(){

}