<script setup>
import { ref } from 'vue';

const visible = ref(false);

defineExpose({
    open, close
})

function open(){
    visible.value = true;
}

function close(){
    visible.value = false;
}


</script>

<template>
    <div v-show="visible" class="backdrop center">
        <div class="modal vertical card">
            <header>
                <slot name="header"></slot>
            </header>

            <section class="center vertical">
                <slot name="main"></slot>
            </section>

            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<style scoped>
    .backdrop{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        backdrop-filter: blur(5px);
        background-color: var(--clr-dark-seethrough);
        background-image: url(../../public/Background.svg);
        animation: reveal .3s;
    }

    @keyframes reveal {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .modal{
        position: relative;
        padding: 2rem;
        background-color: var(--clr-dark);
        border-radius: 10px;
        width: 60%;
    }

</style>
