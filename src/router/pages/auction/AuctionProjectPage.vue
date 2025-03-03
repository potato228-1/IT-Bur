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
						<tr v-for="(bid, index) in allBids" :key="bid.id">
							<td>{{ index + 1 }}</td>

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
<script>
	import axios from "axios";

	export default {
		name: "AuctionProjectPage",

		data() {
			return {
				id: null,
				item: {
					tags: ",",
					img: "project_1.jpg",
				},

				bidsList: [],
			};
		},

		created() {
			const record_id = this.$route.params.id;
			if (record_id) {
				this.id = record_id;
				this.getProject(record_id);
			}
		},

		computed: {
			allBids() {
				const result = [...this.bidsList].sort(
					(a, b) => a.amount < b.amount
				);
				return result;
			},
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
		},

		mounted() {
			if (this.id) {
				this.getBids(this.id);
			}
		},
	};
</script>
