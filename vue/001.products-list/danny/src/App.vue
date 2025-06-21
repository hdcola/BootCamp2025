<template>
  <div class="container py-4">
    <header class="pb-3 mb-4 border-bottom">
      <h1 class="fs-4">Product Management App</h1>
    </header>

    <div class="row mb-4">
      <div class="col-12">
        <ProductAddForm :add-product="addProduct" />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <ProductFilter v-model:filter-text="filterText" />
        <ProductList :products="products" :filter-text="filterText" @delete-product="deleteProduct" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductAddForm from './components/ProductAddForm.vue';
import ProductFilter from './components/ProductFilter.vue';
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  components: {
    ProductAddForm,
    ProductFilter,
    ProductList
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Laptop', price: 1299.99 },
        { id: 2, name: 'Smartphone', price: 699.99 },
        { id: 3, name: 'Headphones', price: 149.99 },
        { id: 4, name: 'Tablet', price: 499.99 }
      ],
      filterText: ''
    }
  },
  methods: {
    addProduct(product) {
      this.products.push(product);
    },

    deleteProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId);
    }
  }
}
</script>

<style>
/* Global styles */
body {
  background-color: #f8f9fa;
}
</style>
