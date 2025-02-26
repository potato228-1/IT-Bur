<template>
    <h1>Ваши Оценки</h1>
    <div class="row">
        <table v-if="projects.length > 0" class="table table-bordered table-hover table-dark table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Название проекта</th>
                <th>Оценка</th>
            </tr>
            </thead>
            <tbody class="table-striped">
                <tr v-for="(item, index) in projects" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.project.title }}</td>
                    <td>{{ item.mark }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else><strong class="text-danger">Вы не оценивали проекты</strong></p>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'AdminMarksList',
    components: {
    },
    methods: {
        loadProjects() {
            let env = this;
            axios.get(
                'https://webcomp.bsu.ru/api/marks',
                {
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + this.my_token
                    }
                }
            )
                .then(function (response) {
                    env.projects = response["data"]
                })
                .catch(function (error) {
                    // обработка ошибки
                    console.log(error);
                })
                .finally(function () {
                    // выполняется всегда
                });
        }
    },
    data() {
        return {
            projects: []
        }
    },
    computed: {
        my_token() {
            return this.$store.getters.getToken
        }
    },
    mounted() {
        this.loadProjects()
    }
}
</script>