<template lang="pug">
  v-layout(v-if="adminAccess")
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
                    v-model="slug"
                    label="Псевдоним:"
                    required
                    @input="$v.slug.$touch()"
                    @blur="$v.slug.$touch()"
                    :error-messages="slugErrors"
                  )
                  v-text-field(
                    v-model="email"
                    label="E-mail:"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    :error-messages="emailErrors"
                  )
                  v-layout.wrap
                    v-flex.md6.pr-3
                      v-text-field(
                        v-model="password"
                        label="Введите пароль:"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                        @click:append="showPassword = !showPassword"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                      )
                    v-flex.md6.pr-3
                      v-text-field(
                        v-model="confirmPassword"
                        label="Повторите пароль:"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        :append-icon="showConfirmPassword ? 'visibility' : 'visibility_off'"
                        @click:append="showConfirmPassword = !showConfirmPassword"
                        :error-messages="confirmPasswordErrors"
                        @input="$v.confirmPassword.$touch()"
                        @blur="$v.confirmPassword.$touch()"
                      )
      v-card(v-if="adminAccess")
        v-card-actions
          v-btn.ml-2(
            color="primary"
            @click="create"
          ) Создать
          v-btn.ml-2(@click="$emit('close')") Отмена
    v-flex.md5.pl-2
      v-card
        v-card-text
          v-select(
            :items="['admin', 'manager']"
            item-text="title"
            label="Роль:"
            v-model="role"
            required
          )
          v-select(
            :items="[9999, 1]"
            item-text="title"
            label="Ранг:"
            v-model="rang"
            required
          )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import panelMixin from "@/mixins/panelMixin";
import { validationMixin } from "vuelidate";

// Libs
import {
  required,
  minLength,
  helpers,
  sameAs,
  email
} from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "UserCreateComponent",
  mixins: [accessMixin, panelMixin, validationMixin],

  validations: {
    slug: { required, alpha, minLength: minLength(3) },
    email: { required, email },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("password")
    }
  },

  data() {
    return {
      panelName: "panel-user-create-base-data",
      menu: false,
      isRemoveDialog: false,
      slug: "",
      email: "",
      password: "",
      role: "manager",
      rang: 1,
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false
    };
  },

  computed: {
    slugErrors() {
      const errors = [];
      if (!this.$v.slug.$dirty) return errors;
      !this.$v.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.slug.alpha && errors.push("Разрешены только английские символы");
      !this.$v.slug.required && errors.push("Обязательное поле");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail не валиден");
      !this.$v.email.required && errors.push("Обязательное поле");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Обязательное поле");
      !this.$v.password.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required && errors.push("Обязательное поле");
      !this.$v.confirmPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Пароли не совпадают!");
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("user/createUser", this.user);
      }
    }
  }
};
</script>
