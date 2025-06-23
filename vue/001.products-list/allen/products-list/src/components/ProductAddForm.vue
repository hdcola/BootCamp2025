<script setup lang="ts">
import { ref, computed } from "vue";

const keywords = ref("");
const price = ref<number | null>(null);
const emit = defineEmits(["addProduct"]);

const addProduct = () => {
  if (!nameValid.value || !priceValid.value) {
    return;
  }
  const productName = keywords.value.trim();
  const productPrice = price.value?.toFixed(2);
  keywords.value = "";
  price.value = null;
  return emit("addProduct", {
    name: productName,
    price: parseFloat(productPrice ?? "0"),
  });
};

const editProduct = (product: { name: string; price: number }) => {
  keywords.value = product.name;
  price.value = product.price;
};

const nameValid = computed(() => /^[\s\S]{2,30}$/.test(keywords.value.trim()));
const priceValid = computed(() => typeof price.value === "number" && price.value >= 0);


</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-xl font-bold text-center mb-6">Add Product</div>
    <div class="flex flex-col gap-2 border p-6 rounded-lg">
      <label for="productName" class="text-gray-700">Product Name:</label>
      <input
        id="productName"
        type="text"
        class="border p-2 rounded"
        :class="{ 'border-red-500': !nameValid && keywords }"
        placeholder="Enter product name"
        v-model="keywords"
      />
      <span v-if="keywords && !nameValid" class="text-red-500 text-sm">
        Product name must be 2–30 characters long.
      </span>
      <label for="productPrice" class="text-gray-700">Product Price:</label>
      <input
        id="productPrice"
        type="number"
        class="border p-2 rounded"
        :class="{ 'border-red-500': !priceValid && price !== null }"
        placeholder="Enter product price"
        v-model="price"
      />
      <span v-if="price !== null && !priceValid" class="text-red-500 text-sm">
        Price must be a non-negative number.
      </span>
      <button
        id="filterButton"
        class="bg-violet-500 px-4 py-2 rounded text-white hover:bg-violet-600 active:scale-99 mt-4"
        @click="addProduct"
      >
        Add +
      </button>
    </div>
  </div>
</template>
