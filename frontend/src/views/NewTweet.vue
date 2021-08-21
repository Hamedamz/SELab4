<template>
  <v-card
    outlined
    color="primary"
  >
    <v-card-title>
      New Tweet
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="createTweet">
        <v-text-field
          v-model="tweetText"
          placeholder="what's going on"
          solo-inverted
          flat
        />

        <div class="text-right">
          <v-btn
            :disabled="!tweetText"
            :loading="isLoading"
            color="white"
            light
            rounded
            type="submit"
          >
            create
          </v-btn>
        </div>
      </v-form>
    </v-card-text>

    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      color="green"
    >
      {{ text }}
    </v-snackbar>
  </v-card>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { authInstance } from '../auth';

export default {
  name: 'NewTweet',

  data() {
    return {
      snackbar: false,
      text: '',
      isLoading: false,
      tweetText: '',
    };
  },

  methods: {
    async createTweet() {
      this.isLoading = true;

      try {
        const { data } = await this.$axios.post('/tweets/', {
          username: authInstance.user.username,
          text: this.tweetText,
        });

        this.$emit('create', data);
      } finally {
        this.showSnackbar('Tweet created');
        this.isLoading = false;
      }
    },

    showSnackbar(text) {
      this.text = text;
      this.snackbar = true;
    },
  },
};
</script>
