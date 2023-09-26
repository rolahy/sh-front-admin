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
import { mdiBallotOutline, mdiAccount, mdiArchivePlus } from "@mdi/js";
import { useTrainingStore } from "@/stores/training";
import { ref } from "vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const trainingStore = useTrainingStore();

const rulesTrainingInfo = {
  title: { required, minLength: minLength(5) },
  description: { required, minLength: minLength(5) },
  objective: { required, minLength: minLength(5) },
  levels: { required },
};
const v$ = useVuelidate(rulesTrainingInfo, trainingStore.trainingInfo);

const rulesVideoArray = {
  title: { required, minLength: minLength(5) },
  description: { required, minLength: minLength(5) },
  duration: { required },
  urlVideo: { required },
};
const u$ = useVuelidate(rulesVideoArray, trainingStore.videoArray);

const levels = ref(0);
const levelWithVideo = ref([]);
const indexLevelsInTrainingInfo = ref(null);

trainingStore.levelInfoArray.title = "niveau " + (levels.value + 1);

const createVideoAndLevel = () => {
  trainingStore.isCreateFormation = true;
};

const createQuizForLevel = (index) => {
  indexLevelsInTrainingInfo.value = index;
  console.log("index", index);
  trainingStore.isCreateQuiz = true;
};

const addLevelVideo = async () => {
  const result = await u$.value.$validate();
  if (result) {
    levels.value++;
    trainingStore.isCreateFormation = false;
    const levelInfoCopy = Object.assign({}, trainingStore.levelInfoArray);
    levelWithVideo.value.push(levelInfoCopy);
    trainingStore.levelInfoArray = {
      title: "",
      videos: [],
      quiz: {
        questions: [],
      },
    };
    // afecation niveaux au nivaux d'une formation
    trainingStore.trainingInfo.levels = levelWithVideo.value;
    trainingStore.levelInfoArray.title = "niveau " + (levels.value + 1);
  }
};

async function addVideoToLevel() {
  const result = await u$.value.$validate();
  if (result) {
    const videoInfoCopy = Object.assign({}, trainingStore.videoArray);
    trainingStore.levelInfoArray.videos.push(videoInfoCopy);
    trainingStore.videoArray = {
      title: null,
      description: null,
      duration: null,
      urlVideo: null,
    };
  }
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
  const levelsInTrainingInfo =
    trainingStore.trainingInfo.levels[indexLevelsInTrainingInfo.value];
  console.log("itoe", levelsInTrainingInfo);
  levelsInTrainingInfo.quiz.questions = trainingStore.quizInfo.questions;
  trainingStore.isCreateQuiz = false;
  //initialisation trainingStore.quizInfo.questions
  trainingStore.quizInfo.questions = [];
};

const handleCreateTraining = async () => {
  const result = await v$.value.$validate();
  if (result) {
    trainingStore.createTraining;
  }
};
</script>

<template>
  <LayoutAuthenticated>
    {{ levels }}
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
    <!-- <div>
      trainingStore.trainingInfo.levels {{ trainingStore.trainingInfo.levels }}
    </div> -->
    <CardBoxModal
      v-model="trainingStore.isCreateFormation"
      title="Créer niveau et video"
      @cancel="closeModal"
    >
      <FormField label="Niveau" class="my-3">
        {{ trainingStore.levelInfoArray.title }}
        <div class="font-bold">Informations video:</div>
        <FormControl
          v-model="trainingStore.videoArray.title"
          :icon="mdiAccount"
          placeholder="Titre"
        />
        <div
          v-for="error of u$.title.$errors"
          :key="error.$uid"
          class="input-errors"
        >
          <div class="text-red-600">{{ error.$message }}</div>
        </div>
        <FormControl
          v-model="trainingStore.videoArray.description"
          :icon="mdiAccount"
          placeholder="Description"
        />
        <div
          v-for="error of u$.description.$errors"
          :key="error.$uid"
          class="input-errors"
        >
          <div class="text-red-600">{{ error.$message }}</div>
        </div>
        <FormControl
          v-model="trainingStore.videoArray.duration"
          :icon="mdiAccount"
          placeholder="Durée"
        />
        <div
          v-for="error of u$.duration.$errors"
          :key="error.$uid"
          class="input-errors"
        >
          <div class="text-red-600">{{ error.$message }}</div>
        </div>
        <FormControl
          v-model="trainingStore.videoArray.urlVideo"
          :icon="mdiAccount"
          placeholder="Url vidéo"
        />
        <div
          v-for="error of u$.urlVideo.$errors"
          :key="error.$uid"
          class="input-errors"
        >
          <div class="text-red-600">{{ error.$message }}</div>
        </div>
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
          v-if="trainingStore.questionInfo.choices.length > 0"
          class="font-bold"
        >
          Listes des choix réponse:
        </div>
        <div
          v-for="(choice, index) in trainingStore.questionInfo.choices"
          :key="index"
        >
          <p>
            <span class="font-bold">{{ choice }}</span> index
            <span class="font-bold">{{ index }}</span>
          </p>
        </div>
        <div class="flex justify-between">
          <FormControl
            v-model="trainingStore.choiceInfo"
            class="w-full mr-2"
            :icon="mdiAccount"
            placeholder="Choix de la réponse"
          />
          <BaseButton
            :icon="mdiArchivePlus"
            color="success"
            :small="buttonsSmall"
            @click="createChoiceResponse"
          />
        </div>
        <FormControl
          v-model="trainingStore.questionInfo.correctChoice"
          :icon="mdiAccount"
          placeholder="Index de la réponse correcte"
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
          <div
            v-for="error of v$.title.$errors"
            :key="error.$uid"
            class="input-errors"
          >
            <div class="text-red-600">{{ error.$message }}</div>
          </div>
          <FormControl
            v-model="trainingStore.trainingInfo.objective"
            placeholder="Objectif"
          />
          <div
            v-for="error of v$.objective.$errors"
            :key="error.$uid"
            class="input-errors"
          >
            <div class="text-red-600">{{ error.$message }}</div>
          </div>
        </FormField>
        <FormField>
          <FormControl
            v-model="trainingStore.trainingInfo.description"
            type="textarea"
            placeholder="Description"
          />
          <div
            v-for="error of v$.description.$errors"
            :key="error.$uid"
            class="input-errors"
          >
            <div class="text-red-600">{{ error.$message }}</div>
          </div>
        </FormField>
        <div class="flex">
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
          <div
            v-for="error of v$.levels.$errors"
            :key="error.$uid"
            class="input-errors"
          >
            <div class="text-red-600">{{ error.$message }}</div>
          </div>
        </div>
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
              @click="handleCreateTraining"
            />
          </BaseButtons>
        </template>
        <!-- {{ trainingStore.trainingInfo }} -->
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
