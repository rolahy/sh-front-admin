<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import { mdiBallotOutline, mdiAccount } from "@mdi/js";
import { useTrainingStore } from "@/stores/training";
import { ref } from "vue";
import CardBoxModal from "@/components/CardBoxModal.vue";

const trainingStore = useTrainingStore();
const levels = ref(0);
const levelWithVideo = ref([]);
const indexLevelsInTrainingInfo = ref(null);

const createVideoAndLevel = () => {
  trainingStore.isCreateFormation = true;
};

const createQuizForLevel = (index) => {
  indexLevelsInTrainingInfo.value = index;
  console.log("index", index);
  trainingStore.isCreateQuiz = true;
};

const addLevelVideo = () => {
  levels.value++;
  trainingStore.isCreateFormation = false;
  const levelInfoCopy = Object.assign({}, trainingStore.levelInfoArray);
  levelWithVideo.value.push(levelInfoCopy);
  trainingStore.levelInfoArray = {
    title: "",
    videos: [],
  };
  // afecation niveaux au nivaux d'une formation
  trainingStore.trainingInfo.levels = levelWithVideo.value;
};

function addVideoToLevel() {
  const videoInfoCopy = Object.assign({}, trainingStore.videoArray);
  trainingStore.levelInfoArray.videos.push(videoInfoCopy);
  trainingStore.videoArray = {
    title: "",
    description: "",
    duration: "",
    urlVideo: "",
  };
}

const closeModal = () => {
  //
};
const createChoiceResponse = () => {
  const choiceCopy = Object.assign(trainingStore.choiceInfo);
  trainingStore.questionInfo.choices.push(choiceCopy);
  trainingStore.choiceInfo = "";
  console.log("Creation choix de la réponse");
};

const createQuestion = () => {
  trainingStore.quizInfo.questions.push(trainingStore.questionInfo);
  // initialisation input quiz
  trainingStore.questionInfo = {
    question: "",
    choices: [],
    correctChoice: null,
  };
};

const addQuestionsToQuiz = () => {
  const levelsInTrainingInfo = trainingStore.trainingInfo.levels[indexLevelsInTrainingInfo.value];
  levelsInTrainingInfo.quiz = trainingStore.quizInfo.questions;
  trainingStore.isCreateQuiz = false;
  //initialisation trainingStore.quizInfo.questions
  trainingStore.quizInfo.questions = [];
};
</script>

