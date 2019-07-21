<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Дополнительное поле: {{field.title}}
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
                      v-model="field.title"
                      label="Наименование:"
                      required
                      @input="$v.field.title.$touch()"
                      @blur="$v.field.title.$touch()"
                      :error-messages="titleErrors"
                    )
                    v-textarea(
                      v-model="field.defaultValue"
                      label="Значение по умолчанию:"
                      placeholder="Строка или JSON"
                      no-resize
                      required
                    )
                    v-textarea(
                      v-if="field.fieldType === 'array'"
                      v-model="field.schema"
                      label="Схема:"
                      placeholder="Строка или JSON"
                      no-resize
                      required
                    )
                  v-card(v-if="adminAccess")
            v-card
              v-card-actions
                v-btn.ml-2(
                  color="primary"
                  v-if="field.id !== undefined && field.id !== ''"
                  @click="update"
                ) Сохранить
                v-btn.ml-2(
                  color="error"
                  v-if="field.id !== undefined && field.id !== ''"
                  @click="isRemoveDialog = true"
                ) Удалить

      v-flex.xs12.md5.pl-2
        v-card
          v-card-text
            v-text-field(
              v-model="field.slug"
              label="Псевдоним:"
              required
              @input="$v.field.slug.$touch()"
              @blur="$v.field.slug.$touch()"
              :error-messages="slugErrors"
            )
            v-select(
              :items="[{id: '1' ,slug: 'base', title: 'Базовый шаблон'}, {id: '2', slug: 'custom', title: 'Кастомный шаблон'}]"
              item-text="title"
              item-value="id"
              label="Шаблон:"
              v-model="field.layouts"
              :error-messages="layoutErrors"
              @blur="$v.field.layouts.$touch()"
              multiple
              required
            )
            v-select(
              :items="['text', 'textarea', 'editor', 'image', 'select', 'array', 'radio', 'date', 'time', 'colorpicker', 'checkbox']"
              label="Тип поля:"
              v-model="field.fieldType"
              required
            )
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="field.title"
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
  name: "Field",
  mixins: [accessMixin, panelMixin, validationMixin],

  validations: {
    field: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) },
      layouts: { required }
    }
  },

  data() {
    return {
      panelName: "panel-field-base-data",
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    field() {
      return this.$store.getters["field/getField"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.field.slug.$dirty) return errors;
      !this.$v.field.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.field.slug.alpha &&
        errors.push("Разрешены только английские символы");
      !this.$v.field.slug.required && errors.push("Обязательное поле");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.field.title.$dirty) return errors;
      !this.$v.field.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.field.title.required && errors.push("Обязательное поле");
      return errors;
    },
    layoutErrors() {
      const errors = [];
      if (!this.$v.field.layouts.$dirty) return errors;
      !this.$v.field.layouts.required && errors.push("Обязательное поле");
      return errors;
    }
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("field/updateField", this.field);
      }
    },
    async remove() {
      await this.$store.dispatch("field/removeField", this.field.id);
    }
  },

  async mounted() {
    await this.$store.dispatch("field/fetchField");
  }
};
</script>
