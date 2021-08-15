<template>
  <v-card>
    <v-card-title>
      Login
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="username"
          label="username"
          solo-inverted
          flat
        />

        <v-text-field
          v-model="password"
          label="password"
          type="password"
          solo-inverted
          flat
        />

        <v-btn
          :loading="isLoading"
          color="primary"
          rounded
          block
          type="submit"
        >
          login
        </v-btn>
      </v-form>

      <v-btn
        :to="{ name: 'signup' }"
        class="mt-6"
        rounded
        text
        block
      >
        signup
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { authInstance } from '../auth';

export default {
  name: 'Login',

  data() {
    return {
      isLoading: false,
      username: '',
      password: '',
    };
  },

  methods: {
    async login() {
      this.isLoading = true;

      await authInstance.login({
        username: this.username,
        password: this.password,
      });

      this.isLoading = false;
    },
  },
};
</script>
