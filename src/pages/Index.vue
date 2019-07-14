<template lang="pug">
  div.page
</template>

<script>
import config from "@/config";
export default {
  data() {
    return {
      staticFolderBasePath: config.staticFolderBasePath
    };
  },
  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    }
  }
};
</script>
