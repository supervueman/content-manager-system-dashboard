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

  async beforeCreate() {
    await this.$store.dispatch("profile/fetchProfile");
    if (this.adminAccess || this.managerAccess) {
      if (this.$route.fullPath === "/login") {
        this.$router.back();
      }
    }
  }
};
</script>
