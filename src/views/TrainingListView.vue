<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const trainingStore = useTrainingStore();
const router = useRouter();

const followTraining = (training) => {
  trainingStore.trainingInfo = training;
  localStorage.setItem("training", JSON.stringify(training));
  router.push("/follow-training");
};

const isPro = ref("");

const typeTrainings = reactive([
  {
    isPro: "true",
    label: "Pro",
  },
  {
    isPro: "false",
    label: "Gratuit",
  },
]);

watch(isPro, () => {
  trainingStore.filterTrainingByisPro(isPro.value);
});

onMounted(() => {
  trainingStore.getAllTraining();
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- component -->
      <section class="bg-white rounded-lg drop-shadow-lg">
        <div
          v-if="trainingStore.isLoading"
          class="container px-6 py-2 mx-auto animate-pulse"
        >
          <div
            class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3"
          >
            <div v-for="a in 6" :key="a" class="w-full">
              <div
                class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-300"
              ></div>
              <p
                class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-300"
              ></p>
            </div>
          </div>
        </div>
        <div v-else class="container px-6 py-2 mx-auto">
          <div>
            <select v-model="isPro" class="dark:text-gray-700">
              <option
                v-for="item in typeTrainings"
                :key="item"
                :value="item.isPro"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <div
            class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 mb-12"
          >
            <div
              v-for="training in trainingStore.trainings"
              :key="training._id"
              class="w-full dark:bg-white bg-white drop-shadow-lg cursor-pointer"
              @click="followTraining(training)"
            >
              <a>
                <img
                  class="h-52 rounded-t-lg object-cover"
                  src="https://img.freepik.com/vecteurs-premium/presentation-femme-pointant-flip-chart_253349-4092.jpg"
                  alt="formation image"
                />
              </a>
              <div class="mt-2 px-5 pb-5">
                <a>
                  <h5
                    class="text-xl font-semibold tracking-tight text-slate-900 text-center"
                  >
                    {{ training.title }}
                  </h5>
                </a>
                <!-- <div class="mt-2.5 mb-5 flex items-center">
                  <span
                    class="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold"
                    >5.0</span
                  >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                </div> -->
                <!-- <div class="flex items-center justify-between">
                  <p>
                    <span class="text-3xl font-bold text-slate-900">$249</span>
                    <span class="text-sm text-slate-900 line-through"
                      >$299</span
                    >
                  </p>
                  <a
                    class="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart</a
                  >
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
