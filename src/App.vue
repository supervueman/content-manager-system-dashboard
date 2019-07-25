<template lang="pug">
	v-app(light)
		transition(name="fade")
			notification(
				v-if="notification.isNotification"
				:type="notification.type"
				:message="notification.message"
			)
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
  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    },
    notification() {
      return this.$store.getters.getNotification;
    }
  },
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

<style lang="sass">
.fade-enter-active, .fade-leave-active
	transition: opacity .5s
.fade-enter, .fade-leave-to
	opacity: 0

.v-expansion-panel__header
	padding: 16px
</style>

