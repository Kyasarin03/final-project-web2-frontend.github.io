<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/customer"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Add Customer</h1>
    <form class="flex flex-col space-y-4" @submit.prevent="createCustomer">
      <label class="text-lg font-semibold" for="customer_name">Name:</label>
      <input
        class="border rounded-md p-2"
        v-model="customer_name"
        type="string"
        id="customer_name"
      />
      <br />
      <label class="text-lg font-semibold" for="phone_number"
        >Phone Number:</label
      >
      <input
        class="border rounded-md p-2"
        v-model="phone_number"
        type="string"
        id="phone_number"
      />
      <br />
      <label class="text-lg font-semibold" for="address">Address:</label>
      <input
        class="border rounded-md p-2"
        v-model="address"
        type="text"
        id="address"
      />
      <br />
      <button
        class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const customer_name = ref("");
const phone_number = ref("");
const address = ref("");

const createCustomer = async () => {
  await axios.post(
    "http://localhost:8000/api/customers",
    {
      customer_name: customer_name.value,
      phone_number: phone_number.value,
      address: address.value,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  router.push("/customer");
};
</script>
