<template>
    <main>
        <div class="container d-flex flex-column gap-5">
            <div class="row">
                <div class="col-12">
                    <h1>Редактирование профиля</h1>
                </div>
                <div class="col-5">                    
                    <UserDataForm :userInfo="userInfo"/>
                </div>
            </div>
            
        </div>
    </main>
</template>
<script>
import axios from 'axios';
import UserDataForm from '@/components/forms/UserDataForm.vue';
export default {
    name: 'EditProfile',
    components: {    
    UserDataForm
},
    methods: {
        getUserData(){
            let env=this;            
            axios.get(
                'https://webcomp.bsu.ru/api/userData',
                {
                    headers:{
                        'Accept':'application/json',
                        'content-type':'application/json',
                        'Authorization':'Bearer '+this.my_token
                    }
                }                
            )
            .then(function (response) {
                // обработка успешного запроса
                //console.log("OK")
                env.userInfo=response["data"]["data"]
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
    mounted(){
        this.getUserData()
    },
    computed:{
        my_token(){
            return this.$store.getters.getToken
        }
    },  
    data(){
        return{
            userInfo:{}
        }
    }

}
</script>