<template>

      <h2>Уважаемый посетители вы можете поучаствовать в аукционе проектов.
         Для этого пройдите по ссылке ниже.
          Внимание: участие только для авторизованных пользователей.</h2>
      
      <div v-if="!isAuthenticated">
    
        <img src="/img/banner.jpg" alt="Баннер" class="banner">
      </div>
      <div v-else>
        5 ласт став`ок
    </div>
    <div v-if="!isAuthenticated">
        <router-link to="/Login">Войти</router-link>
    </div>
    <div v-else>
        <router-link to="/Auction">Посмотреть аукцион</router-link>
    </div>

  </template>

<script>
import { reactive, toRefs } from 'vue'
import store from '@/store';

export default {
    setup () {
        const state = reactive({
            count: 0,
            isAuthenticated: store.getters.getLogged
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>