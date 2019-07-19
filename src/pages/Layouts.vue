<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Шаблоны
    v-layout.wrap.pt-5
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/layout-create"
            dark
            v-if="adminAccess"
          ) Создать шаблон
        v-data-table(
          :headers="headers"
          :items="layouts"
          :rows-per-page-items="[5]"
          hide-actions
        )
          template(v-slot:items="props")
            td.text-xs-left
              router-link(:to="`/layouts/${props.item.id}`") {{ props.item.title }}
            td.text-xs-left {{ props.item.createdAt }}
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
            @input="getLayouts"
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
        :name="removeLayout.title"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "Layouts",
  mixins: [accessMixin],

  data() {
    return {
      headers: [
        {
          text: "Наименование",
          value: "title"
        },
        { text: "Дата создания", value: "createdAt" },
        { text: "", sortable: false }
      ],
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 5,
      skip: 5,
      isRemoveDialog: false,
      removeLayout: {}
    };
  },

  computed: {
    pages() {
      if (this.layouts.length === 0) return 0;
      return Math.ceil(this.layouts.length / this.limit);
    },
    layouts() {
      return this.$store.getters["layout/getLayouts"];
    }
  },

  methods: {
    getLayouts(page) {
      this.$router.push(
        `/layouts?skip=${page * this.skip - this.skip}&limit=${this.limit}`
      );
    },

    remove() {
      this.$store.dispatch("layout/removeLayout", this.removeLayout.id);
    },

    removeDialogOpen(layout) {
      this.removeLayout = layout;
      this.isRemoveDialog = true;
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/fetchLayouts", {
      id: this.$route.params.id,
      skip: this.$route.query.skip,
      limit: this.$route.query.limit
    });
  }
};
</script>
