<template>
    <transition name="fade">
      <div v-if="visible" class="toast whitespace-nowrap">
        <div class="flex items-center gap-2">
            <img src="../assets/checked.png" alt="">
        {{ message }}
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, watch } from 'vue';
  
  const props = defineProps<{
    message: string;
    duration?: number; // Duration in milliseconds
  }>();
  
  const visible = ref(false);
  
  watch(() => props.message, (newMessage) => {
    if (newMessage) {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.duration || 3000); // Default duration is 3000ms
    }
  });
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 20px;
    left: 90%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 40px;
    padding: 16px 10px;
    width: 220px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>