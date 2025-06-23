<script setup lang="ts">
import ProductList from "./components/ProductList.vue";
import ProductFilter from "./components/ProductFilter.vue";
import ProductAddForm from "./components/ProductAddForm.vue";
import { ref } from "vue";

const products = [
  { id: 1, name: "氢弹", price: 1000 },
  { id: 2, name: "中子弹", price: 2000 },
  { id: 3, name: "战术核弹", price: 3000 },
  { id: 4, name: "战略核弹", price: 5000 },
  { id: 5, name: "微型原子弹", price: 800 },
  { id: 6, name: "手提原子弹", price: 1200 },
  { id: 7, name: "深水原子弹", price: 2500 },
  { id: 8, name: "空投原子弹", price: 3500 },
  { id: 9, name: "定向能原子弹", price: 6000 },
  { id: 10, name: "实验型原子弹", price: 400 },
];

const filteredProducts = ref([...products]);
const notFound = ref(false);

const onFilter = ({ keywords, price: inputPrice }: { keywords: string; price: number | null }) => {
  notFound.value = false;

  const searchKeyword = keywords.trim();
  const price = inputPrice;

  if ((searchKeyword === "" && price === null) || (searchKeyword === "" && price === "")) {
    filteredProducts.value = [...products];
    return;
  }

  const tempResult = products.filter((product) => {
    const nameMatch =
      searchKeyword === "" || product.name.toLowerCase().includes(searchKeyword.toLowerCase());

    const priceMatch = price === null || product.price == price;

    return nameMatch && priceMatch;
  });

  if (tempResult.length === 0) {
    notFound.value = true;
    filteredProducts.value = [];
  } else {
    filteredProducts.value = tempResult;
  }

  console.log("Filter:", searchKeyword, price, "Found:", tempResult.length);
};

const addProduct = (product: { name: string; price: number }) => {
  if (!product.name || product.price < 0) {
    alert("Invalid product data. Please check the name and price.");
    return;
  }

  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  products.push({ id: newId, ...product });
  filteredProducts.value = [...products];
};

const deleteProduct = (productId: number) => {
  const index = products.findIndex((p) => p.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    filteredProducts.value = [...products];
  }
};
</script>

<template>
  <div>
    <div class="top-0">
      <div class="text-xl font-bold text-center p-5">Product Management App</div>
      <div class="px-12 flex gap-6 w-1/2 mx-auto">
        <ProductAddForm @add-product="addProduct" />
        <ProductFilter :items="products" @filter="onFilter" />
      </div>
    </div>

    <div class="mx-12 mb-6">
      <ProductList
        :products="filteredProducts"
        :notFound="notFound"
        @deleteProduct="deleteProduct"
      />
    </div>
  </div>
</template>

<style scoped></style>
