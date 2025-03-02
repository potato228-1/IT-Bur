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
      <AuctionList :list="auctionList" />
      <router-link to="/auction" class="btn btn-success">Посмотреть аукцион</router-link>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import axios from "axios";
import store from '@/store';
import AuctionList from "@/components/auction/AuctionList.vue";

export default {
  components: {
    AuctionList,
  },
  setup() {
    const state = reactive({
      isAuthenticated: store.getters.getLogged,
      auctionList: [],
    });

    const getProjects = async () => {
      const res = await axios.get("https://webcomp.bsu.ru/api/2025/allBids");
      const data = await res.data.data;

      state.auctionList = data
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5);
    };

    getProjects();

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
