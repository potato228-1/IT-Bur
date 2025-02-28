<template>
  <div class="container text-center mt-3">
    <h2 class="mb-4">
      Уважаемые посетители, вы можете поучаствовать в аукционе проектов.
      Для этого пройдите по ссылке ниже.
      <br />
      <strong>Внимание: участие только для авторизованных пользователей.</strong>
    </h2>

    <div v-if="!isAuthenticated">
      <img src="/img/banner.jpg" alt="Баннер" class="img-fluid mb-4" />
      <p class="lead">Пожалуйста, войдите, чтобы участвовать в аукционе.</p>
      <router-link to="/login" class="btn btn-primary">Войти</router-link>
    </div>

    <div v-else>
      <h3 class="mb-4">Ваши последние 5 ставок:</h3>
      <router-link to="/auction" class="btn btn-success">Посмотреть аукцион</router-link>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import store from '@/store';

export default {
  setup() {
    const state = reactive({
      isAuthenticated: store.getters.getLogged
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>
