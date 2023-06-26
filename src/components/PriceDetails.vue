<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/price"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Price Details</h1>
    <div class="bg-white rounded-lg p-4 shadow-md" v-if="price">
      <h3 class="text-xl font-bold mb-2">Time: {{ price.price_time }}</h3>
      <p class="text-gray-500 text-sm mb-2">
        Electronic: {{ price.electronic }}
      </p>
      <p class="text-gray-500 text-sm mb-2">
        Non Electronic: {{ price.non_electronic }}
      </p>
      <div class="flex justify-between">
        <router-link
          :to="`/price/${price.id}/edit`"
          class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
          >Edit</router-link
        >
        <button
          @click="deletePrice"
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
const price = ref(null);

onMounted(async () => {
  const response = await axios.get(
    `http://localhost:8000/api/prices/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  price.value = response.data.data;
});
const deletePrice = async () => {
  if (confirm("Are you sure you want to delete this price?")) {
    await axios.delete(`http://localhost:8000/api/prices/${price.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    router.push("/price");
  }
};
</script>
