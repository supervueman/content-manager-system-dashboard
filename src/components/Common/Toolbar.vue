<template lang="pug">
  v-toolbar.primary(app dark)
    //- v-toolbar-side-icon.hidden-sm-and-up(@click.stop="drawer = !drawer")
    v-toolbar-title
      //- img(:src="`${imgFolderBasePath}/logo.svg`" class="toolbar-logo")
    v-spacer
    v-toolbar-items.hidden-xs-and-down
      v-btn(flat to="/login" v-if="!(adminAccess || managerAccess)") Войти
    v-toolbar-items.hidden-xs-and-down
      v-menu(offset-y v-if="adminAccess || managerAccess")
        v-btn(flat slot="activator")
          div.body-1.mr-3 {{ profile.firstname }} {{profile.lastname}}
          v-avatar.mr-3(ize="40" color="grey lighten-4")
            img(:src="`${imgFolderBasePath}/${profile.avatar}`")
          v-icon(small) arrow_drop_down
        v-list
          v-list-tile(to="/profile")
            v-list-tile-title Профиль
          v-list-tile(@click="logout")
            v-list-tile-title Выход
</template>

<script>
import { imgFolderBasePath } from "@/config";
import accessMixin from "@/mixins/accessMixin";
export default {
  name: "Toolbar",
  mixins: [accessMixin],
  props: {
    profileId: {
      type: String,
      default: ""
    },
    profileFirstname: {
      type: String,
      default: ""
    },
    profileLastname: {
      type: String,
      default: ""
    },
    profileAvatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgFolderBasePath
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("authenticate/logout");
      this.$router.push("/");
    }
  }
};
</script>
