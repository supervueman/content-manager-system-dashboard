<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Шаблон: {{layout.title}}
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
                    v-text-field(
                      v-model="layout.slug"
                      label="Псевдоним:"
                      required
                      @input="$v.layout.slug.$touch()"
                      @blur="$v.layout.slug.$touch()"
                      :error-messages="slugErrors"
                    )
                    v-text-field(
                      v-model="layout.title"
                      label="Наименование:"
                      required
                      @input="$v.layout.title.$touch()"
                      @blur="$v.layout.title.$touch()"
                      :error-messages="titleErrors"
                    )
        v-card(v-if="adminAccess")
          v-card-actions
            v-btn.ml-2(
              color="primary"
              v-if="layout.id !== undefined && layout.id !== ''"
              @click="update"
            ) Сохранить
            v-btn.ml-2(
              color="error"
              v-if="layout.id !== undefined && layout.id !== ''"
              @click="isRemoveDialog = true"
            ) Удалить
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="layout.title"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import panelMixin from "@/mixins/panelMixin";
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "Layout",
  mixins: [accessMixin, panelMixin, validationMixin],

  validations: {
    layout: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      panelName: "panel-layout-base-data",
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    layout() {
      return this.$store.getters["layout/getLayout"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.layout.slug.$dirty) return errors;
      !this.$v.layout.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.layout.slug.alpha &&
        errors.push("Разрешены только английские символы");
      !this.$v.layout.slug.required && errors.push("Обязательное поле");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.layout.title.$dirty) return errors;
      !this.$v.layout.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.layout.title.required && errors.push("Обязательное поле");
      return errors;
    }
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("layout/updateLayout", this.layout);
      }
    },
    async remove() {
      await this.$store.dispatch("layout/removeLayout", this.layout.id);
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/fetchLayout");
  }
};
</script>
