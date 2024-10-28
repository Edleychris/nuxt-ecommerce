<template>
  <div class=" hidden-view flex lg:flex-row md:flex-col justify-between gap-4 py-6 px-20 border border-b-2">
    <div class="flex items-center gap-8">
      <nuxt-link to="/" class="font-bold text-3xl">Logo</nuxt-link>
      <ul class="flex text-[#4B4B4D] font-bold text-sm gap-4">
        <li>Electronics</li>
        <li>Health & Beauty</li>
        <li>Home & Office</li>
        <li>Computing</li>
      </ul>
    </div>
    <div class="flex items-center gap-6 justify-end lg:mt-0 mt-2">
      <div class="border rounded-lg p-2 flex items-center gap-2">
        <img src="../assets/search.png" alt="">
        <input type="search" v-model="searchTerm" @input="onSearch" class="outline-none" placeholder="Search"
          >
      </div>
      <div class="flex items-center gap-2">
        <img src="../assets/avatar.png" alt="">
        <p>Account</p>
      </div>
      <div class="flex items-center gap-2 relative">
        <img src="../assets/cart.png" alt="">
        <nuxt-link to="/cart">Cart</nuxt-link>
        <span class="cart-count absolute bg-[#2A54C7]flex px-2 rounded-full left-10 -top-3"
          v-if="cartStore?.itemCount">{{ cartStore.itemCount }}</span>
      </div>
    </div>
  </div>
  <!-- mobile view  -->
  <div class="flex flex-col gap-3 md:hidden border-b pb-4">
    <div class="flex justify-between py-4 px-4">
      <nuxt-link to="/" class="font-bold text-3xl">Logo</nuxt-link>
      <div class="flex items-center gap-4">
        <img src="../assets/avatar.png" alt="">
        <div class="flex items-center gap-2 relative">
          <nuxt-link to="/cart">
            <img src="../assets/cart.png" alt="">
          </nuxt-link>
          <span class="cart-count absolute  flex px-2 rounded-full left-1 -top-3" v-if="cartStore?.itemCount">{{
            cartStore.itemCount }}</span>
        </div>
        <img src="../assets/hambugger.png" alt="" @click="toggleMenu" />
      </div>
    </div>
    <div class="px-4">
      <div class="border rounded-lg p-2 flex items-center gap-2">
        <img src="../assets/search.png" alt="">
        <input type="search" v-model="searchTerm" @input="onSearch" placeholder="Search" class="outline-none">
      </div>
    </div>

    <!-- Hamburger Menu -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="absolute bg-white shadow-lg w-full p-4">
        <p class="text-right cursor-pointer" @click="toggleMenu">X</p> <!-- Close hamburger view -->
        <ul class="flex flex-col text-[#4B4B4D] font-bold text-base gap-4">
          <li>Electronics</li>
          <li>Health & Beauty</li>
          <li>Home & Office</li>
          <li>Computing</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const isMenuOpen = ref(false);
const searchTerm = ref('');
const emit = defineEmits(['search']);


const onSearch = () => {
  emit('search', searchTerm.value);
};
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.cart-count {
  margin-left: 10px;
  font-weight: bold;
  color: #2A54C7;
}

ul li {
  cursor: pointer;
  transition: color 0.3s ease;
}

/* Hover effect */
ul li:hover {
  color: #2A54C7;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .md\:hidden-view {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .hidden-view {
    display: none !important;
  }
}
</style>