<template>
  <LayoutAuthenticated>
    <!-- tyyy{{ aaa }}<br/>
    {{ trainingStore.levelInfoArray }}<br/>
    {{ trainingStore.videoArray }} -->
    <!-- trainingStore.questionInfo no pushena ao anaty quizInfo.questions -->
    <!-- question ray{{ trainingStore.questionInfo }}
    <div>
      tableau questions quizInfo questions
      {{ trainingStore.quizInfo.questions }}
    </div>
    <div>
      trainingStore.trainingInfo.levels {{ trainingStore.trainingInfo.levels }}
    </div> -->
    <!-- Niveau et video moadal -->
    <CardBoxModal
      v-model="trainingStore.isCreateFormation"
      :title="titleModal"
      @cancel="closeModal"
    >
      <FormField label="Créer niveau et video" class="my-3">
        <FormField class="mt-2">
          <FormControl
            v-model="trainingStore.levelInfoArray.title"
            :icon="mdiAccount"
            placeholder="Niveau"
          />
        </FormField>
        <div class="font-bold">Informations video:</div>
        <FormControl
          v-model="trainingStore.videoArray.title"
          :icon="mdiAccount"
          placeholder="Titre"
        />
        <FormControl
          v-model="trainingStore.videoArray.description"
          :icon="mdiAccount"
          placeholder="Description"
        />
        <FormControl
          v-model="trainingStore.videoArray.duration"
          :icon="mdiAccount"
          placeholder="Durée"
        />
        <FormControl
          v-model="trainingStore.videoArray.urlVideo"
          :icon="mdiAccount"
          placeholder="Url vidéo"
        />
      </FormField>
      <BaseButtons>
        <BaseButton
          label="Enregistrer"
          color="info"
          :rounded-full="true"
          :small="buttonsSmall"
          :outline="true"
          @click="addLevelVideo"
        />
        <BaseButton
          class="mb-2"
          color="lightDark"
          label="Créer video"
          :small="buttonsSmall"
          :rounded-full="true"
          @click="addVideoToLevel"
        />
        <BaseButton
          v-if="hasCancel"
          label="Cancel"
          color="info"
          outline
          @click="cancel"
        />
      </BaseButtons>
    </CardBoxModal>
    <!-- Quiz moadal -->
    <CardBoxModal
      v-model="trainingStore.isCreateQuiz"
      :title="titleModal"
      @cancel="closeModal"
    >
      <FormField class="my-3">
        <div class="font-bold">Informations Quiz:</div>
        <FormControl
          v-model="trainingStore.questionInfo.question"
          :icon="mdiAccount"
          placeholder="Question"
        />
        <div
          v-for="(choice, index) in trainingStore.questionInfo.choices"
          :key="index"
        >
          <p>{{ choice }} Index de la réponse est {{ index }}</p>
        </div>
        <FormControl
          v-model="trainingStore.choiceInfo"
          :icon="mdiAccount"
          placeholder="Choix de la réponse"
        />
        <BaseButton
          label="Créer choix"
          color="success"
          :rounded-full="true"
          :small="buttonsSmall"
          :outline="true"
          @click="createChoiceResponse"
        />
        <FormControl
          v-model="trainingStore.questionInfo.correctChoice"
          :icon="mdiAccount"
          placeholder="Index de la réponse"
        />
      </FormField>
      <BaseButtons>
        <BaseButton
          label="Enregistrer"
          color="info"
          :rounded-full="true"
          :small="buttonsSmall"
          :outline="true"
          @click="addQuestionsToQuiz"
        />
        <BaseButton
          class="mb-2"
          color="lightDark"
          label="Créer quéstion"
          :small="buttonsSmall"
          :rounded-full="true"
          @click="createQuestion"
        />
        <BaseButton
          v-if="hasCancel"
          label="Cancel"
          color="info"
          outline
          @click="cancel"
        />
      </BaseButtons>
    </CardBoxModal>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Formations"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField>
          <FormControl
            v-model="trainingStore.trainingInfo.title"
            :icon="mdiAccount"
            placeholder="Titre"
          />
          <FormControl
            v-model="trainingStore.trainingInfo.objective"
            placeholder="Objectif"
          />
        </FormField>
        <FormField>
          <FormControl
            v-model="trainingStore.trainingInfo.description"
            type="textarea"
            placeholder="Description"
          />
        </FormField>
        <BaseButton
          class="mb-2"
          color="lightDark"
          label="Créer niveau"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="levels == 7"
          :rounded-full="true"
          @click="createVideoAndLevel"
        />
        <!-- Affichage niveau et video -->
        <div v-if="levelWithVideo.length > 0">
          <div class="font-bold">Niveaux avec videos:</div>
          <div>
            <div
              v-for="(niveauVideo, index) in trainingStore.trainingInfo.levels"
              :key="index"
              class="py-1"
            >
              <div
                class="flex justify-between items-center bg-gray-100 dark:bg-slate-800 pl-3.5 rounded-2xl"
              >
                <div>
                  {{ niveauVideo.title }} avec
                  {{ niveauVideo.videos.length }} vidéos
                </div>
                <div>
                  <BaseButton
                    label="Créer quiz"
                    color="success"
                    :rounded-full="true"
                    :small="buttonsSmall"
                    :outline="true"
                    @click="createQuizForLevel(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <BaseDivider />

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Enregister"
              @click="trainingStore.createTraining"
            />
          </BaseButtons>
        </template>
        <!-- {{ trainingStore.trainingInfo }} -->
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
