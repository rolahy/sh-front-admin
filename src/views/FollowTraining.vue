<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import { computed, onMounted, ref } from "vue";
import IconRounded from "@/components/IconRounded.vue";
import { mdiPlay } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import { useRouter } from "vue-router";

const idVideoRef = ref("");

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainingInfo);
const isVideoPlaying = ref(false);
// let activeLevelIndex = ref(0);

const getYouTubeVideoId = (url) => {
  if (trainings.value.levels[0]?.videos[0].urlVideo) {
    // Expression régulière pour extraire l'ID de la vidéo à partir de l'URL YouTube
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);

    if (match && match[1]) {
      return match[1];
    } else {
      // Gérer le cas où l'URL n'est pas valide
      console.error("URL YouTube invalide !");
      return null;
    }
  }
};

idVideoRef.value = getYouTubeVideoId(
  trainings.value.levels[0]?.videos[0].urlVideo
);

const clickableIndex = ref(0);

const firstLevelClickableIndex = ref(0);

const playVideo = (video, indexVideo, indexLevel) => {
  const id_video = getYouTubeVideoId(video.urlVideo);
  idVideoRef.value = id_video;
  isVideoPlaying.value = true;
  //   affectation videoInfo state dans store
  trainingStore.videoInfo = video;
  console.log("indexLevel", indexLevel);
  //
  // if (index < trainings.value.levels[levelIndex].videos.length - 1) {
  clickableIndex.value = indexVideo + 1;
  firstLevelClickableIndex.value++;
  // if (
  //   trainings.value.levels[indexLevel].videos.length == clickableIndex.value && userStore.userInfo.isQuizIsFinish && userStore.userInfo.scoreTraining > 6
  // ) {
  //   trainingStore.currentLevelIndex++;
  // }
};

const router = useRouter();

const tryQuiz = (level) => {
  trainingStore.levelInfoArray = level;
  localStorage.setItem("level", JSON.stringify(level));
  router.push("/try-quiz");
};

onMounted(() => {
  trainingStore.trainingInfo = JSON.parse(localStorage.getItem("training"));
  trainingStore.videoInfo = trainings.value.levels[0]?.videos[0]; // initialisation videoInfo state dans store.
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- component -->
      <section class="bg-white dark:bg-slate-900/50 rounded-lg drop-shadow-lg">
        <div class="container py-2 mx-auto">
          <div
            class="flex justify-center pt-3 text-gray-500 dark:text-white text-xl font-bold"
          >
            {{ trainings.title }}
          </div>
          <div
            class="grid grid-cols-1 gap-8 px-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-2 lg:grid-cols-3"
          >
            <div class="drop-shadow-lg p-4 flex-1">
              <iframe
                width="100%"
                class="h-56 md:h-96"
                :src="`https://www.youtube.com/embed/${idVideoRef}`"
                frameborder="0"
                allowfullscreen
              ></iframe>
              <!-- <video
                id="ember4348_html5_api"
                class="vjs-tech"
                tabindex="-1"
                role="application"
                preload="metadata"
                poster="https://media.licdn.com/dms/image/D4E05AQFvTRPCD0cGhw/videocover-high/0/1691296279125?e=1692172800&amp;v=beta&amp;t=OzmHwJrd7cK93zyjbn-MW5keKvcH6VEtKuvEw6DdsEg"
                src="https://dms.licdn.com/playlist/vid/D4E05AQFvTRPCD0cGhw/feedshare-ambry-analyzed_servable_progressive_video/0/1691296278558?e=1692172800&v=beta&t=krUSpUULQmhNi8E4jzlCu3taCUAeyMbQzP1nn1tCgLI"
                autoplay="autoplay"
              ></video> -->
              <div class="text-gray-500 py-4 dark:text-white">
                <div>
                  <span class="font-bold">Titre</span> :
                  {{ trainingStore.videoInfo.title }}
                </div>
                <div>
                  <span class="font-bold">Déscription</span> :
                  {{ trainingStore.videoInfo.description }}
                </div>
              </div>
            </div>
            <!-- <BaseDivider /> -->
            <div class="p-4 flex-1">
              <div
                v-for="(level, indexLevel) in trainings.levels"
                :key="level._id"
                class="text-lg mb-2"
              >
                <h2 class="font-bold mb-2 text-gray-500 dark:text-white">
                  {{ level.title }}
                </h2>
                <ul>
                  <li
                    v-for="(video, indexVideo) in level.videos"
                    :key="video._id"
                    :class="[
                      trainingStore.videoInfo.title == video.title
                        ? 'bg-slate-600 rounded-md text-white'
                        : '',
                      indexLevel > trainingStore.currentLevelIndex
                        ? 'non-cliquable'
                        : '',
                    ]"
                    class="w-full ml-2 dark:text-gray-100 border-b-2 border-neutral-300 border-opacity-100 py-2 dark:border-opacity-50 cursor-pointer"
                  >
                    <div class="flex w-full justify-between items-center">
                      <div class="flex items-center">
                        <IconRounded
                          :icon="mdiPlay"
                          :class="{
                            'non-cliquable':
                              indexVideo > firstLevelClickableIndex,
                          }"
                          @click="playVideo(video, indexVideo, indexLevel)"
                        />
                        {{ video.title }}
                      </div>
                      <div>
                        {{ video.duration }}
                      </div>
                    </div>
                  </li>
                </ul>
                <BaseButton
                  v-if="
                    clickableIndex ==
                      trainings.levels[indexLevel].videos.length &&
                    indexLevel == trainingStore.currentLevelIndex
                  "
                  class="mt-2"
                  label="Quiz"
                  color="info"
                  :rounded-full="true"
                  :small="buttonsSmall"
                  :outline="true"
                  @click="tryQuiz(level)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style>
.non-cliquable {
  pointer-events: none;
  opacity: 0.5;
}
</style>
