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
          color="primary"
          rounded
          block
          type="submit"
        >
          login
        </v-btn>
      </v-form>
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
      username: '',
      password: '',
    };
  },

  methods: {
    login() {
      authInstance.login({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>

</style>
