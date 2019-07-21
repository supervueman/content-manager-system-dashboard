<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.md12(v-for="(field, i) in fields" :key="i")
        v-layout.mb-4
          //- Text field
          v-flex(v-if="field.interface.fieldType === 'text'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-text-field(
              v-model="field.value"
            )

          //- Textarea field
          v-flex(v-else-if="field.interface.fieldType === 'textarea'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-textarea(
              v-model="field.value"
            )

          //- Editor field
          v-flex(v-else-if="field.interface.fieldType === 'editor'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div.mb-3(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            editor(
              v-model="field.value"
            )

          //- Image field
          v-flex(v-else-if="field.interface.fieldType === 'image'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div.mb-3(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            image-field(
              :path.sync="field.value"
              @selectFile="field.value = $event"
            )

          //- Select field
          v-flex(v-else-if="field.interface.fieldType === 'select'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-select(
              :items="field.interface.defaultValue"
              v-model="field.value"
            )

          //- Migx field
          v-flex(v-else-if="field.interface.fieldType === 'migx'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}

          //- Date field
          v-flex(v-else-if="field.interface.fieldType === 'date'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-menu(
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            )
              template(v-slot:activator="{ on }")
                v-text-field(
                  v-model="field.value"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                )
              v-date-picker(
                v-model="field.value"
                no-title
                scrollable
                color="primary"
              )

          //- Time field
          v-flex(v-else-if="field.interface.fieldType === 'time'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-menu(
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            )
              template(v-slot:activator="{ on }")
                v-text-field(
                  v-model="field.value"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                )
              v-time-picker(
                format="24hr"
                v-model="field.value"
              )

          //- Checkbox field
          v-flex(v-else-if="field.interface.fieldType === 'checkbox'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-checkbox(
              v-model="field.value"
            )
</template>

<script>
// Components
import Editor from "@/components/Editor/VueEditor";

export default {
  name: "ResourceFields",
  computed: {
    fields() {
      return this.$store.getters["resource/getFields"];
    }
  },

  methods: {
    selectFile(file) {
      console.log(file);
    }
  },

  components: {
    Editor
  }
};
</script>