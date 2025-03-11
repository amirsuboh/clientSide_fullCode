<script setup>
import { ref } from 'vue';

const uName = ref(localStorage.userName);

</script>

<template>
    <div class="flex vertical">
        <h1>Feed</h1>
        <div class="center vertical">
            <span class="title">Welcome, {{ uName }}!</span>
            <RouterLink class="button center" to="/main/profile">Check Profile</RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>