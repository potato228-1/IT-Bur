<template>
    <main>
        <div class="container d-flex flex-column gap-5">
            <AdminMarksList/>
        </div>
    </main>
</template>
<script>
import AdminMarksList from '@/components/admin/AdminMarksList.vue'
export default {
    name: 'AdminMarks',
    components: {
        AdminMarksList
    },
    methods: {
        
    }
}
</script>