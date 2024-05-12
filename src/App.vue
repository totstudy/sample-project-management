<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <main>
    <RouterView />
  </main>
  
</template>

<style scoped>
main {
  /* border: blue 1px solid; */
  padding: 10px;
  max-height: 100%;
  /* text-align: center; */
}
.container > div {
  padding: 2rem;
}

#breadcrumbs ul li {
  display: inline;
  list-style-type: none;
}

#breadcrumbs {
  margin-left: 0px;
}

#breadcrumbs ul {
  padding-left: 0px;
}

#breadcrumbs ul .current {
  color: red;
}

#breadcrumbs ul li:before {
  content: " > ";
}

#breadcrumbs ul li:first-child:before {
  content: none;
}
</style>
