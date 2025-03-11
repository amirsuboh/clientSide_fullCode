<script setup>

import { useRouter } from 'vue-router';
import { ref, useTemplateRef, onMounted} from 'vue';
import Modal from '@/components/Modal.vue';

let router = useRouter();

const fName = ref();
const lName = ref();
const uName = ref();
const eMail = ref();
const url = 'https://hap-app-api.azurewebsites.net/user';

async function getData(){
    
    let options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    
    let response = await fetch(url, options);
    
    if (response.status === 200){
        const data = await response.json();
        fName.value = data.firstName;
        lName.value = data.lastName;
        uName.value = data.userName;
        eMail.value = data.email;
    }
}

onMounted(async () => {
    await getData();
});


const modal = useTemplateRef('name-modal');
let inputs;

onMounted(() => {
    inputs = document.getElementsByClassName('text-input');

    inputs = Array.from(inputs);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if(!input.classList.contains('changed')){
                input.classList.add('changed');
            }
        })
    });
})

function reset(){
    err.innerHTML = '';
    inputs.forEach(input => {
        input.classList.remove('changed');
        input.style.border = 'none';
    })
    inputs[0].value = fName.value;
    inputs[1].value = lName.value;
    inputs[2].value = eMail.value;
    inputs[3].value = uName.value;
    inputs[4].value = "";
}

function cancel(){
    reset();
    modal.value.close();
}
let empty;

async function saveChanges(){

    empty = [];
    let full = true;

    inputs.forEach(input => {
        if (!input.value){
            full = false;
            empty.push(input);
        }
    })

    if(full){
        let valid = true;
        let testInput;
        
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!pattern.test(inputs[2].value)){
            valid = false;
            err.innerHTML = "Enter a valid email address";
            testInput = document.querySelector("input[type='email']");
            testInput.style.border = '2px dashed var(--clr-green)';
        }

        if (valid && inputs[4].value.length < 8){
            valid = false;
            err.innerHTML = "Password must be at least 8 characters long";
            testInput = document.querySelector("input[type='password']");
            testInput.style.border = '2px dashed var(--clr-green)';
        }   

        if (valid){
            let data = {
                email: inputs[2].value,
                password: inputs[4].value,
                lastName: inputs[1].value,
                firstName: inputs[0].value,
                userName: inputs[3].value
            }

            let options = {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }

            let response = await fetch(url, options);

            if (response.status === 200){
                fName.value = data.firstName;
                lName.value = data.lastName;
                uName.value = data.userName;
                eMail.value = data.email;
                localStorage.setItem('userName', data.userName);
                successToggle();
                err.innerHTML = 'Success!';
                setTimeout(( )=> {
                    successToggle();
                    modal.value.close();
                    reset();
                }, 1000);
            }
            else if(response.status === 400){
                err.innerHTML = "Check the information and try again";
            }
        }
    }
    else{
        err.innerHTML = "Please fill in all blanks";

        empty.forEach(field => {
            field.style.border = '2px dashed var(--clr-green)';
        });
    }
}

function successToggle(){
    inputs.forEach(input => {
        input.classList.toggle('success');
    });
}

let revealed = false;
function reveal(e){
    e.preventDefault();
    const passInput = document.querySelector("#passInput");

    if (!revealed){
        passInput.setAttribute("type", "text");
        revealed = true;
    }
    else{
        passInput.setAttribute("type", "password");
        revealed = false;
    }
}

</script>

<template>
    <div class="vertical">
        <h1>Profile</h1>
        <div class="card vertical">
            <div class="dataRow">
                <span class="dataName">First Name</span>
                <span class="dataContent">{{ fName }}</span>
            </div>
            <div class="dataRow"> 
                <span class="dataName">Last Name</span>
                <span class="dataContent">{{ lName }}</span>
            </div>
            <div class="dataRow">
                <span class="dataName">Username</span>
                <span class="dataContent">{{ uName }}</span>
            </div>
            <div class="dataRow">
                <span class="dataName">Email</span>
                <span class="dataContent">{{ eMail }}</span>
            </div>
            <button @click="modal.open()">Change Info</button>
        </div>
        <br>
        <div class="option center" @click="router.back">
            <img src="../../../public/Back_Arrow.svg" class="icon">
            <span>Back</span>
        </div>
    </div>
    
    <Modal ref="name-modal">
        <template #header>
            <span class="title center">Change account info</span>
            <img id="close" class="icon" src="../../../public/Exit_icon.svg" @click.stop="cancel">
        </template>
        <template #main>
            <form class="vertical">
                <div class="spread">
                    <div id="first" class="vertical">
                        <label>First Name</label>
                        <input class="text-input" v-bind:value="fName">
                    </div>
                    <div id="last" class="vertical">
                        <label>Last Name</label>
                        <input class="text-input" v-bind:value="lName">
                    </div>
                </div>
                <label for="e_Mail">Email</label>
                <input type="email" class="text-input" v-bind:value="eMail">
                <label for="u_Name">Username</label>
                <input class="text-input" v-bind:value="uName"><br>
                <label for="p_Word">Confirm or update Password</label>
                <div class="spread center">
                    <input id="passInput" type="password" class="text-input">
                    <div class="button" @click="reveal">Show</div>
                </div>
                <span class="error" id="err"></span>
            </form>
            <br>
        </template>
        <template #footer>
            <div class="spacedEven">
                <button @click="reset">Reset</button>
                <button @click="saveChanges">Save All</button>
                <button @click="cancel">Cancel</button>
            </div>
        </template>
    </Modal>

</template>

<style scoped>
    .icon{
        margin-right: 10px;
    }

    .dataRow{
        height: 2rem;
        /* padding-left: 1rem; */
        margin-bottom: 15px;
        margin-left: 10px;
    }

    .dataName{
        font-weight: bold;
        margin-right: 10px;
        user-select: none;
    }

    .dataContent{
        padding-left: 10px;
        border-left: 2px solid var(--clr-blue);
    }

    #first, #last{
        max-width: 45%;
    }

    .text-input{
        background-color: var(--clr-dark);
    }

    .changed{
        background-color: var(--clr-blue);
        border: none;
    }
    
    #close{
        cursor: pointer;
        position: absolute;
        right: 30px;
        top: 30px;
        transition: scale .1s;
    }

    #close:hover{
        scale: 1.2;
    }

    .success{
        color: var(--clr-green);
    }

</style>