<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/price"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Edit Price</h1>
    <form
      class="flex flex-col space-y-4"
      v-if="price"
      @submit.prevent="updatePrice"
    >
      <label class="text-lg font-semibold" for="price_time">Time:</label>
      <input
        class="border rounded-md p-2"
        v-model="price.price_time"
        type="time"
        id="price_time"
      />
      <label class="text-lg font-semibold" for="electronic">Electronic:</label>
      <input
        class="border rounded-md p-2"
        v-model="price.electronic"
        type="number"
        step="0.01"
        id="electronic"
      />
      <label class="text-lg font-semibold" for="non_electronic"
        >Non Electronic:</label
      >
      <input
        class="border rounded-md p-2"
        v-model="price.non_electronic"
        type="number"
        step="0.01"
        id="non_electronic"
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

const updatePrice = async () => {
  await axios.put(
    `http://localhost:8000/api/prices/${price.value.id}`,
    {
      price_time: price.value.price_time,
      electronic: price.value.electronic,
      non_electronic: price.value.non_electronic,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  router.push(`/price/${price.value.id}`);
};
</script>
