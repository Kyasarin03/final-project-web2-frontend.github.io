<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Price List</h1>
    <router-link
      to="/price/create"
      class="bg-blue-500 text-white rounded-md py-2 px-4 mb-4 inline-block hover:bg-blue-600 transition-colors"
      >Add a new price</router-link
    >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="price in prices"
        :key="price.id"
        class="bg-white rounded-lg p-4 shadow-md"
      >
        <h3 class="text-xl font-bold mb-2">Time: {{ price.price_time }}</h3>
        <p class="text-gray-500 text-sm mb-2">
          Electronic: {{ price.electronic }}
        </p>
        <p class="text-gray-500 text-sm mb-2">
          Non Electronic: {{ price.non_electronic }}
        </p>
        <router-link
          :to="`/price/${price.id}`"
          class="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 inline-block hover:bg-blue-600 transition-colors"
          >View Details</router-link
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const prices = ref([]);

onMounted(async () => {
  const response = await axios.get("http://localhost:8000/api/prices", {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  });
  prices.value = response.data.data;
});
</script>
