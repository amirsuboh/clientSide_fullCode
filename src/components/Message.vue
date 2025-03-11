<script setup>

const props = defineProps({
    senderName: String,
    updatedAt: String,
    text: String
});

</script>

<template>
    <div class="card vertical space-after">
        <div class="spread">
            <span class="large"> {{ senderName }} </span>
            <span class="date"> {{ updatedAt }} </span>
        </div><br>
        <p> {{ text }} </p>
    </div>
</template>

<style scoped>

.date{
    font-size: small;
    color: var(--clr-purple);
}

</style>