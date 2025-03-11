<script setup>
    import { onMounted, ref, useTemplateRef } from 'vue';
    import Message from '@/components/Message.vue';
    let date = new Date();
    date = date.toISOString();
    let oldestDate = date;

    let messages = ref([]);

    const count = ref(0);

    function formatDate(dateString){
	    return new Date(dateString).toLocaleString("en-US", { timeZone: 'America/New_York' }) + " EST"
    }

    function setObservers(){
        const observeOld = new IntersectionObserver(loadMessages, {
            root: document.getElementById('scrollable'),
            threshold: 1.0
        });

        const observeNew = new IntersectionObserver(loadCount, {
            root: document.getElementById('scrollable'),
            threshold: 1.0,
            rootMargin: '10px'
        });
        observeOld.observe(document.getElementById('loadOld'));
        observeNew.observe(document.getElementById('loadNew'));
    }

    async function loadMessages(){

        let url = 'https://hap-app-api.azurewebsites.net/messages';

        url += `?limit=4&before=${oldestDate}`;

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const response = await fetch(url, options);

        if (response.status === 200){
            let data = await response.json();
            if (data.length > 0){
                oldestDate = data[data.length - 1].updatedAt;
                for (let i = 0; i < data.length; i++){
                    messages.value.push(data[i]);
                }
            }
        }

        else if(response.status === 401){
            messages.value.push({
                text: 'Loading messages unauthorized!'
            })
        }
    }

    async function loadCount() {
        let url = 'https://hap-app-api.azurewebsites.net/messages/count';

        url += `?after=${date}`;

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const response = await fetch(url, options);

        if (response.status === 200){
            let data = await response.json();
            count.value = data.total;
        }

        else if(response.status === 401){
            count.value = 'N/A';
        }
    }

    async function loadNewest(){
        let url = 'https://hap-app-api.azurewebsites.net/messages';

        url += `?limit=${count.value}&after=${date}`;

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        if (count.value > 0){
            const response = await fetch(url, options);

            if (response.status === 200){
                let data = await response.json();
                let temp = [];
                date = data[0].updatedAt;
                for (let i = 0; i < data.length; i++){
                    temp.push(data[i]);
                    count.value--;
                }
                messages.value.forEach(message => {
                    temp.push(message);
                })
                messages.value = temp;
            }

            else if(response.status === 401){
                messages.push({
                    text: 'Loading messages unauthorized!'
                })
            }
        }
    }

    onMounted(() => {   
        loadMessages();
        setTimeout(setObservers, 1000);
    });

</script>

<template>
    <div id="scrollable" class="scroll vertical">
        <div id="loadNew" class="option" @click="loadNewest">Load new posts: {{ count }}</div><br>
        <div class="vertical">
            <Message v-for="message in messages"
            :updatedAt="formatDate(message.updatedAt)"
            :senderName="message.senderName"
            :text="message.text"></Message>
        </div>
        <span id="loadOld" class="center">Loading older posts...</span>
    </div>
</template>

<style scoped>

    @media (min-width: 0em) {
        .scroll{
            height: 200px;
        } 
    }
    
    @media (min-width: 45em) {
        .scroll{
            height: 500px;
        } 
    }

</style>