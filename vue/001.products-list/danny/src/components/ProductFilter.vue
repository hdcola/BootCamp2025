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

<script>
export default {
    name: 'ProductFilter',
    props: {
        filterText: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateFilter(value) {
            this.$emit('update:filterText', value);
        }
    }
}
</script>

<style scoped>
.product-filter {
    max-width: 500px;
}
</style>
