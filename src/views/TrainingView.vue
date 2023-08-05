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
import { mdiBallotOutline, mdiAccount, mdiGithub } from "@mdi/js";
import { useTrainingStore } from "@/stores/training";
import { ref } from "vue";

const trainingStore = useTrainingStore();
const levels = ref(0);
const createLevel = () => {
  levels.value++;
  if (trainingStore.videoArray.length == 2) {
    trainingStore.videoArray = [];
  }
  trainingStore.levelInfoArray.push({
    title: "",
    videos:
      trainingStore.videoArray.length == 2 ? [] : trainingStore.videoArray,
  });
  //affectation
  trainingStore.trainingInfo.levels = trainingStore.levelInfoArray;
};

const createVideo = () => {
  trainingStore.videoArray.push({
    urlVideo: "",
  });
};
</script>

<template>
  <LayoutAuthenticated>
    {{ trainingStore.levelInfoArray }}<br/>
    {{ trainingStore.videoArray }}
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Formations"
        main
      >
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
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
          class="mb-2 mr-2"
          color="lightDark"
          label="Créer niveau"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="levels == 7"
          :rounded-full="true"
          @click="createLevel"
        />
        <BaseButton
          class="mb-2"
          color="lightDark"
          label="Créer video"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="levels == 7"
          :rounded-full="true"
          @click="createVideo"
        />
        <!-- input niveau -->
        <div
          v-for="(levelInfo, index) in trainingStore.levelInfoArray"
          :key="levelInfo"
        >
          <FormField class="mt-2">
            <FormControl
              v-model="levelInfo.title"
              :icon="mdiAccount"
              :placeholder="`${'Niveau ' + (index + 1)}`"
            />
          </FormField>
        </div>
        <!-- button video -->
            <div
              v-for="(videoInfo, index) in trainingStore.videoArray"
              :key="videoInfo"
            >
              <FormControl
                v-model="videoInfo.urlVideo"
                :icon="mdiAccount"
                :placeholder="`${'Video ' + (index + 1)}`"
              />
            </div>

        <BaseDivider />

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Submit"
              @click="trainingStore.createTraining"
            />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
        {{ trainingStore.trainingInfo }}
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
