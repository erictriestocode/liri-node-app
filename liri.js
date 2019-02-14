// MAIN APP FILE!!!
// Requirement as specified in the instructions
require("dotenv").config();
var keys = require("./keys.js");

var input = process.argv;
var inputLength = process.argv.length - 2;


console.log("DEBUG: ***** WELCOME TO LIRI *****");
console.log("DEBUG: you have entered: " + input[2] + " and " + input[3]);
console.log("DEBUG: You have this many inputs: " + inputLength);

if (input[2] === "concert-this"){
    console.log("Concerts!")
    var band = "blink-182";
    concertSearch(band);
}
if (input[2] === "spotify-this-song"){
    console.log("Spotify!")
}
if (input[2] === "movie-this" ){
    console.log("Movies?")
}
if (input[2] === "do-what-it-says"){
    console.log("DO MY WORK BITCH")
} else{
    console.log("Guess you dont want me to do SHIT! Go to Google Assistant or Alexa or Siri(lol)")
}


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
// if(){
//     // get OMDB info using axios
// } else {
//     console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
//     console.log("It's on Netflix!");
// }
}

//  function for doing what it says
function alfred(){
    // need to install fs
    // spotifySearch();
}