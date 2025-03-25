<script setup>
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const {firstName, lastName, userName, email, token} = storeToRefs(userStore);
const password = ref('');

let empty;

async function createAccount(e){
    e.preventDefault();

    let inputs = document.getElementsByTagName("input");
    inputs = Array.from(inputs);
    empty = [];
    let full = true;
    
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            e.target.style.border = 'none'; 
        });
        
        if (!input.value){
            full = false;
            empty.push(input);
        }
    });
    
    if (full){

        let valid = true;
        let testInput;
        
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!pattern.test(email.value)){
            valid = false;
            err.innerHTML = "Enter a valid email address";
            testInput = document.querySelector("input[type='email']");
            testInput.style.border = '2px dashed var(--clr-green)';
        }

        if (valid && password.value.length < 8){
            valid = false;
            err.innerHTML = "Password must be at least 8 characters long";
            testInput = document.querySelector("input[type='password']");
            testInput.style.border = '2px dashed var(--clr-green)';
        }   

        if (valid){
            const data = { 
                email: email.value,
                userName: userName.value,
                password: password.value,
                firstName: firstName.value,
                lastName: lastName.value
            };

            console.log(data);

            const url = "https://hap-app-api.azurewebsites.net/user";

            const options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }

            let response = await fetch(url, options);

            if (response.status === 201){

                const data = await response.json();
                token.value = data.token;
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.user.userName);
        
                router.push({
                    name: 'main'
                })
            }
            else if (response.status === 400){
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
    <Header>
        <nav>
            <RouterLink to="/" class="header-link">HOME</RouterLink>
            <RouterLink to="/signIn" class="header-link">SIGN IN</RouterLink>
        </nav>
    </Header>

    <main>
        <h1>Join us!</h1>
        <p>Enter the required information below to create a new account</p><br>
        <div class="card">
            <form class="vertical">
                <div class="spread">
                    <div id="first" class="vertical">
                        <label>First Name</label>
                        <input class="text-input" v-model="firstName">
                    </div>
                    <div id="last" class="vertical">
                        <label>Last Name</label>
                        <input class="text-input" v-model="lastName">
                    </div>
                </div>
                <label for="e_Mail">Email</label>
                <input type="email" class="text-input" v-model="email">
                <label for="u_Name">Username</label>
                <input class="text-input" v-model="userName">
                <label for="p_Word">Password</label>
                <div class="spread center">
                    <input id="passInput" type="password" class="text-input" v-model="password">
                    <div class="button" @click="reveal">Show</div>
                </div>
                <span class="error" id="err"></span>
                <br><button @click="createAccount">Create</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
    #first, #last{
        width: 45%;
        display: inline-flex;
    }
</style>