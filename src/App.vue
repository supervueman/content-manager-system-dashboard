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
  watch: {
    accessDenied() {
      if (this.accessDenied) {
        if (this.$route.fullPath === "/auth" || this.$route.fullPath === "/") {
          this.$router.push("/profile");
        }
      } else {
        this.$router.push("/auth");
      }
    }
  },
  async mounted() {
    this.$router.push("/auth");
    await this.$store.dispatch("profile/fetchProfile");
  }
};
</script>
