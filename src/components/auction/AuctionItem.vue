<template>
	<div class="item-wrapper">
		<div class="col">
			<div class="card h-100">
				<div class="project-img">
					<img
						:src="getImgPath(imgSrc)"
						class="card-img-top"
						alt="Project"
					/>
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
						{{ item }}
                    </span>
                    &nbsp;&nbsp;
				</div>
				<div class="my-3 px-3">
					<div class="row">
						<div class="col-5">
							<router-link
								to="#"
								class="text-decoration-none text-success"
							>
								Ставки
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bids-section">
			<h4 class="text-center">Топ ставок</h4>
            
			<table class="table table-sm table-bordered first-place">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ставка</th>
                        <th>Кто поставил</th>
                    </tr>
                </thead>

			    <tbody>
			        <tr v-for="(bid, index) in topBids" :key="bid.id" :class="index + 1 == 1 ? 'first-place' : null">
                            <td>{{ index + 1 }}</td>
    
                            <td>{{ bid.amount }} ₽</td>
    
                            <td>{{ bid.author.user_name }}</td>
    
                        <!-- <div class="bid__date">
                            {{ new Date(bid.updated_at).toLocaleString() }}
                        </div> -->
        			</tr>
			    </tbody>
			</table>
		</div>
	</div>
</template>

<style>
	.item-wrapper {
		display: flex;
	}

	.bids-section {
		padding: 0 10px;
	}

    .first-place{
        background-color: gold !important;
    }
</style>

<script>
	import axios from "axios";

	export default {
		name: "ProjectItem",

		props: {
			item: {},
		},

		methods: {
			getImgPath(img) {
				return "/img/" + img;
			},

			getTags(tags) {
				return tags.split(",");
			},

			// async getBids(id) {
			// 	try {
			// 		const response = await axios.get(
			// 			`https://webcomp.bsu.ru/api/2025/project_bids/${id}`
			// 		);
			// 		const data = response?.data?.data;
			//         this.bidsList = data
			//         console.log(this.bidsList)
			// 	} catch (error) {
			// 		console.error("Error fetch project bids : ", error);
			// 	}
			// },

			async getBids(id, retries = 3, delay = 1000) {
				for (let attempt = 1; attempt <= retries; attempt++) {
					try {
						const response = await axios.get(
							`https://webcomp.bsu.ru/api/2025/project_bids/${id}`
						);
						const data = response?.data?.data;
						this.bidsList = data;
						return;
					} catch (error) {
						if (attempt < retries) {
							await new Promise((resolve) =>
								setTimeout(resolve, delay * attempt)
							);
						} else {
							console.error("Error fetch project bids : ", error);
						}
					}
				}
				console.log(this.bidsList);
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

				bidsList: [],
			};
		},

		computed: {
			is_logged() {
				return this.$store.getters.getLogged;
			},

			my_token() {
				return this.$store.getters.getToken;
			},

			topBids() {
				const result = [...this.bidsList]
					.sort((a, b) => a.amount < b.amount)
					.slice(0, 3);
				console.log(result);
				return result;
			},
		},

		mounted() {
			if (this.projectId) {
				this.getBids(this.projectId);
			}
		},
	};
</script>