<template lang="pug">
  v-expansion-panel(v-model="panel" expand)
    v-expansion-panel-content
      template(v-slot:header)
        div Деятельность и описание
      v-card
        v-card-text
          v-flex.md12
            text-editor(
              @input="$emit('update:description', $event)"
              :value="description"
            )
</template>

<script>
import TextEditor from "@/components/Editor/VueEditor";
import panelMixin from "@/mixins/panelMixin";
export default {
  mixins: [panelMixin],
  props: {
    description: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      panelName: "panel-profile-activity-data"
    };
  },
  components: {
    TextEditor
  }
};
</script>
