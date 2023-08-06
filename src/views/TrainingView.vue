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

const createVideoAndLevel = () => {
  trainingStore.isCreateFormation = true;
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
</script>

<template>
  <LayoutAuthenticated>
    <!-- tyyy{{ aaa }}<br/>
    {{ trainingStore.levelInfoArray }}<br/>
    {{ trainingStore.videoArray }} -->
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
              v-for="(niveauVideo, index) in levelWithVideo"
              :key="index"
              class="py-1"
            >
              <div class="flex justify-between bg-slate-800 pl-3.5 rounded-md">
                <div>
                  {{ niveauVideo.title }} avec
                  {{ niveauVideo.videos.length }} vidéos
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
