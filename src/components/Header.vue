<script setup>
    import Logo from './Logo.vue';
</script>

<template>
    <div class="header spread fixed">
        <Logo />
        <slot></slot>
    </div>
</template>

<style scoped>
    .header{
        height: 50px;
        padding: 10px 5%;
        width: 90vw;
        background: linear-gradient(var(--clr-dark), transparent);
        backdrop-filter: blur(5px);
    }
</style>