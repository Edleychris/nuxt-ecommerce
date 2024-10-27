<template>
  <div class="cart-page">
    <h1 class="text-[#787879] font-normal text-lg">Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="flex justify-center items-center py-10">
      <p class="font-bold text-3xl text-[#787879]">Your cart is empty.</p>
    </div>
    <div v-else class="flex w-full lg:flex-row flex-col gap-10 justify-between">
      <div class="lg:w-[60%] w-full">
        <div>
          <ul>
            <li v-for="item in cartItems" :key="item.id" class="border-b gap-6 py-6 flex ">
              <img :src="item.image" alt="Product Image" />
              <div class="flex justify-between flex-col gap-6 w-full">
                <div class="flex justify-between">
                  <div>
                    <h2>{{ item.title }}</h2>
                    <button @click="removeFromCart(item.id)" class="underline text-[10px] text-[#C33434]">Remove
                      item</button>
                  </div>
                  <div>
                    <p class="font-normal text-base"> ${{ item.price }}</p>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="quantity-control mt-4">
                    <button @click="decreaseQuantity(item.id)">-</button>
                    <span class="border px-4">{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item.id)">+</button>
                  </div>
                  <p>${{ (item.price * item.quantity).toFixed(2) }}</p>

                </div>

              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="border rounded-md px-3 h-[240px] py-4 flex flex-col w-full lg:w-[30%]">
        <p class="mb-4 text-[#4B4B4D] text-xs font-bold">SUMMARY</p>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <p class="font-normal text-sm">Subtotal</p>
            <p>$ {{ totalPrice.toFixed(2) || 0 }}</p>
          </div>
          <div class="flex justify-between">
            <p class="font-normal text-sm">Shipping</p>
            <p class="font-normal text-lg">$ {{ shippingCost }}</p>
          </div>
          <div class="flex justify-between">
            <p class="font-normal text-sm">Total</p>
            <p class="">$ {{ total }}</p>
          </div>
          <div>
            <button class="rounded-lg bg-[#2A54C7] py-2 w-full text-white mt-2">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="loading" class="py-10">
        <CustomLoader />
      </div>
      <div v-else class="more_items block mt-10">
        <p class="explore-title">More items to explore</p>
        <div class="grouped">
          <div class="product-grid gap-2">
            <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCartStore } from '~/stores/cart';
import CustomLoader from '~/components/CustomLoader.vue';


const loading = ref(true)
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const products = ref<Product[]>([]);
const shippingCost = ref(45.00);

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

const total = computed(() => {
  return (totalPrice.value + shippingCost.value).toFixed(2);
});

const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId); 
};

const increaseQuantity = (productId: number) => {
  cartStore.increaseQuantity(productId);
};

const decreaseQuantity = (productId: number) => {
  cartStore.decreaseQuantity(productId);
};

const totalItems = computed(() => {
  return cartItems.reduce((total, item) => total + item.quantity, 0); 
});

const totalPrice = computed(() => {
  return cartStore.totalPrice; 
});

const fetchProducts = async () => {
  loading.value = true

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products.value = await response.json();
    loading.value = false

  } catch (error) {
    loading.value = false

    console.error('Error fetching products:', error);
  }
};

onMounted(fetchProducts);

const bestSellers = computed(() => {
  return products.value.slice(0, 3);
});
</script>

<style scoped>
.product-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.cart-page {
  padding: 20px 90px;
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

.cart-page img {
  width: 100px;
  height: auto;
}

.cart-page ul {
  list-style-type: none;
  padding: 0;
}

.cart-page li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-page h1 {
  margin-bottom: 20px;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-control button {
  width: 20px;
  height: 20px;
  font-size: 16px;
  margin: 0 5px;
}
@media screen and (max-width: 1000px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

}

@media screen and (max-width: 700px) {
  .cart-page {
        padding: 20px 60px;
    }
}

@media screen and (max-width: 450px) {
    .cart-page {
  padding: 20px 20px;
}

    .product-grid {
        grid-template-columns: repeat(1, 1fr);
        gap: .5rem;
    }

}
</style>