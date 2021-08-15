<template>
  <v-card>
    <v-card-title>
      {{ user.username }}
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          v-model="model.mobile"
          label="mobile"
          :readonly="isReadonly"
          solo-inverted
          flat
        />

        <v-text-field
          v-model="model.email"
          label="email"
          :readonly="isReadonly"
          solo-inverted
          flat
        />

        <v-select
          v-model="model.role"
          label="role"
          :items="['client', 'admin']"
          :readonly="isRoleReadonly"
          solo-inverted
          flat
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        v-if="isAdmin || isMe"
        v-bind="buttonAttrs"
        :loading="isLoading"
        v-on="buttonListeners"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>

        <span v-if="!isReadonly">
          edit
        </span>
      </v-btn>
    </v-card-actions>

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
import { authInstance } from '../auth';

export default {
  name: 'UserCard',

  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isReadonly: true,
      isLoading: false,
      snackbar: false,
      text: '',
      model: {
        email: '',
        mobile: '',
        role: '',
      },
    };
  },

  computed: {
    isRoleReadonly() {
      return this.isReadonly || !this.isAdmin;
    },

    isAdmin() {
      return authInstance.isAdmin;
    },

    isMe() {
      return this.user.id === authInstance.userId;
    },

    buttonAttrs() {
      return {
        icon: this.isReadonly,
        rounded: !this.isReadonly,
        color: this.isReadonly ? undefined : 'primary',
      };
    },

    buttonListeners() {
      return {
        click: this.isReadonly ? this.toggleEdit : this.editProfile,
      };
    },
  },

  watch: {
    user: {
      deep: true,
      handler() {
        this.setModel();
      },
    },
  },

  methods: {
    async editProfile() {
      this.isLoading = true;

      this.$axios.put(`/profile/${this.user.id}`, this.model);

      this.isLoading = false;
      this.toggleEdit();
      this.showSnackbar('profile updated');
    },

    toggleEdit() {
      this.isReadonly = !this.isReadonly;
    },

    setModel() {
      this.model.email = this.user.email;
      this.model.mobile = this.user.mobile;
      this.model.role = this.user.role;
    },

    showSnackbar(text) {
      this.text = text;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>

</style>
