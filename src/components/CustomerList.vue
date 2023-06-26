<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Customer List</h1>
    <router-link
      to="/customer/create"
      class="bg-blue-500 text-white rounded-md py-2 px-4 mb-4 inline-block hover:bg-blue-600 transition-colors"
      >Add a new customer</router-link
    >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="customer in customers"
        :key="customer.id"
        class="bg-white rounded-lg p-4 shadow-md"
      >
        <h3 class="text-xl font-bold mb-2">{{ customer.customer_name }}</h3>
        <p class="text-gray-500 text-sm mb-2">{{ customer.phone_number }}</p>
        <p class="text-gray-500 text-sm mb-2">{{ customer.address }}</p>
        <router-link
          :to="`/customer/${customer.id}`"
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
const customers = ref([]);

onMounted(async () => {
  const response = await axios.get("http://localhost:8000/api/customers", {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  });
  customers.value = response.data.data;
});
</script>
