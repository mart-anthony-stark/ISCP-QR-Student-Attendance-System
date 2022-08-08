<script setup>
</script>

<template>
  <div class="main-container center min-h-screen">
    <div class="cont flex flex-col gap-2 bg-gray-50 p-4 rounded">
      <h1 class="text-center font-bold text-2xl text-blue-700">
        International State College of the Philippines
      </h1>
      <h1 class="text-center font-bold text-2xl text-blue-700">
        Student Attendance System
      </h1>

      <img
        class="w-36 m-auto my-4"
        src="../assets/school.png"
        alt="Shrewsbury International School"
      />

      <router-link to="/admin/login">
        <button
          class="
            bg-blue-800
            hover:bg-blue-700
            px-4
            py-2
            text-white
            rounded
            w-full
            my-2
          "
        >
          Admin Login
        </button>
      </router-link>
      <router-link to="/student/attendance">
        <button
          class="
            bg-blue-800
            hover:bg-blue-700
            px-4
            py-2
            text-white
            rounded
            w-full
          "
        >
          Student Attendance
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),
    url("../assets/hk.webp");
  background-size: cover;
  background-repeat: none;
  background-position: center;
}
.cont {
  min-width: 300px;
}
</style>