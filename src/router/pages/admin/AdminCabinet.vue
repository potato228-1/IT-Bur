<template>
	<main>
		<div class="container d-flex flex-column gap-5">
			<div class="row">
				<div class="col-12">
					<h1>Личный кабинет администратора</h1>
				</div>
				<div class="col-5">
					<UserInfo :userInfo="userInfo" />
				</div>
			</div>
			<div class="row">
				<div class="col-4">
					<button class="btn btn-danger" @click="logout()">
						Выйти
					</button>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
	import UserInfo from "@/components/admin/UserInfo.vue";
	import axios from "axios";

	export default {
		name: "AdminCabinet",

		components: {
			UserInfo,
		},
        
		data() {
			return {
				userInfo: {},
			};
		},

		methods: {
			logout() {
				this.$store
					.dispatch("logout")
					.then(() => this.$router.push({ path: "/" }));
			},
			getUserData() {
				let env = this;
				axios
					.get("https://webcomp.bsu.ru/api/userData", {
						headers: {
							Accept: "application/json",
							"content-type": "application/json",
							Authorization: "Bearer " + this.my_token,
						},
					})
					.then(function (response) {
						// обработка успешного запроса
						//console.log("OK")
						env.userInfo = response["data"]["data"];
					})
					.catch(function (error) {
						// обработка ошибки
						console.log(error);
					})
					.finally(function () {
						// выполняется всегда
					});
			},
		},

		mounted() {
			this.getUserData();
		},

		computed: {
			my_token() {
				return this.$store.getters.getToken;
			},
		},
	};
</script>
