<template>
    <div class="product-filter mb-4">
        <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search products..." :value="filterText"
                @input="updateFilter($event.target.value)">
            <button v-if="filterText" class="btn btn-outline-secondary" type="button" @click="updateFilter('')">
                Clear
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    filterText: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:filterText']);

const updateFilter = (value) => {
    emit('update:filterText', value);
};
</script>

<style scoped>
.product-filter {
    max-width: 500px;
}
</style>
