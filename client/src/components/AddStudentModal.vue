<script setup>
import { ref } from "@vue/reactivity";
import { createToast } from "mosha-vue-toastify";
import { computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import LoadingSpinner from "./Loader.vue";

const { emit } = getCurrentInstance();
const store = useStore();
const stdImage = ref(null);
const fnameRef = ref(null);
const mnameRef = ref(null);
const lnameRef = ref(null);
const courseRef = ref(null);
const sectionRef = ref(null);
const loading = ref(false);
const apiBase = import.meta.env.VITE_API_URL;
const accessToken = computed(() => store.state.accessToken);

// Handle submit form for adding new admin
const submit = async () => {
  const fname = fnameRef.value.value;
  const mname = mnameRef.value.value;
  const lname = lnameRef.value.value;
  const course = courseRef.value.value;
  const section = sectionRef.value.value;
  if (!validateEmptyInputs(fname, lname, mname, course, section)) return;

  const body = JSON.stringify({
    firstname: fname,
    middlename: mname,
    lastname: lname,
    course,
    section,
  });
  console.log(stdImage.value.files[0]);
  const formdata = new FormData();
  formdata.append("firstname", fname);
  formdata.append("middlename", mname);
  formdata.append("lastname", lname);
  formdata.append("course", course);
  formdata.append("section", section);
  formdata.append("image", stdImage.value.files[0]);

  loading.value = true;
  try {
    const res = await fetch(`${apiBase}/student`, {
      method: "POST",
      headers: {
        "access-token": accessToken,
      },
      body: formdata,
    });

    const data = await res.json();
    if (!res.ok) {
      loading.value = false;
      createToast(data.err, { type: "danger" });
      return;
    }
  } catch (error) {
    loading.value = false;
    createToast("Something went wrong", { type: "danger" });
    return;
  }

  loading.value = false;
  createToast("New Student Successfully Added", { type: "success" });
  emit("closeModal");
};

const validateEmptyInputs = (...inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].length === 0) {
      createToast("Inputs must not be empty string", { type: "danger" });
      return false;
    }
  }
  return true;
};
</script>

<template>
  <div>
    <loading-spinner v-if="loading" />
    <div @click="$emit('closeModal')" class="overlay"></div>
    <form autocomplete="off" @submit.prevent="submit">
      <h1 class="text-red-700 text-3xl text-center font-bold my-2">
        New Student
      </h1>
      <input ref="stdImage" type="file" name="image" id="std-image" />
      <input
        ref="fnameRef"
        type="text"
        placeholder="Firstname"
        autocomplete="off"
      />
      <input
        ref="mnameRef"
        type="text"
        placeholder="Middlename"
        autocomplete="off"
      />
      <input
        ref="lnameRef"
        type="text"
        placeholder="Lastname"
        autocomplete="off"
      />
      <input
        ref="courseRef"
        type="text"
        placeholder="Course"
        autocomplete="off"
      />
      <input
        ref="sectionRef"
        type="TEXT"
        placeholder="Section"
        autocomplete="off"
      />
      <button
        type="submit"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          focus:outline-none focus:shadow-outline
          w-full
        "
      >
        Add New Student
      </button>
    </form>
  </div>
</template>

<style scoped>
.overlay {
  @apply fixed z-10 inset-0;
  background: rgba(0, 0, 0, 0.4);
}
form {
  @apply fixed z-20 bg-white rounded w-full p-4;
  left: 50%;
  top: 50%;
  min-height: 300px;
  max-width: 400px;
  transform: translate(-50%, -50%);
}
form input {
  @apply w-full p-2 border-b-2 border-gray-700 outline-none my-4 focus-within:border-red-800 focus-within:bg-gray-100;
}
</style>