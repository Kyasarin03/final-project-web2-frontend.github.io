<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Edit Item</h1>
    <form
      class="flex flex-col space-y-4"
      v-if="item"
      @submit.prevent="updateItem"
    >
      <label class="text-lg font-semibold" for="name">Name:</label>
      <input
        class="border rounded-md p-2"
        v-model="item.name"
        type="string"
        id="name"
      />
      <label class="text-lg font-semibold" for="type">Type:</label>
      <input
        class="border rounded-md p-2"
        v-model="item.type"
        type="text"
        id="type"
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
const item = ref(null);

onMounted(async () => {
  const response = await axios.get(
    `http://localhost:8000/api/items/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  item.value = response.data.data;
});

const updateItem = async () => {
  await axios.put(
    `http://localhost:8000/api/items/${item.value.id}`,
    {
      name: item.value.name,
      type: item.value.type,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  router.push(`/item/${item.value.id}`);
};
</script>
