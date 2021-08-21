<template>
  <v-card>
    <v-card-title>
      <router-link
        class="primary--text text--lighten-3"
        :to="{ name: 'user', params: { id: tweet.userId }}"
      >
        {{ tweet.username }}
      </router-link>
    </v-card-title>

    <v-card-text>
      {{ tweet.text }}
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        v-if="isAdmin"
        :loading="isLoading"
        icon
        @click="deleteTweet"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { authInstance } from '../auth';

export default {
  name: 'TweetCard',

  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    isAdmin() {
      return authInstance.isAdmin;
    },
  },

  methods: {
    async deleteTweet() {
      this.isLoading = true;

      await this.$axios.delete(`/tweets/${this.tweet.id}`);

      this.$emit('delete');
      this.isLoading = false;
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
