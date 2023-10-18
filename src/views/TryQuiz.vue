<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import { computed, ref, onUnmounted, watch, onMounted } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import { useNoteStore } from "@/stores/note";
import { useAuthStore } from "@/stores/auth";

const trainingStore = useTrainingStore();
const userStore = useUserStore();
const noteStore = useNoteStore();
const authStore = useAuthStore();
const router = useRouter();
const responseQuiz = ref([]);
const score = ref(null);
const showModalScore = ref(false);
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
  score.value = (correctResponses / totalQuestions) * 10;
  userStore.userInfo.scoreTraining = score.value;
  userStore.userInfo.isQuizIsFinish = true;
  if (score.value >= 7) {
    trainingStore.currentLevelIndex += 1;
  }
  noteStore.note = score.value;
  noteStore.postNote();
  showModalScore.value = true;
};

let totalSeconds = ref(
  trainingStore.levelInfoArray.quiz?.questions.length * 60
);
const countdown = ref(null);
const isQuizStart = ref(false);
const minutes = ref(0);
const seconds = ref(0);

const updateCountdown = () => {
  if (totalSeconds.value > 0) {
    minutes.value = Math.floor(totalSeconds.value / 60);
    seconds.value = totalSeconds.value % 60;
    totalSeconds.value--;

    if (totalSeconds.value == 0) {
      sendResponseQuiz();
      console.log("Compte à rebours terminé !");
    }
  }
};

const formattedTime = computed(
  () => `${minutes.value}:${seconds.value < 10 ? "0" : ""}${seconds.value}`
);

const startCountdown = () => {
  isQuizStart.value = true;
  countdown.value = setInterval(updateCountdown, 1000);
};

const clickButtonCLose = () => {
  router.go(-1);
};

watch(showModalScore, () => {
  if (!showModalScore.value) {
    router.go(-1);
  }
});

onMounted(() => {
  noteStore.note.userId = authStore.userConnected._id;
  noteStore.note.trainingId = trainingStore.trainingInfo._id;
  console.log("mounted 22", noteStore.note);
});

onUnmounted(() => {
  clearInterval(countdown.value);
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- component -->
      <section
        class="bg-white text-gray-700 dark:text-white dark:bg-slate-900/50 rounded-lg drop-shadow-lg"
      >
        <CardBoxModal v-model="showModalScore" title="Note obtenu">
          <div class="text-center">Vous avez obtenu {{ score + "/10" }}</div>
          <BaseButtons>
            <BaseButton
              label="Fermer"
              color="info"
              :rounded-full="true"
              :small="buttonsSmall"
              :outline="true"
              @click="clickButtonCLose"
            />
          </BaseButtons>
        </CardBoxModal>
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
                  <span class="font-bold text-lg">Score</span>
                  : {{ score }}
                </div>
                <div v-if="isQuizStart">
                  <div
                    v-for="(question, index) in trainingStore.levelInfoArray
                      .quiz?.questions"
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
                </div>
                <div v-if="isQuizStart">
                  <BaseButton
                    class="mt-2"
                    label="Envoyer la réponse"
                    color="info"
                    :rounded-full="true"
                    :small="buttonsSmall"
                    :outline="true"
                    @click="sendResponseQuiz"
                  />
                  {{ formattedTime }}
                </div>
                <BaseButton
                  v-if="!isQuizStart"
                  class="mt-2"
                  label="Commencer le Quiz"
                  color="info"
                  :rounded-full="true"
                  :small="buttonsSmall"
                  :outline="true"
                  @click="startCountdown"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
