<template lang="pug">
  v-app(light)
    toolbar(
      :profileId="profile.id"
      :profileFirstname="profile.firstname"
      :profileLastname="profile.lastname"
      :profileAvatar="profile.avatar"
    )
    
    sidebar(v-if="adminAccess || managerAccess")
    v-content
      v-container(fluid)
        router-view
</template>

<script>
import accessMixin from "@/mixins/accessMixin";
export default {
  name: "App",
  mixins: [accessMixin],
  data() {
    return {
      //
    };
  },
  async mounted() {
    await this.$store.dispatch("profile/fetchProfile");
    if (this.$route.fullPath === "/auth" || this.$route.fullPath === "/") {
      if (this.$store.getters["profile/getProfile"].role === "admin") {
        this.$router.push("/profile");
      }
    }
  }
};
</script>
