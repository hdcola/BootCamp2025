<template>
    <div>
        <ProductItem v-for="aaa in products3" :key="aaa.id" :name="aaa.name" :price="aaa.price" @delete="$emit('delete2',aaa.name)">
        </ProductItem>
    </div>
</template>

<script setup>
import ProductItem from './ProductItem.vue'


const props = defineProps({
  products3:{
        type: Object,
        required: true
    },


    
})

const emit = defineEmits(['delete2'])





</script>