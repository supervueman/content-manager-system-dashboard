<template lang="pug">
  div.quillWrapper
    slot(name="toolbar")
    div(:id="id" ref="quillContainer")
</template>

<script>
import _Quill from "quill";
import defaultToolbar from "./helpers/default-toolbar";
import merge from "lodash.merge";
import oldApi from "./helpers/old-api";
import MarkdownShortcuts from "./helpers/markdown-shortcuts";
// import ResourceTree from './ResourceTree';

const Quill = window.Quill || _Quill;

export default {
  name: "VueEditor",
  mixins: [oldApi],
  props: {
    id: {
      type: String,
      default: "quill-container"
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean
    },
    editorToolbar: Array,
    editorOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    useCustomImageHandler: {
      type: Boolean,
      default: false
    },
    useMarkdownShortcuts: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    quill: null,
    curQuill: null,
    curRange: null,
    resourceTreeDialog: false,
    file: null
  }),

  mounted() {
    this.registerCustomModules(Quill);
    this.registerPrototypes();
    this.initializeEditor();
  },

  methods: {
    initializeEditor() {
      this.setupQuillEditor();
      this.checkForCustomImageHandler();
      this.handleInitialContent();
      this.registerEditorEventListeners();
      this.$emit("ready", this.quill);
    },

    setupQuillEditor() {
      let editorConfig = {
        debug: false,
        modules: this.setModules(),
        theme: "snow",
        placeholder: this.placeholder ? this.placeholder : "",
        readOnly: this.disabled ? this.disabled : false
      };

      this.prepareEditorConfig(editorConfig);
      this.quill = new Quill(this.$refs.quillContainer, editorConfig);
    },

    setModules() {
      let modules = {
        toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
      };
      if (this.useMarkdownShortcuts) {
        Quill.register("modules/markdownShortcuts", MarkdownShortcuts, true);
        modules["markdownShortcuts"] = {};
      }
      return modules;
    },

    prepareEditorConfig(editorConfig) {
      if (
        Object.keys(this.editorOptions).length > 0 &&
        this.editorOptions.constructor === Object
      ) {
        if (
          this.editorOptions.modules &&
          typeof this.editorOptions.modules.toolbar !== "undefined"
        ) {
          // We don't want to merge default toolbar with provided toolbar.
          delete editorConfig.modules.toolbar;
        }
        merge(editorConfig, this.editorOptions);
      }
    },

    registerPrototypes() {
      Quill.prototype.getHTML = function() {
        return this.container.querySelector(".ql-editor").innerHTML;
      };
      Quill.prototype.getWordCount = function() {
        return this.container.querySelector(".ql-editor").innerText.length;
      };
    },

    registerEditorEventListeners() {
      this.quill.on("text-change", this.handleTextChange);
      this.quill.on("selection-change", this.handleSelectionChange);
      this.listenForEditorEvent("text-change");
      this.listenForEditorEvent("selection-change");
      this.listenForEditorEvent("editor-change");
    },

    listenForEditorEvent(type) {
      this.quill.on(type, (...args) => {
        this.$emit(type, ...args);
      });
    },

    handleInitialContent() {
      if (this.value) this.quill.root.innerHTML = this.value; // Set initial editor content
    },

    handleSelectionChange(range, oldRange) {
      if (!range && oldRange) this.$emit("blur", this.quill);
      else if (range && !oldRange) this.$emit("focus", this.quill);
    },

    handleTextChange() {
      let editorContent =
        this.quill.getHTML() === "<p><br></p>" ? "" : this.quill.getHTML();
      this.$emit("input", editorContent);
    },

    checkForCustomImageHandler() {
      this.useCustomImageHandler === true ? this.setupCustomImageHandler() : "";
    },

    setupCustomImageHandler() {
      let toolbar = this.quill.getModule("toolbar");
      toolbar.addHandler("image", this.customImageHandler);
    },

    customImageHandler(image, callback) {
      this.resourceTreeDialog = true;
      this.curQuill = this.quill;
      this.curRange = this.curQuill.getSelection();
      this.$store.dispatch("fetchResourceTreeDialog", true);
      this.$store.dispatch("fetchKeyForUploadFile", "editor");
    },

    emitImageInfo(file) {
      let Editor = this.curQuill;
      let range = this.curRange;
      let cursorLocation = range.index;
      this.file = file;
      this.$emit("imageAdded", this.file, Editor, cursorLocation);
    },

    closeResourceTree() {
      this.file = null;
      this.resourceTreeDialog = false;
    }
  },

  watch: {
    value(val) {
      if (val != this.quill.root.innerHTML && !this.quill.hasFocus()) {
        this.quill.root.innerHTML = val;
      }
    },
    disabled(status) {
      this.quill.enable(!status);
    }
  },

  components: {
    // ResourceTree
  },

  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  }
};
</script>

<style src="quill/dist/quill.snow.css">
</style>
<style src="./styles/vue2-editor.scss" lang='scss'>
</style>



