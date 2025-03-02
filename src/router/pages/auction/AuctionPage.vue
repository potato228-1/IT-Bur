<template>
	<div>
		<AuctionList :list="auctionList" />
	</div>
</template>

<script>
	import axios from "axios";
	import AuctionList from "@/components/auction/AuctionList.vue";

	export default {
		components: {
			AuctionList,
		},

		data() {
			return {
				auctionList: [],
			};
		},

		methods: {
			async getProjects() {
				const res = await axios.get(
					"https://webcomp.bsu.ru/api/2025/allBids"
				);
				const data = await res.data.data;
				this.auctionList = data;
			},

			// async api_test() {
			// 	const res = await axios.get(
			// 		"https://webcomp.bsu.ru/api/2025/userBids",
			// 		{
			// 			headers: {
			// 				Authorization: `Bearer ${this.$store.getters.getToken}`,
			// 			},
			// 		}
			// 	);
			// 	const data = res.data.data;
			// 	console.log(data);
			// },

			async api_test() {
				const res = await axios.get(
					"https://webcomp.bsu.ru/api/2025/userBids",
					{
						headers: {
							Authorization: `Bearer ${this.$store.getters.getToken}`,
						},
					}
				);
				const data = res.data.data;
				console.log(data);
			},
		},

		mounted() {
			console.log(this.$store.getters.getToken);
			this.getProjects();
			this.api_test();
		},
	};
</script>
