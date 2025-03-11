<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const message = ref();
const err = ref();
const router = useRouter();

onMounted(() => {
    const input = document.querySelector('textarea[class="textarea"]');
    input.addEventListener('input', () => {
        input.style.height = "";
        input.style.height = input.scrollHeight + 'px';
    })
});

async function postMessage(){
    const data = {
        text: message.value
    }

    const url = "https://hap-app-api.azurewebsites.net/message";

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options);

    if (response.status === 201){
        err.value = 'Message sent!';
        message.value = '';
        setTimeout(() => {
            err.value = '';
        }, 1000);
    }

    else if(response.status === 400){
        err.value = 'Make sure the field is not empty!';
    }

    else if (response.status === 401){
        err.value = 'Request not Authorized!';
    }

}

</script>

<template>
    <div class="vertical left">
        <div class="option center" @click="router.back">
            <img src="../../../public/Back_Arrow.svg" class="icon">
            <span>Back</span>
        </div><br>
        <h1>New Post</h1>
        <div>
            <div class="card vertical">
                <textarea class="textarea" maxlength="280" v-model="message" placeholder="Write a message (max 280 characters)"></textarea>
                <span class="error">{{ err }}</span>
                <button @click="postMessage">Post Message</button>
            </div>
        </div><br>
    </div>
    
</template>

<style scoped>

    .icon{
        margin-right: 10px;
    }
    
</style>