<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormField from "@/components/FormField.vue";
import { reactive } from "vue";

const trainingStore = useTrainingStore();
const customElementsForm = reactive({
  radio: null,
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- component -->
      <section
        class="bg-white text-gray-700 dark:text-white dark:bg-slate-900/50 rounded-lg drop-shadow-lg"
      >
        <!-- {{ customElementsForm.radio }} index choix -->
        <div class="container py-2 mx-auto">
          <!-- component -->
          <!-- This is an example component -->
          <div class="flex">
            <div class="w-full px-10 py-8 mx-auto">
              <div class="mx-auto space-y-6 dark:text-white text-gray-600">
                <div>
                  <p>
                    <span class="font-bold">Quizz</span>:
                    {{ trainingStore.trainingInfo.levels[1].title }}
                  </p>
                </div>
                <div>
                  <p>
                    <span class="font-bold">Formation</span>:
                    {{ trainingStore.trainingInfo.title }}
                  </p>
                </div>

                <div
                  v-for="quiz in trainingStore.trainingInfo.levels[1].quiz
                    .questions"
                  :key="quiz"
                  class="text-base leading-7"
                >
                  <p class="font-medium">
                    {{ quiz.question }}
                  </p>
                  <FormField>
                    <FormCheckRadioGroup
                      v-model="customElementsForm.radio"
                      name="sample-radio"
                      type="radio"
                      :options="quiz.choices"
                    />
                  </FormField>

                  <!-- <p>
                    <a
                      v-for="choise in quiz.choices"
                      :key="choise"
                      target="_blank"
                      href="https://tailwindcomponents.com/awesome"
                      class="text-teal-400 hover:underline"
                      >{{ choise }}</a
                    >
                  </p> -->
                </div>
                <!-- <a
                  target="_blank"
                  href="https://tailwindcomponents.com"
                  class="block w-full px-4 py-2 font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                >
                  Go Back to Tailwind Components
                </a> -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
