<template>
  <div class="p-4">
    <div class="mb-4">
      <router-link
        to="/"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Add Item</h1>
    <form class="flex flex-col space-y-4" @submit.prevent="createItem">
      <label class="text-lg font-semibold" for="name">Name:</label>
      <input
        class="border rounded-md p-2"
        v-model="name"
        type="string"
        id="name"
      />
      <label class="text-lg font-semibold" for="type">Type:</label>
      <input
        class="border rounded-md p-2"
        v-model="type"
        type="text"
        id="type"
      />
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
const name = ref("");
const type = ref("");

const createItem = async () => {
  await axios.post(
    "http://localhost:8000/api/items",
    {
      name: name.value,
      type: type.value,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  router.push("/");
};
</script>
