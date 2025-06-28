<template>
    <div class="card mb-3 border border-black border-1">
        <h5>{{name}}</h5>
        <p>${{price }}</p>
        <button class="btn btn-danger" @click="$emit('delete', name)">Delete</button>
    </div>
</template> 

<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    
})

defineEmits(['delete'])


</script>  


<style scoped>
.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>