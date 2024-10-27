<template>
    <div class="container">
        <!-- Breadcrumb Navigation -->
        <nav class="breadcrumb">
            <span class="breadcrumb-item">Home</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item">Category</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item product-name">{{ product?.title }}</span>
        </nav>

        <div class="product_block">
            <div v-if="product" class=" px-28 flex gap-6 justify-between items-center ">
                <div class="flex gap-5 w-[55%] h-[397px]">
                    <div class="flex flex-col gap-4">
                        <img src="../../assets/Rect-gray.png" class="w-[30px] h-[25px]" alt="">
                        <img src="../../assets/Rect-gray.png" class="w-[30px] h-[25px]" alt="">
                        <img src="../../assets/Rect-gray.png" class="w-[30px] h-[25px]" alt="">
                        <img src="../../assets/Rect-gray.png" class="w-[30px] h-[25px]" alt="">
                    </div>
                    <div>
                        <img :src="product.image" alt="Product image" class="w-full h-full" />
                    </div>

                </div>
                <div class="  flex flex-col gap-3 w-[50%]">
                    <h1 class="title">{{ product.title }}</h1>
                    <p class="price">Price: ${{ product.price }}</p>
                    <button class="btn" @click="addToCart">
                        <img src="../../assets/white-cart.png" alt="">Add to Cart</button>
                    <div class="product_details">
                        <p class="details">PRODUCT DETAILS</p>
                        <p>{{ product.description }}</p>

                    </div>
                </div>
            </div>
            <div v-else class="w-full justify-center items-center p-20 text-4xl ">
                <CustomLoader />
            </div>
        </div>

        <div class="more_items block">
            <p class="explore-title">More items to explore</p>
            <div class="grouped">
                <div class="product-grid gap-2 ">
                    <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import CustomLoader from '~/components/CustomLoader.vue';

const route = useRoute();
const cartStore = useCartStore();
const product = ref<Product | null>(null);
const products = ref<Product[]>([]);

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

const fetchProduct = async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
        product.value = await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products.value = await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

onMounted(fetchProducts);

const bestSellers = computed(() => {
    return products.value.slice(0, 3);
});
onMounted(fetchProduct);

const addToCart = () => {
    if (product.value) {
        cartStore.addToCart(product.value);
    }
};
</script>

<style scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 16px;
    padding: 20px 90px;
    font-weight: 400;
    color: #787879;
}

.product-name {
    color: #2A54C7;
    cursor: pointer;
}

.breadcrumb-separator {
    margin: 0 5px;
    color: #1E1F21;
}

.availiable_product {
    display: flex;
    padding: 20px 90px;
    gap: 40px;
    justify-content: space-between;
}

.product_content {
    display: flex;
    flex-direction: column;
    gap: 24px
}

.title {
    font-size: 24px;
    font-weight: 700;
    color: #1E1F21;
}

.btn {
    background-color: #2A54C7;
    color: white;
    text-align: center;
    padding: 6px;
    width: 100%;
    outline: none;
    border: none;
    border-radius: 10px;
    height: 42px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.product_details {
    color: #787879;
}

.product_details .details {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 15px;
}

.product_details p {
    font-weight: 400;
    font-size: 16px;
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

.more_items {
    margin-top: 50px;
}

.product-grid {
    display: grid;
    width: 100%;

    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
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