<template lang="pug">
	v-flex
		.body-2.mb-5 Ваш профиль: {{profile.slug}}
		profile-view(:profile="profile" operationKey="update")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

export default {
  name: "ProfilePage",
  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    }
  },
  components: {
    ProfileView
  }
};
</script>
