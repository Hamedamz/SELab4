<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>MICRO TWEET</h1>

      <v-spacer />

      <template v-if="isLoggedIn">
        <v-btn
          color="primary"
          rounded
          depressed
          :to="{ name: 'home' }"
          exact
        >
          <v-icon left>
            mdi-home
          </v-icon>

          home
        </v-btn>

        <v-btn
          color="primary"
          rounded
          depressed
          :to="{ name: 'profile' }"
          exact
        >
          <v-icon left>
            mdi-account
          </v-icon>

          profile
        </v-btn>
      </template>

      <v-btn
        v-if="isAdmin"
        color="primary"
        rounded
        depressed
        :to="{ name: 'admin' }"
        exact
      >
        <v-icon left>
          mdi-shield
        </v-icon>

        admin
      </v-btn>

      <v-btn
        v-if="isLoggedIn"
        color="primary"
        rounded
        depressed
        @click="logout"
      >
        <v-icon left>
          mdi-logout
        </v-icon>

        logout
      </v-btn>
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

  computed: {
    isLoggedIn() {
      return Boolean(authInstance.token);
    },

    isAdmin() {
      return authInstance.isAdmin;
    },
  },

  methods: {
    logout() {
      authInstance.logout();
    },
  },
};
</script>
