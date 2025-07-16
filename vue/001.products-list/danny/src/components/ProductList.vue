<template>
    <div class="product-list">
        <h3 class="mb-4">Product List</h3>
        <div v-if="filteredProducts.length === 0" class="alert alert-info">
            No products found.
        </div>
        <div v-else>
            <ProductItem v-for="product in filteredProducts" :key="product.id" :product="product"
                @delete-product="$emit('delete-product', $event)" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import ProductItem from './ProductItem.vue';

const props = defineProps({
    products: {
        type: Array,
        required: true
    },
    filterText: {
        type: String,
        default: ''
    }
});

defineEmits(['delete-product']);

const filteredProducts = computed(() => {
    if (!props.filterText) {
        return props.products;
    }

    const searchTerm = props.filterText.toLowerCase();
    return props.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
});
</script>

<style scoped>
.product-list {
    padding: 20px 0;
}
</style>
