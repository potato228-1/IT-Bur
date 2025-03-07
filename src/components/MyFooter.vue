<template>
	<footer class="footer">
		<ul class="nav d-flex justify-content-center border-bottom gap-3">
			<li
				v-for="(item, index) in menuItems"
				:key="index"
				class="nav-item"
			>
				<router-link
					:to="{ path: item.link }"
					class="nav-link px-2 text-body-secondary"
					>{{ item.title }}</router-link
				>
			</li>
		</ul>
		<p class="text-center text-body-secondary"><slot></slot></p>
	</footer>
</template>
<script>
	export default {
		name: "MyFooter",
		data() {
			return {
				menuItems: [
					{ link: "/", title: "Главная" },
					{ link: "/about", title: "О нас" },
					{ link: "/projectsList", title: "Список проектов" },
					{ link: "/contacts", title: "Контакты" },
				],
			};
		},
	};
</script>
