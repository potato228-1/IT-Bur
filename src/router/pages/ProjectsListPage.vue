<template>
	<ProjectList :projectItems="projectItems" :isPage="true" showAll="true" />
</template>

<script>
    import axios from "axios"
	import ProjectList from "@/components/projectsList/ProjectList.vue";

	export default {
		name: "ProjectsListPage",

		components: {
			ProjectList,
		},

		data() {
			return {
				projectItems: [],
			};
		},

		methods: {
			async loadProjects() {
				try {
					const response = await axios.get(
						"https://webcomp.bsu.ru/api/allProjects"
					);
					const data = await response.data.data;
					this.projectItems = data;
				} catch (error) {
					console.error("Error fetching projects : ", error);
				}
			},
		},

		mounted() {
			this.loadProjects();
		},
	};
</script>
