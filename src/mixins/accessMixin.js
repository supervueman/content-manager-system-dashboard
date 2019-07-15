const mixin = {
  computed: {
    profile() {
      return this.$store.getters['profile/getProfile'];
    },
    adminAccess() {
      const bool = this.profile.role === 'admin' && this.profile.rang === 9999 && this.profile.id !== '' && this.profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    managerAccess() {
      const bool = this.profile.role === 'manager' && this.profile.rang === 1 && this.profile.id !== '' && this.profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    userAccess() {
      const bool = this.profile.role === 'user' && this.profile.rang === 0 && this.profile.id !== '' && this.profile.id !== undefined;

      if (bool) return true;
      return false;
    }
  },
}

export default mixin;
