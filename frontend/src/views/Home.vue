<template>
  <div>
    <user-card
      :user="user"
    />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { authInstance } from '../auth';
import UserCard from '../components/UserCard.vue';

export default {
  name: 'Home',

  components: {
    UserCard,
  },

  computed: {
    user() {
      return authInstance.user;
    },
  },
};
</script>
