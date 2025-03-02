<template>
	<div class="col">
		<div class="card h-100">
			<div class="project-img">
				<img
					:src="getImgPath(imgSrc)"
					class="card-img-top"
					alt="Project"
				/>
				<div :class="['card-rating', getRating(rating)]">
					<span class="fs-2 text-white">{{
						rating != -100 ? rating : "Б/О"
					}}</span>
				</div>
			</div>
			<div class="card-body">
				<h5 class="card-title">{{ title }}</h5>
				<p class="card-text">{{ content }}</p>
			</div>
			<div class="my-3 px-3">
				<span
					class="badge bg-info"
					v-for="(item, index) in getTags(tags)"
					:key="index"
					>{{ item }}</span
				>&nbsp;&nbsp;
			</div>
			<div class="my-3 px-3">
				<div class="row">
					<div class="col-5">
						<router-link
							:to="{
								name: 'projectPage',
								params: { id: projectId },
							}"
							class="text-decoration-none text-success"
							>Подробнее</router-link
						>
					</div>
					<div class="col-7" v-if="is_logged">
						<div class="row">
							<div class="col-9">
								<strong
									v-if="markLoaded == 1"
									class="text-success"
									>Оценка загружена</strong
								>
								<strong
									v-else-if="markLoaded == 2"
									class="text-danger"
									>Ошибка загрузки</strong
								>
							</div>
							<div class="col-3">
								<select
									@change="markChanged($event)"
									:data-project="projectId"
									class="text-right"
								>
									<option value="-3">-3</option>
									<option value="-2">-2</option>
									<option value="-1">-1</option>
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	export default {
		name: "ProjectItem",
		props: ["projectData"],
		methods: {
			getRating(rating) {
				if (rating == -100) {
					return "bg-info";
				} else if (rating <= 0) {
					return "rating-bg-bad";
				} else if (rating <= 1.5) {
					return "rating-bg-good";
				} else {
					return "rating-bg-perfect";
				}
			},
			getImgPath(img) {
				return "/img/" + img;
			},
			getTags(tags) {
				return tags.split(",");
			},
			markChanged(event) {
				let mark = event.target.value;
				let project = event.target.getAttribute("data-project");
				if (mark >= -3 && mark <= 3 && project > 0) {
					let env = this;
					axios
						.put(
							"https://webcomp.bsu.ru/api/setMark",
							{
								project_id: project,
								mark: mark,
							},
							{
								headers: {
									Accept: "application/json",
									"content-type": "application/json",
									Authorization: "Bearer " + this.my_token,
								},
							}
						)
						.then(function (response) {
							// обработка успешного запроса
							let data = response["data"];
							env.markLoaded = Number(data["status"]);
							console.log(env.markLoaded);
						})
						.catch(function (error) {
							// обработка ошибки
							console.log(error);
						});
				}
			},
		},
		computed: {
			is_logged() {
				return this.$store.getters.getLogged;
			},
			my_token() {
				return this.$store.getters.getToken;
			},
		},
		data() {
			return {
				projectId: this.projectData.id,
				imgSrc: this.projectData.image,
				rating: this.projectData.mark,
				title: this.projectData.title,
				content: this.projectData.content,
				tags: this.projectData.tags,
				markLoaded: 0,
			};
		},
	};
</script>
