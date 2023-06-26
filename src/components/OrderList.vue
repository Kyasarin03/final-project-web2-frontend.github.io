<template>
  <div class="p-4">
    <!-- Header section with title and "Create a new order" button that links to the 
create order page -->
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Order List</h1>
      <router-link
        to="/orders/create"
        class="bg-blue-500 text-white rounded-md py-2 px-4 inline-block hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Create a new order
      </router-link>
    </header>
    <!-- Order grid section that loops through orders and displays each order's 
details -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white rounded-lg p-4 shadow-md"
      >
        <!-- Order item name -->
        <h3 class="text-xl font-bold mb-2">{{ order.item.name }}</h3>
        <div class="text-sm mb-2">
          <!-- Order type -->
          <p class="text-gray-500 mb-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>
            Type: {{ order.type }}
          </p>
          <!-- Order time -->
          <p class="text-gray-500 mb-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>
            Time: {{ order.price.price_time }}
          </p>
          <!-- Order customer name -->
          <p class="text-gray-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Ordered by: {{ order.customer.customer_name }}
          </p>
        </div>
        <!-- Order date -->
        <p class="text-gray-700 font-semibold text-lg">
          Date order: {{ order.order_date }}
        </p>
        <!-- View order details button that links to the order details page -->
        <router-link
          :to="`/orders/${order.id}`"
          class="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 inline-block hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const orders = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/orders", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    orders.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
});
</script>
<style></style>
