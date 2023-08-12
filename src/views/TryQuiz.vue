<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import { ref } from "vue";

const trainingStore = useTrainingStore();
const responseQuiz = ref([]);
const sendResponseQuiz = () => {
  alert(responseQuiz.value);
};
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
              <div class="mx-auto space-y-6 dark:text-gray-300 text-gray-600">
                <div>
                  <p>
                    <span class="font-bold text-lg">Quizz</span>:
                    {{ trainingStore.levelInfoArray.title }}
                  </p>
                </div>
                <div>
                  <p>
                    <span class="font-bold text-lg">Formation</span>:
                    {{ trainingStore.trainingInfo.title }}
                  </p>
                </div>
                <!-- Response {{ responseQuiz }} -->
                <div
                  v-for="(question, index) in trainingStore.levelInfoArray.quiz
                    ?.questions"
                  :key="question._id"
                >
                  <h3 class="font-bold text-lg">{{ question.question }}</h3>
                  <div class="">
                    <div
                      v-for="(choice, choiceIndex) in question.choices"
                      :key="choiceIndex"
                    >
                      <input
                        :id="`choice-${index}-${choiceIndex}`"
                        v-model="responseQuiz[index]"
                        class="cursor-pointer"
                        type="radio"
                        :name="`question-${index}`"
                        :value="choiceIndex"
                      />
                      <label
                        class="ml-3"
                        :for="`choice-${index}-${choiceIndex}`"
                        >{{ choice }}</label
                      >
                    </div>
                  </div>
                </div>
                <button
                  class="block w-1/4 px-4 py-2 font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                  @click="sendResponseQuiz"
                >
                  Envoyer la réponse
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
