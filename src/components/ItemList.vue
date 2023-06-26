<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Item List</h1>
    <router-link
      to="/item/create"
      class="bg-blue-500 text-white rounded-md py-2 px-4 mb-4 inline-block hover:bg-blue-600 transition-colors"
      >Add a new item</router-link
    >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white rounded-lg p-4 shadow-md"
      >
        <h3 class="text-xl font-bold mb-2">{{ item.name }}</h3>
        <p class="text-gray-500 text-sm mb-2">{{ item.type }}</p>
        <router-link
          :to="`/item/${item.id}`"
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
const items = ref([]);

onMounted(async () => {
  const response = await axios.get("http://localhost:8000/api/items", {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  });
  items.value = response.data.data;
});
</script>
