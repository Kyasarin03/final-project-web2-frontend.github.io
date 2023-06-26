<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/customer"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Edit Customer</h1>
    <form
      class="flex flex-col space-y-4"
      v-if="customer"
      @submit.prevent="updateCustomer"
    >
      <label class="text-lg font-semibold" for="customer_name">Name:</label>
      <input
        class="border rounded-md p-2"
        v-model="customer.customer_name"
        type="string"
        id="customer_name"
      />
      <label class="text-lg font-semibold" for="phone_number"
        >Phone Number:</label
      >
      <input
        class="border rounded-md p-2"
        v-model="customer.phone_number"
        type="string"
        id="phone_number"
      />
      <label class="text-lg font-semibold" for="address">Address:</label>
      <input
        class="border rounded-md p-2"
        v-model="customer.address"
        type="text"
        id="address"
      />
      <button
        class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Save Changes
      </button>
    </form>
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

const updateCustomer = async () => {
  await axios.put(
    `http://localhost:8000/api/customers/${customer.value.id}`,
    {
      customer_name: customer.value.customer_name,
      phone_number: customer.value.phone_number,
      address: customer.value.address,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  router.push(`/customer/${customer.value.id}`);
};
</script>
