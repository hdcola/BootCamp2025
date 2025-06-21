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

<script>
import ProductItem from './ProductItem.vue';

export default {
    name: 'ProductList',
    components: {
        ProductItem
    },
    props: {
        products: {
            type: Array,
            required: true
        },
        filterText: {
            type: String,
            default: ''
        }
    },
    computed: {
        filteredProducts() {
            if (!this.filterText) {
                return this.products;
            }

            const searchTerm = this.filterText.toLowerCase();
            return this.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
        }
    },
    emits: ['delete-product']
}
</script>

<style scoped>
.product-list {
    padding: 20px 0;
}
</style>
