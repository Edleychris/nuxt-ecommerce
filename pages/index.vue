<template>
    <div v-if="loading" class="py-20">
        <CustomLoader />
    </div>
    <div v-else>
        <div class="py-8 px-24">
            <div class="background-image pt-16">
                <div class="flex flex-col items-center gap-4">
                <p class="text-[#1E1F21] font-bold text-3xl font-sans">New Arrivals in Computing</p>
                <button class="bg-[#2A54C7] rounded-2xl py-2.5 px-6 text-white">Shop now</button>
            </div>
            </div>
        </div>
        <div class="block">
            <p class="explore-title">Best sellers</p>
            <div class="grouped">
                <div class="product-grid gap-2 ">
                    <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
                </div>
            </div>

            <p class="explore-title">New Arrivals</p>
            <div class="grouped">
                <div class="product-grid gap-2 ">
                    <ProductCard v-for="product in mostVisited" :key="product.id" :product="product" />
                </div>
            </div>

            <p class="explore-title">Top picks</p>
            <div class="grouped">
                <div class="product-grid gap-2 ">
                    <ProductCard v-for="product in mostWanted" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'
import { ref, onMounted, computed } from 'vue';
import CustomLoader from '~/components/CustomLoader.vue';

const products = ref<Product[]>([]);
const loading = ref(true)
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const fetchProducts = async () => {
    loading.value = true
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products.value = await response.json();
        loading.value = false

    } catch (error) {
        console.error('Error fetching products:', error);
        loading.value = false
    }
};

onMounted(fetchProducts);

const bestSellers = computed(() => {
    return products.value.slice(0, 3);
});

const mostVisited = computed(() => {
    return products.value.slice(3, 6);
});

const mostWanted = computed(() => {
    return products.value.slice(6, 9);
});
</script>

<style scoped>
.background-image {
  background-image: url('../assets/wallpaper.png'); 
  background-size: cover; 
  background-repeat: no-repeat; 
  height: 507px; 
  display: flex; 
  justify-content: center;
  color: white; 
}
.grouped {
    width: 100%;

}

.block {
    padding: 20px 90px;
}

.block p {
    padding: 0px 20px;
}

.product-grid {
    display: grid;
    width: 100%;

    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.explore-title {
    position: relative;
    padding-left: 15px;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 20px
}

.explore-title::before {
    content: "";
    position: absolute;
    left: 10px;
    top: 50%;
    height: 100%;
    width: 2px;
    background-color: #2A54C7;
    transform: translateY(-50%);
}

.explore-title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 2px;
    width: 100%;
}

.product-card:hover {
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.9);
}

@media screen and (max-width: 1000px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

}

@media screen and (max-width: 700px) {
    .block {
        padding: 20px 20px;
    }

}

@media screen and (max-width: 450px) {
    .block {
        padding: 20px 10px;
    }

    .product-grid {
        grid-template-columns: repeat(1, 1fr);
        gap: .5rem;
    }

}
</style>