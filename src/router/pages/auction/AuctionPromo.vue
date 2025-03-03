<template>
	<div class="container text-center mt-3">
		<h2 class="mb-4">
			Уважаемые посетители, вы можете поучаствовать в аукционе проектов.
			Для этого пройдите по ссылке ниже.
			<br />
			<strong
				>Внимание: участие только для авторизованных
				пользователей.</strong
			>
		</h2>

		<div v-if="!isAuthenticated">
			<img src="/img/banner.jpg" alt="Баннер" class="img-fluid mb-4" />
			<p class="lead mb-4"> 
				Пожалуйста, войдите, чтобы участвовать в аукционе.
			</p>
			<router-link to="/login" class="btn btn-primary mb-4">Войти</router-link>
		</div>

		<div v-else>
			<h2 class="mb-4">Последние ставки:</h2> 
			<BidsList class="mb-4"/> 
			<router-link to="/auction" class="btn btn-success mt-3">Посмотреть аукцион</router-link>
		</div>
	</div>
</template>


<script>
	import { reactive, toRefs } from "vue";
	import store from "@/store";
	import BidsList from "@/components/auction/BidsList.vue";

	export default {
		components: {
			BidsList,
		},
		setup() {
			const state = reactive({
				isAuthenticated: store.getters.getLogged,
				
			});
		


			return {
				...toRefs(state),
			};
		},
	};
</script>

<style lang="scss" scoped></style>
