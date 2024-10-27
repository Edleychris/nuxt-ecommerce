<template>
  <div class="cart-page">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else class="flex justify-between">
      <div >
        <div>
          <ul>
            <li v-for="item in cartItems" :key="item.id">
              <img :src="item.image" alt="Product Image" />
              <div>
                <h2>{{ item.title }}</h2>
                <p>Price: ${{ item.price }}</p>
                <div class="quantity-control">
                  <button @click="decreaseQuantity(item.id)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item.id)">+</button>
                </div>
                <button @click="removeFromCart(item.id)">Remove</button>
              </div>
            </li>
          </ul>
          <p>Total Items: {{ totalItems }}</p>
          <p>Total Price: ${{ totalPrice.toFixed(2) }}</p>
        </div>
      </div>
      <div class="border rounded-md">
        <h2>SUMMARY</h2>
        <div>
          <div>
            <p>Subtotal</p>
            <p></p>
          </div>
          <div>
            <p>Shipping</p>
            <p></p>
          </div>
          <div>
            <p>Total</p>
            <p></p>
          </div>
          <div>
            <button class="rounded-lg">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="more_items block mt-10">
            <p class="explore-title">More items to explore</p>
            <div class="grouped">
                <div class="product-grid gap-2 ">
                    <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const cartItems = cartStore.items; // Access cart items
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
const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId); // Remove item from cart
};

const increaseQuantity = (productId: number) => {
  cartStore.increaseQuantity(productId); // Increase quantity
};

const decreaseQuantity = (productId: number) => {
  cartStore.decreaseQuantity(productId); // Decrease quantity
};

const totalItems = computed(() => {
  return cartItems.reduce((total, item) => total + item.quantity, 0); // Total quantity of items
});

const totalPrice = computed(() => {
  return cartStore.totalPrice; // Total price from the store
});

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
</style>