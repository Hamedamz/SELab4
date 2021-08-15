<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>Service</h1>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row
          justify="center"
          class="pt-12"
        >
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
          >
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import { authInstance } from './auth';

export default {
  name: 'App',

  async beforeCreate() {
    if (!authInstance.ready) {
      await authInstance.init();
    }
  },
};
</script>
