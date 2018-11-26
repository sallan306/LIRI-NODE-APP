require("dotenv").config();
const Spotify = require('node-spotify-api');
const axios = require("axios");
const moment = require("moment");
const chalk = require("chalk");
const fs = require("fs");

const keys = require("./keys.js");
const spotifyID = keys.spotify.id
const spotifySecret = keys.spotify.secret
const spotify = new Spotify({
    id: spotifyID,
    secret: spotifySecret
});

functionCall = process.argv[2];
argument = process.argv[3];

console.log(chalk`
function choice: {blue ${functionCall}}
Your search: {blue ${argument}}
`);

if (functionCall === "concert-this"){
    concertThis(argument)   
}else if (functionCall === "spotify-this-song"){
    spotifyThisSong(argument)
}else if (functionCall === "movie-this"){
    movieThis(argument)
}else if (functionCall === "do-what-it-says"){
    doWhatItSays(argument)
}else {
    console.log("not a function, try again")
}

function concertThis(bandName) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    // Using axios to get the query.
    axios.get(queryUrl).then(function(res, err){
        // For each response object, perform this function
        res.data.forEach(function(concert){
            // Converting date to my format.
            var concertDate = concert.datetime.split("T");
            var momentDate = moment(concertDate[0]).format("DDMMMYYYY");
            
            // Prints the information
            console.log(chalk`
Venue: {red ${concert.venue.name}}
Locaiton: {redBright ${concert.venue.city}},{magenta ${concert.venue.region}},{white ${concert.venue.country}}
Date: {green ${momentDate}}
            `);
            console.log("hi")
            // Formats information for log(without colors)
            // Logs information to log.txt
            // logBook(searchLog, printed);
        }); // End of forEach.
    }).catch(function(err){
        console.log("There seems to be a problem.");
    }); 
}
function spotifyThisSong(song) {
    spotify.search({
        type: "track", query: song, limit: 5
        }).then(function(res){
            // console.log(res);
            res.tracks.items.forEach(function(songs){
    
                
                console.log(chalk`
Artist: {blue ${songs.artists[0].name}}
Song Title: {green ${songs.name}}
Album: {green ${songs.album.name}}
Spotify Link: {green ${songs.external_urls.spotify}}
                `);
            });
        }).catch(function(err){
            console.log("There's an issue with the seach. Please try again.");
        })
      
}
function movieThis(movie) {
    var search = movie
    var movieURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + search; 
    axios.get(movieURL).then(function(res, err){
    var dataRef = res.data
    console.log(chalk`
                Title: {blue ${dataRef.Title}}
                Year: {blue ${dataRef.Year}}
                IMDB Rating: {blue ${dataRef.Ratings[0].Value}}
                Rotton Tomatoes Rating: {blue ${dataRef.Ratings[1].Value}}
                Country Produced: {blue ${dataRef.Country}}
                Language: {blue ${dataRef.Language}}
                Plot: {blue ${dataRef.Plot}}
                Actors: {blue ${dataRef.Actors}}
                `)
    
       
    }).catch(function(err){
        console.log("There seems to be a problem.");
    });    
}
function doWhatItSays(action) {

}