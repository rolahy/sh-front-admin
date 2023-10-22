<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useTrainingStore } from "@/stores/training";

const trainingStore = useTrainingStore();
onMounted(() => {
  if (localStorage.getItem("idTraining") != null) {
    trainingStore.trainingInfo = localStorage.getItem("idTraining");
    console.log(
      "trainingStore.trainingInfo locale storage",
      trainingStore.trainingInfo
    );
  }
});
</script>

<template>
  <RouterView />
</template>
