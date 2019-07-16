<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Шаблон: {{$route.params.id}}
    v-layout.wrap.pt-5
      v-flex.xs12.md7.pr-2
        v-expansion-panel(v-model="panel" expand)
          v-expansion-panel-content
            template.px-2(v-slot:header)
              div Общие данные
            v-card.mb-3
              v-card-text
                v-layout.wrap
                  v-flex.md12
                    v-tooltip(top)
                      template(v-slot:activator="{ on }")
                        v-text-field(
                          v-model="layout.title"
                          label="Наименование:"
                          v-on="on"
                          required
                          @input="$v.layout.title.$touch()"
                          @blur="$v.layout.title.$touch()"
                          :error-messages="titleErrors"
                        )
                      span title
                    v-tooltip(top)
                      template(v-slot:activator="{ on }")
                        v-text-field(
                          v-model="layout.slug"
                          label="Псевдоним:"
                          v-on="on"
                          required
                          @input="$v.layout.slug.$touch()"
                          @blur="$v.layout.slug.$touch()"
                          :error-messages="slugErrors"
                        )
                      span slug
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "Layout",
  mixins: [accessMixin],

  computed: {
    layout() {
      return this.$store.getters["layout/getLayout"];
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/fetchLayout");
  }
};
</script>
