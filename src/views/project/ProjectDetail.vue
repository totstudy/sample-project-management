<script setup lang="ts">
import {computed} from 'vue';
import { RouterLink,useRouter } from 'vue-router';
import type {Project} from '@/interfaces';
import { useProjectsStore } from '@/stores/projects';

interface Props {
    id: number;
}

const router = useRouter();

const props = defineProps<Props>();

const projectsStore = useProjectsStore();

const project = computed(
    (): Project => {
        return projectsStore.getById(props.id);
    }
);

const onUpdate = (): void => {
    console.log("project.value.id:",project.value.id)
    console.log("project.value.status:",project.value.status)
    const promise = projectsStore.updateProject(project.value.id ,project.value.status);
    promise.then(
        (result: boolean) => {
            if(result){
                router.push({name: "ProjectList"});
            }
        }
    )
    promise.catch(
        (error)=>{
            console.log("データ登録失敗", error)
        }
    )
}


</script>
<template>
    <section class="header-project">
        <h1>案件管理</h1>
        <div class="header-project-guidance">
            <button>
                <RouterLink :to="{name: 'AppTop'}">
                            TOP
                </RouterLink>
            </button>
            <span>案件リスト</span>
        </div>
    </section>
    <section class="detail-project">
        <h2>案件詳細情報</h2>
        <form v-on:submit.prevent="onUpdate">
            <dl>
                <dt>ID</dt>
                <dd>{{ project.id }}</dd>
                <dt>名前</dt>
                <dd>{{ project.name }}</dd>
                <dt>description</dt>
                <dd>{{ project.description }}</dd>
                <dt>skills</dt>
                <dd>{{ project.skills }}</dd>
                <dt>customer</dt>
                <dd>{{ project.customer }}</dd>
                <dt>assignees</dt>
                <dd>{{ project.assignees }}</dd>
                <dt>status</dt>
                <dd><input type="text" v-model="project.status"></dd>
            </dl>
            <button type="submit">更新</button>
        </form>
    </section>
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
.detail-project {
    text-align: center;
}
</style>