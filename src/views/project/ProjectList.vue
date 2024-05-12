<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { RouterLink } from 'vue-router';
import type {Project} from '@/interfaces';
import { useProjectsStore } from '@/stores/projects';

const projectsStore = useProjectsStore();
const projectList = ref<Map<number, Project>>(new Map());

onMounted(async ()=>{
    try {
        const success = await projectsStore.prepareProjectList();
        if (success) {
          projectList.value = projectsStore.projectList;
        }
      } catch (error) {
        console.error('Error fetching project list:', error);
      } finally {
        // isLoading.value = false;
      }
})

const isLoading = computed((): boolean=>{
    return projectsStore.isLoading
})

</script>


<template>
    <section class="header-project">
        <h1>案件管理</h1>
        <div class="header-project-guidance">
            <button>
                <RouterLink :to="{name: 'AppTop'}">TOP</RouterLink>
            </button>
            <span>
                新規案件登録は<RouterLink :to="{name: 'ProjectAdd'}">こちら</RouterLink>
            </span>
        </div>
        <p v-if="isLoading">データ取得中・・・</p>
    </section>
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名前</th>
                    <th>description</th>
                    <th>skills</th>
                    <th>customer</th>
                    <th>assignees</th>
                    <th>status</th>
                    <th>リンク</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="[id, project] in projectList" :key="id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td>{{ project.description }}</td>
                    <td>{{ project.skills }}</td>
                    <td>{{ project.customer }}</td>
                    <td>{{ project.assignees }}</td>
                    <td>{{ project.status }}</td>
                    <td>
                    <RouterLink :to="{name: 'ProjectDetail', params:{id: id}}">
                        ステータス変更はこちらから
                    </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>
<style scoped>
.header-project {
    text-align: center;
}
.header-project-guidance {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 20px;
}
button {
    margin-right: 5px;
}
table {
    border-collapse: collapse;
    margin: 0 auto;
}
table thead th {
    border: 1px solid black;
}
table tbody td {
    border: 1px solid black;
}
</style>