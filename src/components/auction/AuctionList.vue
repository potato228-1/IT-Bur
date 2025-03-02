<template>
	<section>
		<div class="container">
			<div>
				<div class="row row-cols-1 row-cols-md-2 g-4">
					<AuctionItem
						v-for="(item, index) in list"
						:key="index"
						:item="item.project"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import AuctionItem from "./AuctionItem.vue";

	export default {
		name: "ProjectList",

		components: {
			AuctionItem,
		},

		props: {
			list: {},
		},
	};
</script>
