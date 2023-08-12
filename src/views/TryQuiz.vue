<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";

const trainingStore = useTrainingStore();
const responseQuiz = ref([]);
const score = ref(null);
const sendResponseQuiz = () => {
  let correctResponses = 0;

  // Itération sur les questions
  for (
    let i = 0;
    i < trainingStore.levelInfoArray.quiz?.questions.length;
    i++
  ) {
    const question = trainingStore.levelInfoArray.quiz?.questions[i];
    const selectedResponse = responseQuiz.value[i];

    if (
      selectedResponse !== null &&
      selectedResponse === question.correctChoice
    ) {
      correctResponses++;
    }
  }

  // Calcul du score en pourcentage
  const totalQuestions = trainingStore.levelInfoArray.quiz?.questions.length;
  score.value = (correctResponses / totalQuestions) * 100 + " %";
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
                <div v-if="score">
                  <span class="font-bold text-lg">Scrore</span>
                  : {{ score }}
                </div>
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
                <BaseButton
                  class="mt-2"
                  label="Envoyer la réponse"
                  color="info"
                  :rounded-full="true"
                  :small="buttonsSmall"
                  :outline="true"
                  @click="sendResponseQuiz"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
