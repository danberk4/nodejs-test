const Twit = require('twit')
const Config = require('./config.js')
const Helpers = require('./helpers')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hey, I\'m a Node.js app!')
});

app.listen(3000, () => {
    console.log('Server is up on 3000')
})

var Twitter = new Twit(Config);

// setting up a user stream
//var stream = Twitter.stream('user');


// Anytime someone tweets me
//stream.on('tweet', tweetEvent);


function tweetEvent(eventMsg) {
    var fs = require('fs');
    var json = JSON.stringify(eventMsg, null, 2);
    fs.writeFile("tweet.json", json, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '%23CJS%20%3Adberkiv',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // for more parameters, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {
            console.log(data);
            tweetEvent(data);
            // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            /*Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });*/
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
//retweet();
// retweet in every 50 minutes
//setInterval(retweet, 3000000);


/*var getAsset = Helpers.Stellar.getAsset('CJS', 'GDA7TJMHSWDUPS6BPKPTBQEZ24TGLVU4A2RZFQQ2SLOK6KTZQGX5XYOE');
getAsset.then(function (result){
    var numberAccounts = result.num_accounts;
})*/
