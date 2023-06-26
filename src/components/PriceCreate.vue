<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/price"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Add Price</h1>
    <form class="flex flex-col space-y-4" @submit.prevent="createPrice">
      <label class="text-lg font-semibold" for="price_time">Time:</label>
      <input
        class="border rounded-md p-2"
        v-model="price_time"
        type="time"
        id="price_time"
      />
      <br />
      <label class="text-lg font-semibold" for="electronic">Electronic:</label>
      <input
        class="border rounded-md p-2"
        v-model="electronic"
        type="number"
        step="0.01"
        id="electronic"
      />
      <br />
      <label class="text-lg font-semibold" for="non_electronic"
        >Non Electronic:</label
      >
      <input
        class="border rounded-md p-2"
        v-model="non_electronic"
        type="number"
        step="0.01"
        id="non_electronic"
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
const price_time = ref("");
const electronic = ref("");
const non_electronic = ref("");

const createPrice = async () => {
  await axios.post(
    "http://localhost:8000/api/prices",
    {
      price_time: price_time.value,
      electronic: electronic.value,
      non_electronic: electronic.value,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  router.push("/price");
};
</script>
