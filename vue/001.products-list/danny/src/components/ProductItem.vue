<template>
    <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">{{ product.name }}</h5>
            <div class="d-flex align-items-center">
                <span class="price-tag me-3"><strong>${{ formatPrice(product.price) }}</strong></span>
                <button @click="$emit('delete-product', product.id)" class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
});

defineEmits(['delete-product']);

const formatPrice = (price) => {
    return price.toFixed(2);
};
</script>

<style scoped>
.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.price-tag {
    font-size: 1rem;
    color: #198754;
}
</style>
