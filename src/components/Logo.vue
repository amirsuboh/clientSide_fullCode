<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome(){
    let dest = (localStorage.userName) ? "main" : "home";
    
    router.push({
        name: dest
    });
}

function expandLogo(){
    const title = document.getElementsByClassName('logoTitle');
    title[0].style.opacity = '100';
}

function contractLogo(){
    const title = document.getElementsByClassName('logoTitle');
    title[0].style.opacity = '0';
}
</script>

<template>
    <div class="logoWrap" @mouseover="expandLogo" @mouseout="contractLogo" @click="goHome">
        <img src="../../public/Logo.svg" class="logoIcon left">
        <div class="logoTitle vertical center">
            <img src="../../public/Logo_Title.svg">
        </div>
    </div>
</template>

<style scoped>
    img{
        height: 100%;
        display: inline-block;
        /* max-width: 100px; */
        cursor: pointer;
    }

    .logoWrap{
        display: flex;
        align-items: center;
    }

    .logoIcon{
        height: 80%;
    }

    .logoTitle{
        height: 15px;
        opacity: 0;
        transition: all .3s;
        overflow: hidden;
    }
</style>