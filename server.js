// server.js file that takes an arbitrary port number as a command line argument (i.e. I should be able to run it with node server.js. The port should default to 5000 if no argument is given.

// Require Express.js
const express = require('express')
const app = express()
const args = require('yargs').argv


// define port variable
let port;

if (typeof args.port === "undefined") {
  port = 5000;
} else {
  port = args.port;
}

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
})

//endpoints
// Check endpoint at /app/ that returns 200 OK.
app.get('/app/', (req, res) => {
// Respond with status 200
	res.status = 200;
// Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

// Endpoint /app/flip/ that returns JSON {"flip":"heads"}
// or {"flip":"tails"} corresponding to the results of the random coin flip.
app.get('/app/flip', (req, res) => {
    res.status(200).json({'flip' : coinFlip()})
})

// Endpoint /app/flips/:number that returns JSON including an array of the raw random flips and a summary.
app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({"raw": flips,"summary": countFlips(flips)})
})

// Endpoint /app/flip/call/heads that returns the result of a random flip match against heads or tails as JSON.
app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
})

// Endpoint /app/flip/call/heads that returns the result of a random flip match against heads or tails as JSON.
app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
})

// Endpoint /app/flip/call/heads that returns the result of a random flip match against heads or tails as JSON.
app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
})

// Default API endpoint that returns 404 Not found for any endpoints that are not defined.
app.use(function(req, res){
  res.status(404).send('404 NOT FOUND')
  res.type("text/plain")
})


// functions
function coinFlip() {
  var coin = ["heads", "tails"];
  return coin[Math.floor(Math.random()*coin.length)];
}

function coinFlips(flips) {
    var i = 0;
    var results = new Array();
    while (i < flips) {
      results[i] = coinFlip();
      i++;
    }
    return results;
}

function countFlips(array) {
    if(array.length == 0){
      return;
    }
    var heads = 0;
    var tails = 0;

    for(var i = 0; i < array.length; i++){
      if(array[i] == "heads"){
        heads++;
      }
      else if(array[i] == "tails"){
        tails++;
      }
    }
    if(heads == 0){
      return "{ tails: "+tails+" }";
    }
    else if(tails == 0){
      return "{ heads: "+heads+" }";
    }
    return {"heads": heads, "tails": tails };
}

function flipACoin(call) {
  var flip = coinFlip();
  var result = "";
  if(call == flip){
    result = "win";
  }
  else{
    result = "lose";
  }
  return { "call": call, "flip": flip, "result": result };
}