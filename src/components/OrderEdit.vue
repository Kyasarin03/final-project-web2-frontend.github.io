<template>
  <div class="p-4">
    <!-- Back button to go back to the previous page -->
    <button
      class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb6"
      @click="goBack"
    >
      &larr; Back
    </button>
    <!-- Title of the page -->
    <h1 class="text-3xl font-bold mb-4">Edit Order</h1>
    <!-- Form for editing the order -->
    <form @submit.prevent="updateOrder" v-if="order">
      <!-- Select input for choosing the customer associated with the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="cutomer_id"
          >Customer:</label
        >
        <div class="relative">
          <select
            v-model="form.customer_id"
            id="customer_id"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a customer</option>
            <!-- Loop through the list of custtomers and display them as options -->
            <option
              v-for="customer in customers"
              :key="customer.id"
              :value="customer.id"
            >
              {{ customer.customer_name }}
            </option>
          </select>
          <!-- Arrow icon for the select input -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M14.707 6.293a1 1 0 00-1.414 0L10 9.586 6.707 6.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
              />
            </svg>
          </div>
        </div>
        <!-- Display errors related to the customer select input -->
        <p v-if="formErrors.customer_id" class="text-red-500 text-sm mt-1">
          {{ formErrors.customer_id[0] }}
        </p>
      </div>
      <!-- Select input for choosing the product associated with the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="item_id"
          >Item:</label
        >
        <div class="relative">
          <select
            v-model="form.item_id"
            id="item_id"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a item</option>
            <!-- Loop through the list of items and display them as options -->
            <option v-for="item in items" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <!-- Arrow icon for the select input -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M14.707 6.293a1 1 0 00-1.414 0L10 9.586 6.707 6.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
              />
            </svg>
          </div>
        </div>
        <!-- Display errors related to the product select input -->
        <p v-if="formErrors.item_id" class="text-red-500 text-sm mt-1">
          {{ formErrors.item_id[0] }}
        </p>
      </div>
      <!-- Select input for choosing the type of the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="type"
          >Type:</label
        >
        <div class="relative">
          <select
            v-model="form.type"
            id="type"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a type</option>
            <!-- Display different type options as select options -->
            <option value="electronic">Electronic</option>
            <option value="non_electronic">Non Electronic</option>
          </select>
          <!-- Show error message related to the type select input -->
          <p v-if="formErrors.type" class="text-red-500 text-sm mt-1">
            {{ formErrors.type[0] }}
          </p>
        </div>
      </div>
      <div class="mb-4">
        <label for="order_date" class="block text-gray-700 font-bold mb-2"
          >Date order:</label
        >
        <div class="relative">
          <input
            type="date"
            id="order_date"
            v-model="form.order_date"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
      <!-- Buttons for submitting and canceling the changes -->
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
        <!-- Button for canceling the changes and returning to order details -->
        <router-link
          :to="{ name: 'orderdetail', params: { id: order.id } }"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >Cancel</router-link
        >
      </div>
    </form>
  </div>
</template>
<script setup>
// Import required modules and functions
import axios from "axios";
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
// Get the authentication store, router and current route
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
// Define reactive variables and computed properties
const order = ref(null); // Reference for the order being edited
const form = ref({
  // Reference for the form data
  customer_id: "",
  item_id: "",
  price_id: "",
  type: "",
  order_date: "",
});
const formErrors = ref({}); // Reference for form validation errors
// Fetch the order data on component mount
onMounted(async () => {
  // Get the ID of the order to be edited from the route parameter
  const orderId = route.params.id;
  try {
    // Fetch the order data from the API
    const response = await axios.get(
      `http://localhost:8000/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    // Update the order reference with the fetched data
    order.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
});
// Define a computed property to map the order data to the form object
const mappedForm = computed(() => {
  if (!order.value) {
    return form.value;
  }
  return {
    customer_id: order.value.customer.id,
    item_id: order.value.item.id,
    price_id: order.value.price.id,
    type: order.value.type,
    order_date: order.value.order_date,
  };
});

// Update the form variable whenever the order variable changes
watch(
  () => order.value,
  () => {
    form.value = { ...mappedForm.value };
  },
  { immediate: true }
);
// Define methods for updating the order and handling form errors
async function updateOrder() {
  try {
    // Send a PUT request to update the order with the new data
    const response = await axios.put(
      `http://localhost:8000/api/orders/${order.value.id}`,
      form.value,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    // Update the order reference with the updated data
    order.value = response.data.data;
    // Redirect to the order list page
    router.push({ name: "orderlist" });
  } catch (error) {
    if (error.response && error.response.type === 422) {
      // Handle form validation errors
      formErrors.value = error.response.data.errors;
    } else {
      console.error(error);
    }
  }
}
// Fetch the list of customers and products to display in the select inputs
const customers = ref([]);
const items = ref([]);
const prices = ref([]);
onMounted(async () => {
  try {
    // Send a GET request to the API endpoint for customers and attach an authorizationtoken to the header
    const response = await axios.get("http://localhost:8000/api/customers", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    // Set the reactive variable `customers` to the response data from the API
    customers.value = response.data.data;
  } catch (error) {
    // Log an error message to the console if the request fails
    console.error(error);
  }
  try {
    // Send a GET request to the API endpoint for items and attach an authorization token to the header
    const response = await axios.get("http://localhost:8000/api/items", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    // Set the reactive variable `items` to the response data from the API
    items.value = response.data.data;
  } catch (error) {
    // Log an error message to the console if the request fails
    console.error(error);
  }
  try {
    // Send a GET request to the API endpoint for prices and attach an authorization token to the header
    const response = await axios.get("http://localhost:8000/api/prices", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    // Set the reactive variable `prices` to the response data from the API
    prices.value = response.data.data;
  } catch (error) {
    // Log an error message to the console if the request fails
    console.error(error);
  }
});
// Define a method to navigate back to the previous page in the browser history
const goBack = () => {
  router.go(-1);
};
</script>
