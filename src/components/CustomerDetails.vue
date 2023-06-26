<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/customer"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Customer Details</h1>
    <div class="bg-white rounded-lg p-4 shadow-md" v-if="customer">
      <h3 class="text-xl font-bold mb-2">{{ customer.customer_name }}</h3>
      <p class="text-gray-500 text-sm mb-2">{{ customer.phone_number }}</p>
      <p class="text-gray-500 text-sm mb-2">{{ customer.address }}</p>
      <div class="flex justify-between">
        <router-link
          :to="`/customer/${customer.id}/edit`"
          class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
          >Edit</router-link
        >
        <button
          @click="deleteCustomer"
          class="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const customer = ref(null);

onMounted(async () => {
  const response = await axios.get(
    `http://localhost:8000/api/customers/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  customer.value = response.data.data;
});
const deleteCustomer = async () => {
  if (confirm("Are you sure you want to delete this customer?")) {
    await axios.delete(
      `http://localhost:8000/api/customers/${customer.value.id}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    router.push("/customer");
  }
};
</script>
