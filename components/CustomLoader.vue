<template>
    <div class="loader">
        <span v-for="(letter, index) in displayedLetters" :key="index" class="letter"
            :style="{ animationDelay: `${index * 0.1}s` }">
            {{ letter }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const letters = 'ChigiSoft'.split('');
const displayedLetters = ref([...letters]);

const loopLetters = () => {
    setInterval(() => {
        const firstLetter = displayedLetters.value.shift();
        displayedLetters.value.push(firstLetter);
    }, 1000);
};

onMounted(() => {
    loopLetters();
});
</script>

<style scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
}

.letter {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
</style>