<template lang="pug">
  v-flex
    .body-2.mb-5 Пользователь: {{profile.slug}}
    v-layout.wrap.pt-5
      v-flex.xs12.md7.pr-2
        main-data(
          :lastname.sync="user.lastname"
          :firstname.sync="user.firstname"
          :patronymic.sync="user.patronymic"
        )

        v-expansion-panel(v-model="panel" expand)
          v-expansion-panel-content
            template.px-2(v-slot:header)
              div Контакты
            v-card
              v-card-text
                v-layout.wrap
                  v-flex.md6.pr-3
                    v-text-field(
                      v-model="user.email"
                      label="E-mail:"
                      :error-messages="emailErrors"
                      required
                      @input="$v.user.email.$touch()"
                      @blur="$v.user.email.$touch()"
                    )
                  v-flex.md6
                    v-text-field(
                      v-model="user.phone"
                      mask="+7 (###) ###-##-##"
                      :value="user.phone"
                      label="Телефон:"
                      required
                    )
                  v-flex.md6.pr-3
                    v-text-field(
                      v-model="user.vkontakte"
                      :value="user.vkontakte"
                      label="Vkontakte:"
                      required
                    )
                  v-flex.md6
                    v-text-field(
                      v-model="user.facebook"
                      :value="user.facebook"
                      label="Facebook:"
                      required
                    )
                  v-flex.md6.pr-3
                    v-text-field(
                      v-model="user.instagram"
                      :value="user.instagram"
                      label="Instagram:"
                      required
                    )

        v-expansion-panel(expand v-if="adminAccess || managerAccess")
          v-expansion-panel-content
            template(v-slot:header)
              div Ключи
            v-card
              v-card-text
                v-flex.md12
                  div Api key: sdfew45frs4e3qwvfdrt5e4rt354tvfds

        password-change

        v-card
          v-card-actions
            v-btn.ml-2(color="primary" @click="save") Сохранить
            v-btn(color="error" @click="isRemoveDialog = true") Удалить
        
      avatar-data(
        :lastname="user.lastname"
        :firstname="user.firstname"
        :avatar="user.avatar"
      )
      
    v-dialog(
      v-model="isChangesConfirmDialog"
      max-width="500px"
    )
      changes-confirm(
        @cancel="cancel"
        @close="isChangesConfirmDialog = false"
        :isChanged="isChanged"
      )
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="`${user.lastname} ${user.firstname}`"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";
import panelMixin from "@/mixins/panelMixin";
// Components
import MainData from "@/components/Profile/MainData";
import AvatarData from "@/components/Profile/AvatarData";
import PasswordChange from "@/components/Profile/PasswordChange";
// Libs
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "User",
  mixins: [validationMixin, accessMixin, panelMixin],
  validations: {
    user: {
      email: { required, email }
    }
  },
  data() {
    return {
      isChanged: false,
      isChangesConfirmDialog: false,
      confirmKey: "",
      routeLinkTo: "",
      panelName: "panel-profile-contacts-data",
      isRemoveDialog: false
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push("E-mail не валиден");
      !this.$v.user.email.required && errors.push("Обязательное поле");
      return errors;
    }
  },
  methods: {
    /**
     * @function save
     * @var {Object} user
     * Сохраняет профиль вызывая {@link store/profileOwner/saveProfile}
     */
    save() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$store.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно сохранено.`,
          isNotification: true
        });
      }
    },

    async remove() {
      await this.$store.dispatch("user/removeUser");
    },

    /**
     * @function cancel
     * Функция сбрасывает изменения профиля пользователя.
     * При переходе на другую страницу так же открывается
     * модальное окно с подтверждением.
     */
    async cancel() {
      await this.$store.dispatch("profileOwner/setProfile");
      this.isChangesConfirmDialog = false;
      this.isChanged = false;
      if (this.routeLinkTo !== "") {
        this.$router.push(this.routeLinkTo);
      }
    }
  },

  components: {
    MainData,
    AvatarData,
    PasswordChange
  },

  async mounted() {
    await this.$store.dispatch("user/fetchUser", this.$route.params.id);
  },

  /**
   * @function
   * Перед сменой роутинга проверяется наличие изменений {@link profile}
   * если изменения есть то активировать компонент {@link ChangesConfirm}
   */
  beforeRouteLeave(to, from, next) {
    if (this.isChanged) {
      this.isChangesConfirmDialog = true;
      this.routeLinkTo = to;
      return;
    }
    next();
  }
};
</script>
