<template>
	<router-view></router-view>	
</template>

<script>


export default {
	name: 'App',
	
    created(){
        this.$store.dispatch("fetchUserBids")
        this.$store.dispatch("fetchUserData")
    },
}
</script>