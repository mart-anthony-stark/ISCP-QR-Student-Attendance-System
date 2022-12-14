<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { createToast } from "mosha-vue-toastify";
import { useStore } from "vuex";
import LoadingSpinner from "../components/Loader.vue";
import { QrStream, QrCapture, QrDropzone } from "vue3-qr-reader";

const store = useStore();
const accessToken = computed(() => store.state.accessToken);
const APIBASE = import.meta.env.VITE_API_URL;
const codeRef = ref(null);
const isLoading = ref(false);
const scanQR = ref(false);

const timeIn = async (data) => {
  const code = data ? data : codeRef.value.value;
  if (code.length === 0) {
    createToast("Please input your student code", { type: "danger" });
    return;
  }
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  try {
    isLoading.value = true;
    const res = await fetch(`${APIBASE}/time`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
      },
      body: JSON.stringify({ time, date, student: code }),
    });

    if (!res.ok) {
      isLoading.value = false;
      createToast("Something went wrong", { type: "danger" });
      return;
    }
  } catch (error) {
    isLoading.value = false;
    createToast("Something went wrong", { type: "danger" });
    return;
  }
  isLoading.value = false;
  scanQR.value = false;
  createToast(`Time in: ${time} - ${date}`, { type: "success" });
  codeRef.value.value = "";
};

const onDecode = (data) => {
  timeIn(data);
};
</script>


<template>
  <div class="main-container center min-h-screen">
    <loading-spinner v-if="isLoading" />

    <div class="fixed mx-4 border-2 border-gray-800" v-if="scanQR">
      <qr-stream @decode="onDecode" />
      <button
        @click="scanQR = false"
        class="
          absolute
          -top-6
          bg-blue-800
          -right-6
          text-white
          px-4
          py-2
          rounded
        "
      >
        X
      </button>
    </div>
    <!-- <qr-capture /> -->

    <main class="flex flex-col w-full gap-2 bg-white p-4 rounded">
      <h1 class="text-center font-bold text-2xl my-4 text-blue-700">
        Student Attendance
      </h1>
      <input
        ref="codeRef"
        type="text"
        placeholder="Student CODE"
        class="p-2 my-4"
      />
      <button
        @click="timeIn()"
        class="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
      >
        TIME IN
      </button>
      <p class="text-center mt-4 text-gray-500">
        You can also scan your assigned QR code
      </p>
      <button
        @click="scanQR = true"
        class="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
      >
        Scan QR code
      </button>
      <a @click="$router.go(-1)" class="mt-4 text-red-400 cursor-pointer"
        >Back</a
      >
    </main>
  </div>
</template>

<style scoped>
.main-container {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),
    url("../assets/grad.webp");
  background-size: cover;
  background-repeat: none;
  background-position: center;
}
main {
  max-width: 400px;
}
input {
  @apply w-full p-2 border-b-2 border-gray-700 outline-none my-4 focus-within:border-red-800 focus-within:bg-gray-100;
}
</style>