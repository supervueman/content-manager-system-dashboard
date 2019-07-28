<template lang="pug">
	v-flex(v-if="adminAccess")
		.body-2.mb-5 Профиль: {{user.slug}}
		profile-view(:profile="user" operationKey="update")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

export default {
  name: "UserPage",
  mixins: [accessMixin],
  computed: {
    user() {
      return this.$store.getters["user/get"];
    }
  },
  components: {
    ProfileView
  },
  async beforeCreate() {
    await this.$store.dispatch("user/fetch", this.$route.params.id);
  }
};
</script>
