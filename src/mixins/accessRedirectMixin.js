const mixin = {
  async mounted() {
    await this.$store.dispatch("profile/fetchProfile");
    if (this.$route.fullPath === "/auth" || this.$route.fullPath === "/") {
      if (this.$store.getters["profile/getProfile"].role === "admin") {
        this.$router.push("/profile");
      }
    }
  }
}

export default mixin;
