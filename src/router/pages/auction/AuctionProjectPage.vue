<template>
	<div class="wrapper">
		<div class="container d-flex flex-column gap-5">
			<h1>{{ item.title }}</h1>

			<div class="row">
				<div class="col-3">
					<img :src="getLink(item.image)" class="card-img-top" />
					<strong>Теги: </strong>
					<span
						class="badge bg-info"
						v-for="(item2, index) in item.tags.split(',')"
						:key="index"
						>{{ item2 }}</span
					>
					<p>
						<strong>Оценка:</strong>
						{{ item.mark != -100 ? item.mark : "Б/О" }}
					</p>
				</div>
				<div class="col-8">
					<h2>Описание проекта</h2>
					<p>{{ item.description }}</p>

					<h2>Актуальность проекта</h2>
					<p>{{ item.relevance }}</p>
				</div>
			</div>
		</div>

		<div class="bids-container container">
			<div class="bid-form__container">
				<form class="bid-form mb-3" @submit.prevent="addBid">
					<h5>Сделать ставку :</h5>

					<input
						type="number"
						v-model="bidFormData.amount"
						class="form-control"
					/>

					<button
						type="submit"
						:disabled="!bidFormData.amount"
						class="btn btn-primary"
					>
						Отправить
					</button>
				</form>
			</div>

			<div class="bids__wrapper">
				<h4 class="text-center">
					{{ bidsList.length ? "Все ставки" : "Ставок пока нет" }}
				</h4>

				<table class="table table-bordered" v-if="bidsList.length">
					<thead>
						<tr>
							<th>#</th>
							<th>Ставка</th>
							<th>Кто поставил</th>
							<th>Дата ставки</th>
						</tr>
					</thead>

					<tbody>
						<tr
							v-for="(bid, index) in projectBids"
							:key="bid.id"
							:class="`
                                ${index + 1 == 1 ? 'first-place' : ''}
                                ${index + 1 == 2 ? 'second-place' : ''}
                                ${index + 1 == 3 ? 'third-place' : ''}
                                ${
									bid.author.user_id == userData.user_id
										? 'user-bid'
										: ''
								}
                            `"
						>
							<td>
								{{ index + 1 }}
							</td>

							<td>{{ bid.amount }} ₽</td>

							<td>{{ bid.author.user_name }}</td>

							<td>
								{{ new Date(bid.updated_at).toLocaleString() }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.first-place {
		--bs-table-bg: gold !important;
	}
	.second-place {
		--bs-table-bg: silver !important;
	}
	.third-place {
		--bs-table-bg: #cd7f32 !important;
	}

	.user-bid {
        border: 3px solid #4169e1 !important;
	}
</style>

<script>
	import axios from "axios";

	export default {
		name: "AuctionProjectPage",

		components: {},

		created() {
			const record_id = this.$route.params.id;
			if (record_id) {
				this.id = record_id;
				this.getProject(record_id);
			}
		},

		data() {
			return {
				id: null,
				item: {
					tags: ",",
					img: "project_1.jpg",
				},

				bidsList: [],
				bidFormData: {
					amount: null,
					project_id: this.id,
				},
			};
		},

		methods: {
			getLink(img) {
				return `/img/${img}`;
			},
			getProject(record_id) {
				let self = this;
				axios
					.get(`https://webcomp.bsu.ru/api/project/${record_id}`)
					.then(function (response) {
						// обработка успешного запроса
						let data = response["data"]["data"];
						self.item = data;
					})
					.catch(function (error) {
						// обработка ошибки
						console.log(error);
					});
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

			async addBid() {
				try {
					const amountConflict = this.projectBids.find(
						(bid) => bid.amount == this.bidFormData.amount
					);
					if (this.userData.wallet >= this.bidFormData.amount) {
						if (!amountConflict) {
							const request = await axios.put(
								"https://webcomp.bsu.ru/api/2025/bids/add",
								{
									amount: this.bidFormData.amount,
									project_id: this.id,
								},
								{
									headers: {
										Authorization: `Bearer ${this.$store.getters.getToken}`,
									},
								}
							);
							this.bidFormData.amount = null;
							this.getBids(this.id);
						} else {
							alert(
								"Уже существует ставка с точно такой же суммой"
							);
						}
					} else {
						alert("Недостаточно средств");
					}
				} catch (error) {
					console.error("Error sending bid : ", error);
				}
			},
		},

		computed: {
			projectBids() {
				const result = [...this.bidsList].sort(
					(a, b) => a.amount < b.amount
				);
				return result;
			},

			userBids() {
				const userBids = this.$store.getters.getUserBids;
				return userBids;
			},

			userData() {
				return this.$store.getters.getUser;
			},
		},

		mounted() {
			if (this.id) {
				this.getBids(this.id);
			}
		},
	};
</script>
