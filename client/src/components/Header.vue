<script setup>
import { useRoute } from "vue-router";
import AccountsDropdown from "./AccountsDropdown.vue";

const route = useRoute();
</script>

<template>
  <nav class="header flex justify-between items-center">
    <div class="flex gap-4 items-center">
      <img
        id="cnsc-logo"
        class="w-14 h-14"
        src="../assets/school.png"
        alt="CNSC"
      />

      <router-link to="/home">
        <button :class="{ active: route.name === 'home' }">Home</button>
      </router-link>

      <accounts-dropdown
        :isActive="route.name == 'students' || route.name == 'admins'"
      />

      <router-link to="/attendance">
        <button :class="{ active: route.name === 'attendance' }">
          Attendance
        </button>
      </router-link>
    </div>
    <button class="bg-red-500 rounded-lg hover:bg-red-4 00">Logout</button>
  </nav>
</template>

<style scoped>
</style>