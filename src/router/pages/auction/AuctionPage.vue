<template>
    <div>
        <AuctionList
            :list="auctionList"
        />
    </div>
</template>

<script>
import axios from "axios"
import AuctionList from "@/components/auction/AuctionList.vue";

export default {
    components: {
        AuctionList,
    },
    data(){
        return{
            auctionList: []
        }
    },

    methods: {
        async getProjects(){
            const res = await axios.get("https://webcomp.bsu.ru/api/2025/allBids")
            const data = await res.data.data
            this.auctionList = data
        }
    },

    mounted(){
        this.getProjects()
    },
}
</script>

<style lang="scss" scoped>

</style>