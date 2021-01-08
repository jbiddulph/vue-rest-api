<template>
    <div>
        Filter venues
        <select>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
        </select>
    </div>    
</template>

<script>
export default {
    name: "VenuesFilter"
}
</script>

<style scoped>
    select {
        margin-top: 20px;
        padding:6px;
        border: #339966 1px solid;
    }
</style>