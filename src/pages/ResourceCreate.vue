<template lang="pug">
  v-flex(v-if="managerAccess")
    .body-2.mb-5 Создание ресурса
      v-layout.wrap.pt-5
        resource-create()
</template>

<script>
// Components
import ResourceCreate from "@/components/Resource/ResourceCreate";

// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "ResourceCreatePage",
  mixins: [accessMixin],

  components: {
    ResourceCreate
  }
};
</script>
