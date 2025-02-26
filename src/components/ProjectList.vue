<template>
    <section class="bg-body-tertiary">
        <div class="py-5 container">
            <div class="py-5">
                <h2 class="text-center mx-auto">Список проектов</h2>
                <div class="row row-cols-1 row-cols-md-3 g-4">                    
                    <ProjectItem v-for="(item,index) in projectItems" :key="index" :projectData="item"/>
                </div>
                
                <router-link v-if="!fullList" :to="{name:'projectsListPage'}" class="btn btn-success btn-md mt-5">Смотреть весь список</router-link>
                &nbsp;&nbsp;&nbsp;<button v-if="showButton" class="btn btn-info btn-md mt-5" @click="LoadByButton">Загрузить проекты</button>
            </div>
        </div>
    </section>
</template>
<script>
import ProjectItem from './ProjectItem.vue';
import axios from 'axios';
export default{
    name: 'ProjectList',
    components: {  ProjectItem },
    props:['fullList'],
    data(){
        return {
            projectItems:[
               
            ],
            showButton:true
        }
    },
    methods:{
        LoadByButton(){
            this.showButton=false
            this.LoadProjects(10)
        },
        LoadProjects(n){//параметр n            
            let env=this;
            env.projectItems=[]
            axios.get('https://webcomp.bsu.ru/api/allProjects')
            .then(function (response) {
                // обработка успешного запроса
                let data=response["data"]["data"];
                //console.log(data);
                for (let i=0;i<data.length;i++){
                    env.projectItems.push(data[i])
                    if(i>=n-1){
                        break
                    }
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
    mounted(){
        if (this.fullList){
            this.LoadByButton()
        }
        else{
            this.LoadProjects(3)
        }        
    }
}
</script>