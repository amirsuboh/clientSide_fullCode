<script setup>
import User from '@/components/User.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const users = ref([]);
const text = ref('');
const router = useRouter();

const props = defineProps({
    userId: String
})

async function searchUsers(){
    users.value = [];
    let url = "https://hap-app-api.azurewebsites.net/users";
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    url += `?search=userName:${text.value}`;

    let response = await fetch(url, options);
    if (response.status === 200){
        let data = await response.json();
        users.value = data;
    }

    else if(response.status === 401){
        err.innerHTML = 'Search Unauthorized';
        setTimeout(() => {
            err.innerHTML = '';
        }, 2000);
    }
}

</script>

<template>
    <div class="vertical">
        <div class="option center" @click="router.back">
            <img src="../../../public/Back_Arrow.svg" class="icon">
            <span>Back</span>
        </div><br>
        <h1>Inbox</h1>
        <div class="center">
            <input @keyup.enter="searchUsers" v-model="text" class="text-input" placeholder="Search Users">
            <img class="icon" src="../../../public/Search.svg" @click="searchUsers">
        </div>
        <span id="err"></span>
        <div class="vertical scroll">
            <User v-for="user of users"
            :firstName="user.firstName"
            :lastName="user.lastName"
            :userName="user.userName"
            :userId="user._id">
            </User>
        </div>
    </div>
</template>

<style scoped>

.icon{
    cursor: pointer;
    margin-left: 15px;
}

.icon:hover{
    scale: 1.1;
}

@media (min-width: 0em) {
    .scroll{
        height: 150px;
    } 
}
    
@media (min-width: 45em) {
    .scroll{
        height: 400px;
    } 
}

.icon{
    margin-right: 10px;
}
</style>