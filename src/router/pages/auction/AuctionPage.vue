<template>
    <div>
        <h1>
            Auction page
        </h1>
    </div>
</template>

<script>
import axios from "axios"

export default {
    methods: {
        async getProjects(){
            const res = await axios.get("https://webcomp.bsu.ru/api/2025/project_bids/3")
            const data = await res.data.data
            console.log(data)
        }
    },

    mounted(){
        this.getProjects()
    },
}
</script>

<style lang="scss" scoped>

</style>