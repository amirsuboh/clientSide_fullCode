<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="vertical left">
        <h1>Library</h1>
        <div class="grid">
            <RouterLink class="option vertical space-after inline-block" to="/main">Feed</RouterLink>
            <RouterLink class="option vertical space-after inline-block" to="/main/post-message">New Post</RouterLink>
            <RouterLink class="option vertical space-after inline-block" to="/main/inbox">Inbox</RouterLink>
        </div>
    </div>
</template>

<style scoped>

.grid{
    display: grid;
    flex-wrap: nowrap;
}

@media (min-width: 0em) {
    .grid{
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
    }
    .space-after{
        margin-bottom: none;
        margin-right: 10px;
    }
}
@media (min-width: 45em) {
    .grid{
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
}

</style>