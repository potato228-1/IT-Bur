<template>
    <div class="container d-flex flex-column gap-5">
        <h1>{{ item.title }}</h1>
        <div class="row">
            <div class="col-3">
                <img :src=getLink(item.image) class="card-img-top">        
                <p><strong>Необходимое финансирование: </strong>{{ item.price }}  </p>
                <strong>Теги: </strong>                                      
                <span class="badge bg-info" v-for="(item2,index) in item.tags.split(',')" :key="index">{{ item2 }}</span> 
                <p><strong>Оценка:</strong> {{ item.mark!=-100?item.mark:'Б/О' }}</p>
            </div>
            <div class="col-8">
                <h2>Описание проекта</h2>
                <p>{{ item.description }}</p>
                <h2>Актуальность проекта</h2>
                <p>{{ item.relevance }}</p>
            </div>
        </div>                
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'ProjectPage',
    components: {        
    },
    data(){
        return{
            id:0,
            item:{tags:",",img:'project_1.jpg'}
        }
    },
    created(){
        const record_id=this.$route.params.id
        if (record_id){
            this.id=record_id
            this.getProject(record_id)            
        }
    },
    methods:{
        getLink(img){
            return `img\\${img}`
        },
        getProject(record_id){
            let self=this
            axios.get(`https://webcomp.bsu.ru/api/project/${record_id}`)
            .then(function (response) {
                // обработка успешного запроса
                let data=response["data"]["data"];                
                self.item=data       
            })
            .catch(function (error) {
                // обработка ошибки
                console.log(error);
            })
            .finally(function () {
                // выполняется всегда
            });                        
        }
    }
}
</script>