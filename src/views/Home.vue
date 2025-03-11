<script setup>
import Header from '../components/Header.vue';
</script>
 
<template>
    <Header>
        <nav>
            <RouterLink to="/signin" class="header-link">SIGN IN</RouterLink>
            <RouterLink to="/join" class="header-link">JOIN</RouterLink>
        </nav>
    </Header>
    
    <main>
        <div class="card center">
            Please sign in or create an account to view content
        </div>
    </main>
</template>
 
<style scoped>
</style>