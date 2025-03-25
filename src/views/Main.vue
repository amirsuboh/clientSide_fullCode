<script setup>
  import Header from "../components/Header.vue";
  import { RouterLink, useRouter, RouterView } from 'vue-router';
  import { ref, useTemplateRef } from "vue";
  import { useUserStore } from "@/stores/user";

  const router = useRouter();
  const userStore = useUserStore();

  async function signOut(e){

      const token = localStorage.getItem('token');
      const url = "https://hap-app-api.azurewebsites.net/user/logout";
      const options = {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
          }
      }

      let response = await fetch(url, options);

      if(response.ok){
          if (response.status === 200){
              localStorage.clear();
              userStore.clear();
          }

          router.push({
              name: "home"
          })
      }
  }    

  function dropFocus() {
    document.getElementById('dropMenu').classList.add("show");
  }
  
  function dropBlur() {
    const menu = document.getElementById('dropMenu');
    if (menu.classList.contains('show')){
      menu.classList.remove("show");
    }
  }

  async function deleteAcc(e){
    let person = prompt("Type in your username to confirm deleting account");

    if (person === userStore.userName){

      const token = localStorage.getItem('token');
      const url = 'https://hap-app-api.azurewebsites.net/user';

      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      let response = await fetch(url, options);

      if (response.status === 200){
        localStorage.clear();
        userStore.clear();

        router.push({
          name: "home"
        })
      }
    }

    else{
      alert("Canceled deleting account");
    }

  }

</script>

<template>
  <div class="grid">
    <Header>
        <nav class="center">
            <RouterLink to="/main" class="header-link">HOME</RouterLink>
            <RouterLink to="/" class="header-link" @click="signOut">SIGN OUT</RouterLink>
            <div class="dropBox">
              <div class="dropdown" @mouseover="dropFocus" @mouseout="dropBlur">
                <div class="dropBtn header-link">MORE</div>
                <div id="dropMenu" class="dropMenu vertical center">
                  <RouterLink to="/main/profile" class="dropElm">PROFILE</RouterLink>
                  <div class="dropElm" @click="deleteAcc">DELETE</div>
                </div>
              </div>
            </div> 
        </nav>
    </Header>

    <main>
        <RouterView name="leftCell" class="viewCell"></RouterView>
        <RouterView name="centerCell" class="viewCell nonFirst"></RouterView>
        <RouterView name="rightCell" class="viewCell nonFirst"></RouterView>
    </main>
  </div>
</template>

<style scoped>

.grid{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}

.viewCell{
  padding: 20px;
}

@media (min-width: 0em) {
  .nonFirst{
    border-top: 1px solid var(--clr-blue);
  }
}

@media (min-width: 45em) {
	main {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
	}

  .nonFirst{
    border-top: none;
    border-left: 1px solid var(--clr-blue);
  }
}

</style>