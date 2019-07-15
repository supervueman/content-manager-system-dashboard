<template lang="pug">
  v-expansion-panel(v-model="panel" expand)
    v-expansion-panel-content
      template.px-2(v-slot:header)
        div Общие данные
      v-card.mb-3
        v-card-text
          v-layout.wrap
            v-flex.md6.pr-3
              v-text-field(
                @input="$emit('update:lastname', $event)"
                :value="lastname"
                label="Фамилия:"
                required
              )
            v-flex.md6
              v-text-field(
                @input="$emit('update:firstname', $event)"
                :value="firstname"
                label="Имя:"
                required
              )
</template>

<script>
import panelMixin from "@/mixins/panelMixin";
export default {
  mixins: [panelMixin],
  props: {
    lastname: {
      type: String,
      default: ""
    },
    firstname: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      panelName: "panel-profile-main-data"
    };
  }
};
</script>

