<template>
  <div class="product-card">
    <img :src="product.image" alt="Product Image" @click="goToProduct"
      class="product-image" />
    <div>
      <h2 class="title">{{ product.title }}</h2>
      <p class="price">${{ product.price }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  product: {
    id: number
    title: string
    description: string
    image: string
    price: number
  }
}>()

const goToProduct = () => {
  router.push(`/product/${props.product.id}`);
  console.log(props.product.id)
};

const addToCart = () => {
  console.log(`${props.product.title} added to cart!`)
}
</script>

<style scoped>
.product-card {
  /* border: 1px solid #ccc; */
  border-radius: 8px;
  padding: 16px;
  /* text-align: center; */
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 16px;
  /* width: 300px; */
}

.product-card img {
  max-width: 100%;
  height: 300px;

  /* border-radius: 50%;  */
  object-fit: cover;
  /* Ensures the image covers the area without distortion */
  margin-bottom: 1rem;
  /* Space between image and text */
  transition: transform 0.3s ease;
  /* backface-visibility: hidden;  */
  /* object-fit: ; */
}

.title {
  font-size: 14px;
  font-weight: 700;
}

.price {
  color: #787879;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 400;
}

.product-card:hover .product-image {
  /* transform: rotateY(180deg); */
  transition: transform 0.3s ease;

}

@media screen and (max-width: 700px) {
  .product-card img {
    max-width: 100%;
    height: 200px;
  }

}
</style>