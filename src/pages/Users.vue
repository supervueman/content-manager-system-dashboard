<template lang="pug">
  v-layout(v-if="adminAccess")
    v-flex
      .body-2.mb-5 Пользователи
        v-layout.wrap.pt-5
          v-flex
            v-toolbar(flat color="white")
              v-spacer
              v-btn(
                color="primary"
                dark
                v-if="adminAccess"
                to="/profile-create"
              ) Создать пользователя
            v-data-table(
              :headers="headers"
              :items="users"
              :rows-per-page-items="[5]"
              hide-actions
            )
              template(v-slot:items="props")
                td.text-xs-left
                  router-link(:to="`/users/${props.item.id}`")
                    v-avatar(
                      :size="40"
                      color="grey lighten-4"
                    )
                      img(:src="`${imgFolderBasePath}/${props.item.image}`" alt="avatar")
                td.text-xs-left
                  router-link(:to="`/users/${props.item.id}`") {{ props.item.lastname }} {{ props.item.firstname }}
                td.text-xs-left
                  div
                    a(:href="`mailto:${props.item.email}`") {{props.item.email}}
                  div
                    a(:href="`tel:${props.item.phone}`") {{props.item.phone}}
                td.text-xs-left {{props.item.role}}
                td.text-xs-right
                  v-btn(
                    flat
                    fab
                    color="primary"
                    @click="removeDialogOpen(props.item)"
                    v-if="adminAccess"
                  )
                    v-icon delete
            div.text-xs-center.pt-2
              v-pagination(
                v-model="pagination.page"
                :length="pages"
                @input="getUsers"
                :value="0"
                :total-visible="2"
              )
        v-dialog(
          v-model="isRemoveDialog"
          max-width="500px"
        )
          remove-confirm(
            @remove="remove"
            :isActive.sync="isRemoveDialog"
            :name="`${removeUser.lastname} ${removeUser.firstname}`"
          )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Config
import { imgFolderBasePath } from "@/config";

export default {
  name: "Users",
  mixins: [accessMixin],

  data() {
    return {
      headers: [
        {
          text: "",
          sortable: false
        },
        { text: "Имя", sortable: true, value: "lastname" },
        { text: "Контакты", sortable: false },
        { text: "Роль", sortable: true, value: "role" },
        { text: "", sortable: false }
      ],
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 5,
      skip: 5,
      isRemoveDialog: false,
      isUserCreateDialog: false,
      removeUser: {},
      imgFolderBasePath
    };
  },

  computed: {
    pages() {
      if (this.users.length === 0) return 0;
      return Math.ceil(this.users.length / this.limit);
    },
    users() {
      return this.$store.getters["user/getUsers"];
    }
  },

  methods: {
    getUsers(page) {
      this.$router.push(
        `/users?skip=${page * this.skip - this.skip}&limit=${this.limit}`
      );
    },

    async remove() {
      await this.$store.dispatch("user/removeUser", this.removeUser.id);
    },

    removeDialogOpen(user) {
      this.removeUser = user;
      this.isRemoveDialog = true;
    }
  },

  async mounted() {
    await this.$store.dispatch("user/fetchUsers", {
      id: this.$route.params.id,
      skip: this.$route.query.skip,
      limit: this.$route.query.limit
    });
  }
};
</script>
