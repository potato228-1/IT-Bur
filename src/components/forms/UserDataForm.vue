<template>
    <div v-if="uploaded && errors == ''" class="alert alert-success" role="alert">
        Данные успешно загружены
    </div>
    <div v-else-if="uploaded" class="alert alert-danger" role="alert">
        При загрузке обнаружены ошибки: {{ errors }}
    </div>
    <div class="card">
        <div class="card-body">
            <form>
                <label for="user_name">Ваше имя</label>
                <input id="user_name" class="form-control mt-1" placeholder="Ваше имя" required
                    :value="userInfo.user_name" />
                <label for="description">О вас</label>
                <textarea id="description" class="form-control mt-1" placeholder="О вас" :value="userInfo.description">
        </textarea>
                <label for="team_name">Название команды</label>
                <input id="team_name" class="form-control mt-1" placeholder="Название команды" required
                    :value="userInfo.team_name" />
                <label for="track">Трек</label>
                <select id="track" class="form-control mt-1">
                    <option v-for="(item, index) in tracks" :key="index" :value=item.track_id :selected=item.selectedV>{{
                        item.title }}</option>
                </select><br>
                <button class="btn btn-success" @click="editProfile()">Изменить</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'UserDataForm',
    props: {
        userInfo: {
            type: Object,
            default: function () {
                return { track_id: 1, user_name: 'no', description: 'no', team_name: 'no' }
            }
        }
    },
    methods: {
        editProfile() {
            let user_name = document.getElementById("user_name").value
            let team_name = document.getElementById("team_name").value
            let description = document.getElementById("description").value
            let track_id = document.getElementById("track").value
            let env = this
            axios.put(
                'https://webcomp.bsu.ru/api/userData/update',
                {
                    "user_name": user_name, "team_name": team_name, "description": description, "track_id": track_id
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + this.my_token
                    }
                }
            )
                .then(function (response) {
                    // обработка успешного запроса
                    let data = response["data"]
                    env.uploaded = true
                    if (data["STATUS"] != "SUCCESS") {
                        env.errors = data["errors"]
                    }
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
    computed: {
        my_token() {
            return this.$store.getters.getToken
        }
    },
    data() {
        return {
            uploaded: false,
            errors: "",
            tracks: []
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.tracks.push({ title: 'HTML - вёрстка', track_id: 1, selectedV: this.userInfo.track_id == 1 })
            this.tracks.push({ title: 'Фронтенд разработка на Vue.js', track_id: 2, selectedV: this.userInfo.track_id == 2 })
            console.log(this.tracks)
            console.log(this.userInfo)
        })
    }
}
</script>
