<template>
  <div>
    <div
      v-if="isLoading"
      class="text-center"
    >
      <v-progress-circular
        indeterminate
      />
    </div>

    <div v-else>
      <div class="mb-8">
        <h2>{{ profile.username }}</h2>

        <div>mobile: {{ profile.mobile }}</div>
        <div>email: {{ profile.email }}</div>
      </div>

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

export default {
  name: 'Tweets',

  components: { TweetCard },

  props: {
    userId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      tweets: [],
      profile: {},
      isLoading: true,
    };
  },

  created() {
    this.getUserTweets();
  },

  methods: {
    async getUserTweets() {
      this.isLoading = true;
      const { data } = await this.$axios.get(`/tweets/users/${this.userId}`);

      this.profile = data.profile;
      this.tweets = data.tweets;
      this.isLoading = false;
    },

    deleteTweet(i) {
      this.tweets.splice(i, 1);
    },
  },
};
</script>
