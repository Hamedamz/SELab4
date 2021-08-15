<template>
  <div>
    <div
      v-if="isLoading"
      class="d-flex justify-center"
    >
      <v-progress-circular indeterminate />
    </div>

    <template v-else>
      <user-card
        v-for="user in users"
        :key="user.id"
        class="mb-6"
        :user="user"
      />
    </template>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue';

export default {
  name: 'Admin',

  components: {
    UserCard,
  },

  data() {
    return {
      isLoading: false,
      users: [],
    };
  },

  created() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      this.isLoading = true;
      const { data } = await this.$axios.get('/profile/');
      this.users = data;
      this.isLoading = false;
    },
  },
};
</script>
