<template lang="pug">
  v-flex
    v-toolbar(flat color="white")
      v-spacer
      v-btn(color="primary" dark) Создать ресурс
    v-data-table(
      :headers="headers"
      :items="resourceChilds"
      :rows-per-page-items="[5]"
      hide-actions
    )
      template(v-slot:items="props")
        td.text-xs-left
          router-link(:to="`/resources/${props.item.id}`") {{ props.item.title }}
        td.text-xs-left {{ props.item.published }}
        td.text-xs-left {{ props.item.layout.title }}
        td.text-xs-left {{ props.item.createdAt }}
        td.text-xs-right
          v-btn(flat fab color="primary" @click="removeDialogOpen(props.item)")
            v-icon delete
    div.text-xs-center.pt-2
      v-pagination(
        v-model="pagination.page"
        :length="pages"
        @input="getResourceChilds"
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
        :name="removeResource.title"
      )
</template>

<script>
export default {
  name: "ResourceChilds",
  data() {
    return {
      headers: [
        {
          text: "Наименование",
          value: "title"
        },
        { text: "Статус", value: "published" },
        { text: "Шаблон", value: "lyout.title" },
        { text: "Дата создания", value: "createdAt" },
        { text: "", sortable: false }
      ],
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 5,
      skip: 5,
      isRemoveDialog: false,
      removeResource: {}
    };
  },

  computed: {
    pages() {
      if (this.resourceChilds.length === 0) return 0;
      return Math.ceil(this.resourceChilds.length / this.limit);
    },
    resourceChilds() {
      return this.$store.getters["resource/getResourceChilds"];
    }
  },

  methods: {
    getResourceChilds(page) {
      if (this.resourceId !== undefined && this.resourceId !== "") {
        this.$router.push(
          `/resources/${this.$route.params.id}?skip=${page * this.skip -
            this.skip}&limit=${this.limit}`
        );
      }
    },

    remove() {
      this.$store.dispatch("resource/removeResource", this.removeResource.id);
    },

    removeDialogOpen(resource) {
      this.removeResource = resource;
      this.isRemoveDialog = true;
    }
  },

  async mounted() {
    await this.$store.dispatch("resource/fetchResourceChilds", {
      id: this.$route.params.id,
      skip: this.$route.query.skip,
      limit: this.$route.query.limit
    });
  }
};
</script>
