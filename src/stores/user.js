import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const firstName = ref('');
    const lastName = ref('');
    const userName = ref('');
    const email = ref('');
    const token = ref('');

    function setUser(fName, lName, uName, eMail, toKen){
        firstName.value = fName ?? '';
        lastName.value = lName ?? '';
        userName.value = uName ?? '';
        email.value = eMail ?? '';
        token.value = toKen;
    }

    function clear(){
        firstName.value = '';
        lastName.value = '';
        userName.value = '';
        email.value = '';
        token.value = '';
    }

    return { firstName, lastName, userName, email, token, setUser, clear }
})