<template lang="pug">
  v-expansion-panel(v-model="panel" expand)
    v-expansion-panel-content
      template(v-slot:header)
        div Метаданные
      v-card
        v-card-text
          v-text-field(
            label="Title:"
            required
          )
          v-textarea(
            label="Description"
            auto-grow
            counter="255"
          )
        v-card-actions
          v-btn.ml-2(
            color="primary"
          ) Сохранить
</template>

<script>
import panelMixin from "@/plugins/panelMixin";
export default {
  mixins: [panelMixin],
  props: {
    keyName: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      panel: [false],
      panelName: "panel-meta-data"
    };
  },
  computed: {
    meta() {
      return this.$store.getters.getMeta;
    }
  }
};
</script>
