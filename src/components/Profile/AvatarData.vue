<template lang="pug">
  v-flex.xs12.md5.pl-2
    v-card.pt-3.lawyer-avatar
      v-card-text.py-0.justify-center.d-flex
        v-layout.justify-center
          v-avatar(size="150" color="#fff" class="avatar")
            img(:src="`${imgFolderBasePath}/${avatar}`")
            div.avatar-mask
              v-icon(color="#fff") add_circle_outline
      v-card-title.text-md-center.justify-center.mt-4.pb-0 Аватар
      v-card-title.title.font-weight-bold.text-md-center.justify-center {{lastname}} {{firstname}}
</template>

<script>
import { imgFolderBasePath } from "@/config";
export default {
  name: "AvatarData",
  props: {
    lastname: {
      type: String,
      default: ""
    },
    firstname: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgFolderBasePath
    };
  }
};
</script>

<style lang="sass">
.avatar
  margin: auto
  overflow: hidden
  .avatar-mask
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    background-color: rgba(#062745, 0.9)
    transition: transform 0.5s
    transform: translateY(100%)
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
  &:hover
    .avatar-mask
      transform: translateY(0)
.lawyer-avatar
  margin-bottom: 100px
</style>
