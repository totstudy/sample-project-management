<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>
<template>
    <h1>TOP</h1>
    <section>
        <button class="project-link">
            <RouterLink :to="{name: 'LoginForm'}">
            案件管理はこちら
            </RouterLink>
        </button>
    </section>
</template>


<style scoped>
.project-link a {
    font-size: 20px;
    color: rgb(10, 11, 11);
}
</style>