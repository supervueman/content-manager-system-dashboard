<template lang="pug">
  v-flex
    .body-2.mb-5 Ваш профиль
    v-layout.wrap.pt-5
      v-flex.xs12.md7.pr-2
        main-data(
          :lastname.sync="profile.lastname"
          :firstname.sync="profile.firstname"
        )

        contacts-data(
          :email.sync="profile.email"
          :phone.sync="profile.phone"
          :vkontakte.sync="profile.vkontakte"
          :facebook.sync="profile.facebook"
          :instagram.sync="profile.instagram"
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
import accessMixin from "@/mixins/accessMixin";
export default {
  mixins: [accessMixin],
  data() {
    return {
      isChanged: false,
      isChangesConfirmDialog: false,
      confirmKey: "",
      routeLinkTo: ""
    };
  },
  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    }
  },
  watch: {
    profile() {
      this.isChanged = true;
    }
  },
  methods: {
    /**
     * @function save
     * @var {Object} profile
     * Сохраняет профиль вызывая {@link store/profileOwner/saveProfile}
     */
    save() {
      const profile = this.profile;
      this.$store.dispatch("profileOwner/saveProfile", profile);
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

  /**
   * @function
   * Перед сменой роутинга проверяется наличие изменений {@link profile}
   * если изменения есть то активировать копонент {@link ChangesConfirm}
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

<style lang="sass">
.v-expansion-panel__header
  padding: 16px
</style>
