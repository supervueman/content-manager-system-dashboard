<template lang="pug">
  v-flex
    .body-2.mb-5 Ваш профиль: {{profile.slug}}
    v-layout.wrap.pt-5
      v-flex.xs12.md7.pr-2
        main-data(
          :lastname.sync="profile.lastname"
          :firstname.sync="profile.firstname"
          :patronymic.sync="profile.patronymic"
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
                      v-model="profile.email"
                      label="E-mail:"
                      :error-messages="emailErrors"
                      required
                      @input="$v.profile.email.$touch()"
                      @blur="$v.profile.email.$touch()"
                    )
                  v-flex.md6
                    v-text-field(
                      v-model="profile.phone"
                      mask="+7 (###) ###-##-##"
                      :value="profile.phone"
                      label="Телефон:"
                      required
                    )
                  v-flex.md6.pr-3
                    v-text-field(
                      v-model="profile.vkontakte"
                      :value="profile.vkontakte"
                      label="Vkontakte:"
                      required
                    )
                  v-flex.md6
                    v-text-field(
                      v-model="profile.facebook"
                      :value="profile.facebook"
                      label="Facebook:"
                      required
                    )
                  v-flex.md6.pr-3
                    v-text-field(
                      v-model="profile.instagram"
                      :value="profile.instagram"
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
            v-btn(color="primary" @click="openDialogConfirm") Отмена
        
      avatar-data(
        :lastname="profile.lastname"
        :firstname="profile.firstname"
        :avatar="profile.avatar"
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
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Profile",
  mixins: [validationMixin, accessMixin, panelMixin],
  validations: {
    profile: {
      email: { required, email }
    }
  },
  data() {
    return {
      isChanged: false,
      isChangesConfirmDialog: false,
      confirmKey: "",
      routeLinkTo: "",
      panelName: "panel-profile-contacts-data"
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.profile.email.$dirty) return errors;
      !this.$v.profile.email.email && errors.push("E-mail не валиден");
      !this.$v.profile.email.required && errors.push("Обязательное поле");
      return errors;
    }
  },
  methods: {
    /**
     * @function save
     * @var {Object} profile
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

    /**
     * @function openDialogConfirm
     * Если изменены свойства {@link profile} то при отмене изменений
     * открывается модальное окно для подтверждения
     */
    openDialogConfirm() {
      if (this.isChanged) {
        this.isChangesConfirmDialog = true;
      }
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
