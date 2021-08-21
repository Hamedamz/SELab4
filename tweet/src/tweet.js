const { Tweet } = require('./db/models/tweet');
const { UserNotFoundException, Forbidden, NotFoundException} = require('./exceptions');
const { userRoles } = require('./enums');

exports.getUserTweets = async (userId) => {
  const tweets = await Tweet.find({ user_id: userId });

  if (!tweets) {
    throw new UserNotFoundException();
  }

  return tweets.map((tweet) => ({
    id: tweet.id,
    username: tweet.username,
    text: tweet.text,
  }));
};

exports.getAllTweets = async () => {
  const tweets = await Tweet.find();

  return tweets.map((tweet) => ({
    id: tweet.id,
    username: tweet.username,
    text: tweet.text,
  }));
};

exports.createTweet = async (role, text, userId, username) => {
  if (role !== userRoles.CLIENT) {
    throw new Forbidden('You don\'t have permission to create tweet');
  }

  const tweet = await new Tweet({
    text,
    username,
    user_id: userId,
  }).save();

  return {
    id: tweet.id,
    text: tweet.text,
    username: tweet.username,
    userId: tweet.user_id,
  };
};

exports.deleteTweet = async (role, tweetId) => {
  if (role !== userRoles.ADMIN) {
    throw new Forbidden('You don\'t have permission to delete tweet');
  }

  const tweet = await Tweet.findByIdAndDelete(tweetId);

  if (!tweet) {
    return new NotFoundException('Tweet not found');
  }

  return {
    id: tweet.id,
    text: tweet.text,
    username: tweet.username,
    userId: tweet.user_id,
  };
};
