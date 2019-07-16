<template lang="pug">
  v-flex
    .body-2.mb-5 Ресурс: {{$route.params.id}} 
    v-layout.wrap.pt-5
      v-flex.xs12.md7.pr-2
</template>

<script>
export default {
  name: "Resource"
};
</script>
