<template>
  <div class="p-4" v-if="order">
    <button
      class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
      @click="goBack"
    >
      &larr; Back
    </button>
    <h1 class="text-3xl font-bold mb-4">
      {{ order.customer.customer_name }}'s Order Details
    </h1>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Item:</label>
      <p class="text-gray-700 font-semibold">{{ order.item.name }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Type:</label>
      <p class="text-gray-700 font-semibold">{{ order.type }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Time:</label>
      <p class="text-gray-700 font-semibold">{{ order.price.price_time }}</p>
    </div>
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'orderedit', params: { id: order.id } }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Edit</router-link
      >
      <button
        type="button"
        @click="deleteOrder"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
// Initialize variables for authentication, routing and order data
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const order = ref(null);
// Fetch the order data when the component is mounted
onMounted(async () => {
  const response = await axios.get(
    `http://localhost:8000/api/orders/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  order.value = response.data.data;
});
// Define function to delete the current order
const deleteOrder = async () => {
  if (confirm("Are you sure you want to delete this order?")) {
    try {
      await axios.delete(
        `http://localhost:8000/api/orders/${route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      router.push({ name: "orderlist" });
    } catch (error) {
      console.log(error);
    }
  }
};
// Define function to navigate back to the previous page
const goBack = () => {
  router.go(-1);
};
</script>
