<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import type {Project} from '@/interfaces';
import { useProjectsStore } from '@/stores/projects';
import axios from 'axios';

const router = useRouter();
const projectsStore = useProjectsStore();
const project: Project = reactive(
    {
        id: 0,
        name: '',
        description: '',
        skills: '',
        customer: '',
        assignees: '',
        status: ''
    }
);

const onAdd = (): void => {
    const promise = projectsStore.insertProject(project);
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
                <RouterLink :to="{name: 'AppTop'}">TOP</RouterLink>
            </button>
            <button>
                <RouterLink :to="{name: 'ProjectList'}">案件リスト</RouterLink>
            </button>
        </div>
    </section>
    <section class="form-project">
        <h2>案件情報追加</h2>
        <p>情報を入力し、登録ボタンをクリックしてください。</p>
        <form v-on:submit.prevent="onAdd">
            <dl>
                <dt>
                    <label for="addId">ID&nbsp;</label>
                </dt>
                <dd>
                    <input type="number" id="addId" v-model.number="project.id" required>
                </dd>
                <dt>
                    <label for="addName">名前&nbsp;</label>
                </dt>
                <dd>
                    <input type="text" id="addName" v-model.number="project.name" required>
                </dd>
                <dt>
                    <label for="addNote">description&nbsp;</label>
                </dt>
                <dd>
                    <textarea type="number" id="addNote" v-model.number="project.description"></textarea>
                </dd>
                <dt>
                    <label for="addNote">skills&nbsp;</label>
                </dt>
                <dd>
                    <textarea type="number" id="addNote" v-model.number="project.skills"></textarea>
                </dd>
                <dt>
                    <label for="addNote">customer&nbsp;</label>
                </dt>
                <dd>
                    <textarea type="number" id="addNote" v-model.number="project.customer"></textarea>
                </dd>
                <dt>
                    <label for="addNote">assignees&nbsp;</label>
                </dt>
                <dd>
                    <textarea type="number" id="addNote" v-model.number="project.assignees"></textarea>
                </dd>
                <dt>
                    <label for="addNote">status&nbsp;</label>
                </dt>
                <dd>
                    <textarea type="number" id="addNote" v-model.number="project.status"></textarea>
                </dd>
            </dl>
            <button type="submit">登録</button>
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
.form-project {
    text-align: center;
}
button {
    margin-right: 5px;
}
</style>