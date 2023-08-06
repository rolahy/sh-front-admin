<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import { computed, onMounted, ref } from "vue";

const idVideoRef = ref("");

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainingInfo);

const getYouTubeVideoId = (url) => {
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
};

idVideoRef.value = getYouTubeVideoId(
  trainings.value.levels[0]?.videos[0].urlVideo
);

const playVIdeo = (video) => {
  const id_video = getYouTubeVideoId(video.urlVideo);
  idVideoRef.value = id_video;
};

onMounted(() => {
  trainingStore.getAllTraining();
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- component -->
      <section class="bg-white rounded-lg drop-shadow-lg">
        <div class="container px-6 py-2 mx-auto">
          <div
            class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-2 lg:grid-cols-3"
          >
            <div class="drop-shadow-lg p-4 flex-1">
              <!-- Remplacez le code ci-dessous par l'élément vidéo pour vos vidéos -->
              <iframe
                width="100%"
                class="h-96"
                :src="`https://www.youtube.com/embed/${idVideoRef}`"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <div class="p-4 flex-1">
              <div
                v-for="level in trainings.levels"
                :key="level._id"
                class="text-lg mb-2"
              >
                <h2 class="text-lg font-bold mb-2 text-gray-800">
                  {{ level.title }}
                </h2>
                <ul>
                  <li
                    v-for="video in level.videos"
                    :key="video._id"
                    class="w-full ml-4 text-gray-600 border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50 cursor-pointer"
                    @click="playVIdeo(video)"
                  >
                    {{ video.title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
