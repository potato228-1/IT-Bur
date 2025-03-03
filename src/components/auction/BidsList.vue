<template>
	<div class="bids-section">
		<div class="bids__wrapper">
			

			<table
				class="table table-bordered container-fluid"
                v-if="bidsList.length"
			>
				<thead>
					<tr>
						<th>#</th>
						<th>Ставка</th>
						<th>Кто поставил</th>
						<th>Дата ставки</th>
						<th>Проект</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="(bid, index) in bidsList"
						:key="bid.id"
					>
						<td>{{ index + 1 }}</td>
						<td>{{ bid.amount }} ₽</td>
						<td>{{ bid.author.user_name }}</td>
						<td>{{ formatDate(bid.updated_at) }}</td>
						<td>{{ bid.project.title }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped>
	.bids-section {
		padding: 0 10px;
		width: 100%; 
		display: flex;
		flex-direction: column;
	}
</style>

<script>
	import axios from "axios";

	export default {
		name: "AllBidsList",

		data() {
			return {
				bidsList: [],
			};
		},

		methods: {
			async getAllBids(retries = 3, delay = 1000) {
				for (let attempt = 1; attempt <= retries; attempt++) {
					try {
						const response = await axios.get(
							`https://webcomp.bsu.ru/api/2025/allBids`
						);
						const data = response?.data?.data;

						
						if (Array.isArray(data)) {
							this.bidsList = data
								.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
								.slice(0, 5);
						} else {
							console.error("Полученные данные не являются массивом:", data);
						}

						return;
					} catch (error) {
						if (attempt < retries) {
							await new Promise((resolve) =>
								setTimeout(resolve, delay * attempt)
							);
						} else {
							console.error("Error fetching all bids: ", error);
						}
					}
				}
			},

			formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
           
        };
        return new Date(dateString).toLocaleString('ru-RU', options);
    },	
		},

		mounted() {
			this.getAllBids(); 
		},
	};
</script>
