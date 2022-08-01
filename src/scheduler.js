require('dotenv').config();

var Twitter = require('twitter');
var { Wit } = require('node-wit');
var moment = require('moment');
var { getSuggestions } = require('./suggestions');

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

twitter.options.post_method = 'json';

const wit = new Wit({
  accessToken: process.env.WIT_SERVER_TOKEN,
});

async function twitterScheduler(event) {
  console.log(event.text);
  const tweetText = event.text;
  const tweeter = event.user.screen_name;

  // Parse text for a datetime
  const witResponse = await wit.message(tweetText);

  if (Object.keys(witResponse.entities).length > 0 && witResponse.entities.datetime) {
    // if there is a datetime, send target a DM with the parsed date
    const date = moment(witResponse.entities.datetime[0].value).format('ddd, MMM Do, h:mma');

    const userObject = await twitter.get('users/lookup', { screen_name: tweeter });
    const suggestions = getSuggestions(3);

    const params = {
      event: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id: userObject[0].id_str,
            screen_name: tweeter,
          },
          message_data: {
            text: `Hello, ${userObject[0].name} has asked about the following time: ${date}.\nOriginal message: ${tweetText}`,
            quick_reply: {
              type: "options",
              options: suggestions
            }
          }
        }
      }
    }

    twitter.post('direct_messages/events/new', params, function (error, message, response) {
      if (message && message.event && !message.errors) {
        console.log(params.event);
        console.log(message, message.event);
        console.log(`🌟 Success! you sent this:\n'${message.event.message_create.message_data.text}' to ${userObject[0].name}`);
      } else {
        console.log(params.event.message_create.message_data.text);
        console.log('👹\n', error || message.errors);
      }
    });
  }
}

module.exports = { twitterScheduler };