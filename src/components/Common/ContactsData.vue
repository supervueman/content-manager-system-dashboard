<template lang="pug">
  v-expansion-panel(v-model="panel" expand)
    v-expansion-panel-content
      template.px-2(v-slot:header)
        div Контакты
      v-card
        v-card-text
          v-layout.wrap
            v-flex.md6.pr-3
              v-text-field(
                @input="$emit('update:email', $event)"
                :value="email"
                label="E-mail:"
                required
              )
            v-flex.md6
              v-text-field(
                @input="$emit('update:phone', $event)"
                :value="phone"
                label="Телефон:"
                required
              )
            v-flex.md6.pr-3
              v-text-field(
                @input="$emit('update:vkontakte', $event)"
                :value="vkontakte"
                label="Vkontakte:"
                required
              )
            v-flex.md6
              v-text-field(
                @input="$emit('update:facebook', $event)"
                :value="facebook"
                label="Facebook:"
                required
              )
            v-flex.md6.pr-3
              v-text-field(
                @input="$emit('update:instagram', $event)"
                :value="instagram"
                label="Instagram:"
                required
              )
</template>

<script>
import panelMixin from "@/plugins/panelMixin";
export default {
  mixins: [panelMixin],
  props: {
    email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    vkontakte: {
      type: String,
      default: ""
    },
    facebook: {
      type: String,
      default: ""
    },
    instagram: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      panelName: "panel-profile-contacts-data"
    };
  }
};
</script>
