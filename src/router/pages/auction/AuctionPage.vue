<template>
	<div class="list__wrapper">
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
					"https://webcomp.bsu.ru/api/allProjects"
				);
				const data = await res.data.data;
				this.auctionList = data;
			},
		},

		mounted() {
			this.getProjects();
		},
	};
</script>

<style>
.list__wrapper{
    padding: 30px 0;
}
</style>