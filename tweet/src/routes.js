const express = require('express');

const {
  getUserTweets,
  getAllTweets,
  createTweet,
  deleteTweet,
} = require('./tweet');

const { getUserProfile } = require('./profile');

const tweetRoutes = express.Router();

tweetRoutes.get('', function (req, res, next) {
  getAllTweets()
    .then((tweets) => res.status(200).json(tweets))
    .catch(next);
});

tweetRoutes.post('', function (req, res, next) {
  const userId = req.headers['user-id'];
  const role = req.headers['user-role'];
  const { text, username } = req.body;

  createTweet(role, text, userId, username)
    .then((tweet) => res.status(200).json(tweet))
    .catch(next);
});

tweetRoutes.get('/users/:userId', function (req, res, next) {
  const { userId } = req.params;
  const authToken = req.headers.authorization;

  Promise.all([getUserProfile(userId, authToken), getUserTweets(userId)])
    .then(([profile, tweets]) => {
      return res.status(200).json({ profile, tweets});
    })
    .catch(next);
});

tweetRoutes.delete('/:tweetId', function (req, res, next) {
  const role = req.headers['user-role'];
  const { tweetId } = req.params;

  deleteTweet(role ,tweetId)
    .then((x) => res.status(200).json(x))
    .catch(next);
});

exports.tweetRoutes = tweetRoutes;
