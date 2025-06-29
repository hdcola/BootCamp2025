<template>
    <div class="product-add-form card mb-4">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Add New Product</h5>
        </div>
        <div class="card-body">
            <form @submit.prevent="submitForm" class="row g-3">
                <div class="col-md-5">
                    <label for="productName" class="form-label">Product Name</label>
                    <input type="text" class="form-control" id="productName" v-model="productName"
                        :class="{ 'is-invalid': errors.name }" placeholder="Enter product name">
                    <div v-if="errors.name" class="invalid-feedback">
                        {{ errors.name }}
                    </div>
                </div>

                <div class="col-md-3">
                    <label for="productPrice" class="form-label">Price</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="productPrice" step="0.01" min="0"
                            v-model="productPrice" :class="{ 'is-invalid': errors.price }" placeholder="0.00">
                        <div v-if="errors.price" class="invalid-feedback">
                            {{ errors.price }}
                        </div>
                    </div>
                </div>

                <div class="col-md-4 d-flex align-items-end">
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1" role="status"></span>
                        <i class="bi bi-plus-circle me-1"></i> Add Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
    addProduct: {
        type: Function,
        required: true
    }
});

const productName = ref('');
const productPrice = ref('');
const errors = reactive({
    name: '',
    price: ''
});
const isSubmitting = ref(false);

const validateForm = () => {
    let isValid = true;
    errors.name = '';
    errors.price = '';

    // Validate product name
    if (!productName.value.trim()) {
        errors.name = 'Product name is required';
        isValid = false;
    }

    // Validate price
    if (!productPrice.value) {
        errors.price = 'Price is required';
        isValid = false;
    } else if (isNaN(parseFloat(productPrice.value)) || parseFloat(productPrice.value) < 0) {
        errors.price = 'Price must be a valid positive number';
        isValid = false;
    }

    return isValid;
};

const submitForm = () => {
    if (validateForm()) {
        isSubmitting.value = true;

        // Create a new product object with a unique ID
        const newProduct = {
            id: Date.now(), // Simple way to generate a unique ID
            name: productName.value.trim(),
            price: parseFloat(productPrice.value)
        };

        // Call the addProduct prop function with the new product
        props.addProduct(newProduct);

        // Reset form
        productName.value = '';
        productPrice.value = '';
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.product-add-form {
    width: 100%;
}
</style>
