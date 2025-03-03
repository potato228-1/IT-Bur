<template>
	<router-link :to="`auction/project/${this.projectId}`">
		<div class="item-wrapper">
			<div class="col container-fluid">
				<div class="card">
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
				</div>
			</div>

			<div class="bids-section">
				<div class="bids__wrapper">
					<h4 class="text-center">
                        {{ bidsList.length ? "Топ ставок" : "Ставок пока нет" }}
                    </h4>

					<table
						class="table table-bordered container-fluid"
                        v-if="bidsList.length"
					>
						<thead>
							<tr>
								<th>#</th>
								<th>Ставка</th>
								<th>Кто поставил</th>
							</tr>
						</thead>

						<tbody>
							<tr
								v-for="(bid, index) in topBids"
								:key="bid.id"
							>
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
		</div>
	</router-link>
</template>

<style scoped>
	* {
		text-decoration: none;
	}

	.item-wrapper {
		width: 100%;

		display: flex;
		justify-content: space-between;
	}

	.bids-section {
		padding: 0 10px;
		width: 50%;

        display: flex;
        flex-direction: column;
	}
</style>

<script>
	import axios from "axios";

	export default {
		name: "AuctionItem",

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
