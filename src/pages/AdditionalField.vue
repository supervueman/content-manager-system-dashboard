<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Дополнительное поле: {{additionalField.title}}
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
                      v-model="additionalField.title"
                      label="Наименование:"
                      required
                      @input="$v.additionalField.title.$touch()"
                      @blur="$v.additionalField.title.$touch()"
                      :error-messages="titleErrors"
                    )
                    v-textarea(
                      v-model="additionalField.defaultValue"
                      label="Значение по умолчанию:"
                      placeholder="Строка или JSON"
                      no-resize
                      required
                    )
                    v-textarea(
                      v-model="additionalField.schema"
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
                  v-if="additionalField.id === '' || additionalField.id === undefined"
                  @click="create"
                ) Создать
                v-btn.ml-2(
                  color="primary"
                  v-if="additionalField.id !== undefined && additionalField.id !== ''"
                  @click="update"
                ) Сохранить
                v-btn.ml-2(
                  color="error"
                  v-if="additionalField.id !== undefined && additionalField.id !== ''"
                  @click="isRemoveDialog = true"
                ) Удалить

      v-flex.xs12.md5.pl-2
        v-card
          v-card-text
            v-text-field(
              v-model="additionalField.slug"
              label="Псевдоним:"
              required
              @input="$v.additionalField.slug.$touch()"
              @blur="$v.additionalField.slug.$touch()"
              :error-messages="slugErrors"
            )
            v-select(
              :items="[{id: '1' ,slug: 'base', title: 'Базовый шаблон'}, {id: '2', slug: 'custom', title: 'Кастомный шаблон'}]"
              item-text="title"
              item-value="id"
              label="Шаблон:"
              v-model="additionalField.layoutId"
              :error-messages="layoutErrors"
              @blur="$v.additionalField.layoutId.$touch()"
              required
            )
            v-select(
              :items="['text', 'textarea', 'editor', 'image', 'select', 'radio', 'date', 'time', 'colorpicker', 'checkbox']"
              label="Тип поля:"
              v-model="additionalField.fieldType"
              required
            )
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="additionalField.title"
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
  name: "AdditionalField",
  mixins: [accessMixin, panelMixin, validationMixin],

  validations: {
    additionalField: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) },
      layoutId: { required }
    }
  },

  data() {
    return {
      panelName: "panel-additional-field-base-data",
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    additionalField() {
      return this.$store.getters["additionalField/getAdditionalField"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.additionalField.slug.$dirty) return errors;
      !this.$v.additionalField.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.additionalField.slug.alpha &&
        errors.push("Разрешены только английские символы");
      !this.$v.additionalField.slug.required &&
        errors.push("Обязательное поле");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.additionalField.title.$dirty) return errors;
      !this.$v.additionalField.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.additionalField.title.required &&
        errors.push("Обязательное поле");
      return errors;
    },
    layoutErrors() {
      const errors = [];
      if (!this.$v.additionalField.layoutId.$dirty) return errors;
      !this.$v.additionalField.layoutId.required &&
        errors.push("Обязательное поле");
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch(
          "additionalField/createAdditionalField",
          this.additionalField
        );
      }
    },
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch(
          "additionalField/updateAdditionalField",
          this.additionalField
        );
      }
    },
    async remove() {
      await this.$store.dispatch(
        "additionalField/removeAdditionalField",
        this.additionalField.id
      );
    }
  },

  async mounted() {
    await this.$store.dispatch("additionalField/fetchAdditionalField");
  }
};
</script>
