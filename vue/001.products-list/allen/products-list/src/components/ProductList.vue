<script setup lang="ts">
import ProductItem from "./ProductItem.vue";
const props = defineProps({
  products: {
    type: Array as () => { name: string; price: number }[],
    required: true,
  },
  notFound: {
    type: Boolean,
    default: false,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["editProduct", "deleteProduct"]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-xl font-bold text-center my-6">Product List</div>
  </div>
  <div class="flex flex-col gap-2 border p-6 rounded-lg">
    <div v-if="notFound" class="text-red-500 text-center">
      No products found matching the criteria.
    </div>
    <ProductItem
      v-for="(product, index) in props.products"
      :key="index"
      :product="product"
      class="flex justify-between items-center p-2 border-b last:border-b-0"
      @editProduct="$emit('editProduct', $event)"
      @deleteProduct="$emit('deleteProduct', $event)"
    />
  </div>
</template>
