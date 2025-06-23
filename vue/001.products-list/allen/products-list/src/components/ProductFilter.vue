<script setup lang="ts">
import { ref } from "vue";

const keywords = ref("");
const price = ref<number | null>(null);
const emit = defineEmits(["filter"]);

const emitFilter = () => {
  emit("filter", {
    keywords: keywords.value,
    price: price.value,
  });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-xl font-bold text-center mb-6">Product Filter</div>
    <div class="flex flex-col gap-2 border p-6 rounded-lg">
      <label for="productName" class="text-gray-700">Product Name:</label>
      <input
        id="productName"
        type="text"
        class="border p-2 rounded"
        placeholder="Enter product name"
        v-model="keywords"
      />
      <label for="productPrice" class="text-gray-700">Product Price:</label>
      <input
        id="productPrice"
        type="number"
        class="border p-2 rounded"
        placeholder="Enter product price"
        v-model="price"
      />
      <button
        id="filterButton"
        class="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 active:scale-99 mt-4"
        @click="emitFilter"
      >
        Filter Products
      </button>
    </div>
  </div>
</template>
