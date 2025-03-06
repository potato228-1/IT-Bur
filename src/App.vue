<template>
	<router-view></router-view>	
</template>

<script>


export default {
	name: 'App',
	
    created(){
        if(this.$store.getters.getToken){
            this.$store.dispatch("fetchUserBids")
            this.$store.dispatch("fetchUserData")
        }
    },
}
</script>