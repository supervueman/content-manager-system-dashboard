<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Создание шаблона
      v-layout.wrap.pt-5
        layout-create
</template>

<script>
// Components
import LayoutCreate from "@/components/Layout/LayoutCreate";

// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "LayoutCreatePage",
  mixins: [accessMixin],

  components: {
    LayoutCreate
  }
};
</script>
