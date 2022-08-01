require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express()

var Twitter = require('twitter');
var { twitterScheduler } = require('./scheduler');

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

twitter.options.post_method = 'json';
const target = 'loukitzanna, clarity_tester';

var stream = twitter.stream('statuses/filter', { track: target });
stream.on('data', twitterScheduler);

stream.on('error', function (error) {
  console.log('🔥', error);
});
