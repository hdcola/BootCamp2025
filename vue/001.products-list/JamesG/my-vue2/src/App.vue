<template>
    <div>
        <ProductItem v-for="aaa in products2" :key="aaa.id" :name="aaa.name" :price="aaa.price" @delete="deleteProduct1">
        </ProductItem>

    </div>
</template>


<script setup>
import { ref } from 'vue';
import ProductItem from './components/ProductItem2.vue'


function deleteProduct1(name){
    console.log("delete product " + name)
}


const products2 = ref([
  { id: 1, name: 'Laptop', price: 1299.99 },
  { id: 2, name: 'Smartphone', price: 699.99 },
  { id: 3, name: 'Headphones', price: 149.99 },
  { id: 4, name: 'Tablet', price: 499.99 },
  { id: 5, name: 'sfdf', price: 3434 }
]);



</script>