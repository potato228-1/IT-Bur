<template>
	<section class="bg-body-tertiary">
		<div class="py-5 container">
			<div class="py-5">
				<h2 class="text-center mx-auto">Список проектов</h2>
				<div class="row row-cols-1 row-cols-md-3 g-4">
					<ProjectItem
						v-for="(item, index) in projectsList"
						:key="index"
						:projectData="item"
					/>
				</div>

				<router-link
					v-if="!fullList"
					:to="{ name: 'projectsListPage' }"
					class="btn btn-success btn-md mt-5"
				>
					Смотреть весь список
				</router-link>

				&nbsp;&nbsp;&nbsp;
				<button
					v-if="!showWholeList"
					class="btn btn-info btn-md mt-5"
					@click="LoadByButton"
				>
					Загрузить проекты
				</button>
			</div>
		</div>
	</section>
</template>

<script>
	import ProjectItem from "./ProjectItem.vue";

	export default {
		name: "ProjectList",

		components: {
			ProjectItem,
		},

		props: {
			projectItems: {},
			showAll: {},
			isPage: {},
		},

		data() {
			return {
				showWholeList: this.showAll,
				listLimit: 3,
				fullList: this.isPage || false,
			};
		},

		methods: {
			LoadByButton() {
				this.showWholeList = true;
			},
		},

		computed: {
			projectsList() {
				if (!this.showWholeList) {
					const data = this.projectItems.slice(0, this.listLimit);
					return data;
				} else {
					return this.projectItems;
				}
			},
		},
	};
</script>
