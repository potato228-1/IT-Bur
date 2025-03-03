<template>
	<section>
		<div class="container">
			<div class="row row-cols-md-1 g-4">
				<AuctionItem
					v-for="(item, index) in list"
					:key="index"
					:item="item"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import AuctionItem from "./AuctionItem.vue";

	export default {
		name: "AuctionList",

		components: {
			AuctionItem,
		},

		props: {
			list: {},
		},
	};
</script>
