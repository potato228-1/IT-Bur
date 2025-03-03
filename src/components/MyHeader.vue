<template>
	<div :data-bs-theme="theme">
		<header class="p-3 text-bg-dark">
			<div class="container">
				<div
					class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
				>
					<router-link
						to="/"
						class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
					>
						<img
							src="/img/BSU_logo.svg"
							alt=""
							width="36"
							height="36"
						/>
					</router-link>
					<ul
						class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
					>
						<li v-for="(item, index) in menuItems" :key="index">
							<router-link
								:to="{ path: item.link }"
								class="nav-link px-2 text-white"
								>{{ item.title }}</router-link
							>
						</li>
						<li
							v-if="is_logged"
							v-for="(item, index) in privateLinks"
							:key="index"
						>
							<router-link
								:to="{ path: item.link }"
								class="nav-link px-2 text-white"
								>{{ item.title }}</router-link
							>
						</li>
					</ul>
					<div class="text-end">
						<button
							type="button"
							class="btn me-2"
							:class="is_logged ? 'btn-danger' : 'btn-primary'"
							@click="loginButtonHandler()"
						>
							{{ is_logged ? "Выйти" : "Войти" }}
						</button>
						<button @click="toggleTheme" class="btn btn-primary">
							<i
								:class="
									theme === 'light'
										? 'fas fa-sun'
										: 'fas fa-moon'
								"
							></i>
						</button>
					</div>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
	export default {
		name: "MyHeader",
		data() {
			return {
				theme: "light",
				menuItems: [
					{ link: "/", title: "Главная" },
					{ link: "/about", title: "О нас" },
					{ link: "/projectsList", title: "Список проектов" },
					{ link: "/contacts", title: "Контакты" },
					{ link: "/Auction/Promo", title: "Аукцион" },
				],
				privateLinks: [
					{ link: "/admin", title: "Личный кабинет" },
					{ link: "/admin/adminMarks", title: "Оценки" },
				],
			};
		},
		computed: {
			is_logged() {
				return this.$store.getters.getLogged;
			},
		},
		methods: {
			loginButtonHandler() {
				if (this.is_logged) {
					this.$store.dispatch("logout").then(() => {
						this.$router.push({ path: "/" });
					});
				} else {
					this.$router.push("/login");
				}
			},
			toggleTheme() {
				this.theme = this.theme === "light" ? "dark" : "light";
				document.documentElement.setAttribute(
					"data-bs-theme",
					this.theme
				);
			},
		},
	};
</script>

<style scoped>
	header {
		border-bottom: 2px solid #4169e1;
	}
</style>
