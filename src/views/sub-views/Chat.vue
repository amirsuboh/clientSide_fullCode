<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const props = defineProps({
    userId: String
});

let userId = props.userId;
let date = new Date();
date = date.toISOString();
let oldestDate = date;
const messages = ref([]);
const text = ref('');

onMounted(() => {
    getChatMessages();
});


const route = useRoute();
const router = useRouter();

watch(route, () => {
    messages.value = [];
    let date = new Date();
    date = date.toISOString();
    getChatMessages();
})

async function getChatMessages(){
    let url = `https://hap-app-api.azurewebsites.net/messages/${userId}`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    url += `?limit=10&before=${date}`;

    let response = await fetch(url, options);

    if (response.status === 200){
        let data = await response.json();
        if (data.length > 0){
            data = data.reverse();
            data.forEach(entry => {
                if(entry.senderId === userId){
                    entry.style = {
                        'background-color': 'none'
                    }
                }
                else{
                    entry.style = {
                        'background-color': 'var(--clr-blue)',
                        'text-align': 'right'
                    }
                }
                messages.value.push(entry);
            });
            oldestDate = data[data.length - 1].updatedAt;
        }
    }
    else if(response.status === 401){

    }
}

async function sendMessage(){
    let url = `https://hap-app-api.azurewebsites.net/message/${userId}`;
    const data = {
        text: text.value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options);

    if (response.status === 201){
        text.value='';
        const data = await response.json();
        data.style = {
            'background-color': 'var(--clr-blue)',
            'text-align': 'right'
        }
        messages.value.push(data);
    }
    else if(response.status === 400){

    }
    else if(response.status === 401){

    }

}

</script>

<template>
    <div class="vertical">
        <div class="chat scroll vertical">
            <div class="chatMessage space-after" v-for="message in messages" :style="message.style">{{ message.text }}</div>
        </div>
        <div class="center spread">
            <textarea v-model="text" class="textarea" maxlength="280" placeholder="Write message (max: 280)"></textarea>
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<style scoped>

textarea{
    width: 60%;
    display: inline-block;
}
button{
    width: 30%;
    height: 70%;
}

@media (min-width: 0em) {
    .scroll{
        height: 200px;
    } 
}
    
@media (min-width: 45em) {
    .scroll{
        height: 400px;
    } 
}

.chatMessage{
    border: 2px solid var(--clr-blue);
    padding: 5px 15px;
    border-radius: 10px;;
}

</style>