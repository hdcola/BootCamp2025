<script setup>
import { ref } from 'vue';
import ProductItem from './components/ProductItem.vue'
import ProductList from './components/ProductList.vue'


function deleteProduct1(name){
    console.log("delete product " + name)
}


const products2 = ref([
  { id: 1, name: 'Laptop', price: 1299.99 },
  { id: 2, name: 'Smartphone', price: 699.99 },
  { id: 3, name: 'Headphones', price: 149.99 },
  { id: 4, name: 'Tablet', price: 499.99 }
]);



</script>

<template>

    <div class="row">
        <ProductList :products3="products2"
        @delete2="deleteProduct1">
            
        </ProductList>
      

      

      
    </div>  
</template>


