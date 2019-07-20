<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Дополнительные поля
    v-layout.wrap.pt-5
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/field-create"
            dark
            v-if="adminAccess"
          ) Создать  поле
        v-data-table(
          :headers="headers"
          :items="fields"
          :rows-per-page-items="[5]"
          hide-actions
        )
          template(v-slot:items="props")
            td.text-xs-left
              router-link(:to="`/fields/${props.item.id}`") {{ props.item.title }}
            td.text-xs-left 
              div(
                v-for="layout in props.item.layouts"
                :key="layout.id"
              )
                router-link(
                  :to="`/layouts/${layout.id}`"
                ) {{layout.title}}
            td.text-xs-left {{props.item.fieldType}}
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
            @input="getFields"
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
        :name="removeField.title"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "Fields",
  mixins: [accessMixin],

  data() {
    return {
      headers: [
        {
          text: "Наименование",
          value: "title"
        },
        { text: "Шаблон", sortable: false },
        { text: "Тип", value: "fieldType", sortable: true },
        { text: "", sortable: false }
      ],
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 5,
      skip: 5,
      isRemoveDialog: false,
      removeField: {}
    };
  },

  computed: {
    pages() {
      if (this.fields.length === 0) return 0;
      return Math.ceil(this.fields.length / this.limit);
    },
    fields() {
      return this.$store.getters["field/getFields"];
    }
  },

  methods: {
    getFields(page) {
      this.$router.push(
        `/fields?skip=${page * this.skip - this.skip}&limit=${this.limit}`
      );
    },

    remove() {
      this.$store.dispatch("field/removeField", this.removeField.id);
    },

    removeDialogOpen(field) {
      this.removeField = field;
      this.isRemoveDialog = true;
    }
  },

  async mounted() {
    await this.$store.dispatch("field/fetchFields", {
      id: this.$route.params.id,
      skip: this.$route.query.skip,
      limit: this.$route.query.limit
    });
  }
};
</script>
