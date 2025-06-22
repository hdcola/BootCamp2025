<script lang="ts" setup>
const props = defineProps({ product: Object });

const emit = defineEmits(["editProduct", "deleteProduct"]);
</script>

<template>
  <div class="flex justify-between">
    <div id="productName" class="text-cyan-500">
      <span>{{ props.product?.id }}-</span>{{ props.product?.name }}
    </div>
    <div id="productActionGroup" class="flex gap-2">
      <label class="pr-12 text-amber-600" id="productPrice">{{ props.product?.price }} 刀乐</label>
      <button
        id="editProduct"
        class="bg-blue-400 px-2 py-1 rounded-sm text-white hover:bg-blue-500 active:scale-95"
        @click="$emit('editProduct', props.product)"
      >
        Edit
      </button>
      <button
        id="deleteProduct"
        class="bg-violet-400 px-2 py-1 rounded-sm text-white hover:bg-violet-500 active:scale-95"
        @click="$emit('deleteProduct', props.product?.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>
