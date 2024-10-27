<template>
  <div class="product-card">
    <img :src="product.image" alt="Product Image" @click="goToProduct" class="product-image" />
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
};

</script>

<style scoped>
.product-card {
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 16px;
}

.product-card img {
  max-width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
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
  transition: transform 0.3s ease;

}

@media screen and (max-width: 700px) {
  .product-card img {
    max-width: 100%;
    height: 200px;
    padding: 10px;
  }

}
</style>