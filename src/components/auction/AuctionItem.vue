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
				>
					{{ item }} </span
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "ProjectItem",

		props: {
			item: {},
		},

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
				projectId: this.item.id,
				imgSrc: this.item.image,
				rating: this.item.mark,
				title: this.item.title,
				content: this.item.content,
				tags: this.item.tags,
				markLoaded: 0,
			};
		},

        mounted(){
            console.log(item)
        }
	};
</script>
