<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    firstName: String,
    lastName: String,
    userName: String,
    userId: String
});


</script>

<template>
    <div class="card spread space-after">
        <div class="vertical">
            <span class="large">{{ firstName }} {{ lastName }}</span>
            <span class="small">@{{ userName }}</span>
        </div>
        <RouterLink class="button" :to="`/main/inbox/${userId}/chat`">Chat</RouterLink>
    </div>
</template>