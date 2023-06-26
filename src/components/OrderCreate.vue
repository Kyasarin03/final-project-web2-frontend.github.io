<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Create Order</h1>
    <form @submit.prevent="createOrder">
      <!--Order customer name-->
      <div class="mb-4">
        <label for="customer_id" class="block text-gray-700 font-bold mb-2"
          >Customer:</label
        >
        <select
          id="customer_id"
          v-model="form.customer_id"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.id"
          >
            {{ customer.customer_name }}
          </option>
        </select>
      </div>
      <!--Order item name-->
      <div class="mb-4">
        <label for="item_id" class="block text-gray-700 font-bold mb-2"
          >Item:</label
        >
        <select
          id="item_id"
          v-model="form.item_id"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option v-for="item in items" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <!--Order type-->
      <div class="mb-4">
        <label for="status" class="block text-gray-700 font-bold mb-2"
          >Type:</label
        >
        <select
          id="type"
          v-model="form.type"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <!-- Options for order type -->
          <option value="electronic">Electronic</option>
          <option value="non_electronic">Non Electronic</option>
        </select>
      </div>
      <!--Order price-->
      <div class="mb-4">
        <label for="price_id" class="block text-gray-700 font-bold mb-2"
          >Time:</label
        >
        <select
          id="price_id"
          v-model="form.price_id"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option v-for="price in prices" :key="price.id" :value="price.id">
            {{ price.price_time }}
          </option>
        </select>
      </div>
      <!--Date order-->
      <div class="mb-4">
        <label for="order_date" class="block text-gray-700 font-bold mb-2"
          >Date order:</label
        >
        <input
          type="date"
          id="order_date"
          v-model="form.order_date"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
        <router-link
          to="/orders"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >Cancel</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios"; // import axios library for HTTP requests
import { ref, onMounted } from "vue"; // import ref and onMounted functions from Vue
import { useRouter } from "vue-router"; // import useRouter function from Vue Router
import { useAuthStore } from "@/stores/auth"; // import useAuthStore function from the auth store

const router = useRouter(); // create router variable using useRouter function
const authStore = useAuthStore(); // create authStore variable using useAuthStore function from the auth store
const form = ref({
  // create form variable with initial values
  customer_id: null,
  item_id: null,
  price_id: null,
  type: null,
  order_date: null,
});
const customers = ref([]);
const items = ref([]);
const prices = ref([]);

onMounted(async () => {
  try {
    const [customersResponse, itemsResponse, pricesResponse] =
      await Promise.all([
        axios.get("http://localhost:8000/api/customers", {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }),
        axios.get("http://localhost:8000/api/items", {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }),
        axios.get("http://localhost:8000/api/prices", {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }),
      ]);
    customers.value = customersResponse.data.data;
    items.value = itemsResponse.data.data;
    prices.value = pricesResponse.data.data;
  } catch (error) {
    console.log(error);
  }
});
const createOrder = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/orders",
      form.value,
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
};
</script>
