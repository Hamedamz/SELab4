<template>
  <v-card>
    <v-card-title>
      Signup
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="signup">
        <v-text-field
          v-model="model.username"
          label="username"
          solo-inverted
          flat
        />

        <v-text-field
          v-model="model.mobile"
          label="mobile"
          solo-inverted
          flat
        />

        <v-text-field
          v-model="model.email"
          label="email"
          solo-inverted
          flat
        />

        <v-text-field
          v-model="model.password"
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
          signup
        </v-btn>
      </v-form>

      <v-btn
        :to="{ name: 'login' }"
        class="mt-6"
        rounded
        text
        block
      >
        login
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Signup',

  data() {
    return {
      isLoading: false,
      model: {
        username: '',
        mobile: '',
        email: '',
        password: '',
      },
    };
  },

  methods: {
    async signup() {
      this.isLoading = true;

      await this.$axios.post('/auth/signup', this.model);

      this.isLoading = false;
      this.$router.replace({ name: 'login' });
    },
  },
};
</script>

<style scoped>

</style>
