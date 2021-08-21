<template>
  <div>
    <div
      v-if="!isAdmin"
      class="mb-8"
    >
      <new-tweet @create="addTweet" />
    </div>

    <div
      v-if="isLoading"
      class="text-center"
    >
      <v-progress-circular
        indeterminate
      />
    </div>

    <div v-else>
      <tweet-card
        v-for="(tweet, i) in tweets"
        :key="tweet.id"
        :tweet="tweet"
        class="mb-6"
        @delete="deleteTweet(i)"
      />
    </div>
  </div>
</template>

<script>
import TweetCard from '../components/TweetCard.vue';
import NewTweet from './NewTweet.vue';

// eslint-disable-next-line import/no-cycle
import { authInstance } from '../auth';

export default {
  name: 'Home',

  components: { NewTweet, TweetCard },

  data() {
    return {
      tweets: [],
      isLoading: true,
    };
  },

  computed: {
    isAdmin() {
      return authInstance.isAdmin;
    },
  },

  created() {
    this.loadTweets();
  },

  methods: {
    async loadTweets() {
      this.isLoading = true;
      const { data } = await this.$axios.get('/tweets/');

      this.tweets = data;
      this.isLoading = false;
    },

    deleteTweet(i) {
      this.tweets.splice(i, 1);
    },

    addTweet(tweet) {
      this.tweets.unshift(tweet);
    },
  },
};
</script>
