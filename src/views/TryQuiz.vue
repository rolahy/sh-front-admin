<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useTrainingStore } from "@/stores/training";
import { computed, onMounted, ref } from "vue";
import IconRounded from "@/components/IconRounded.vue";
import { mdiVideo } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import { useRouter } from "vue-router";

const idVideoRef = ref("");

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainingInfo);

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

const playVIdeo = (video) => {
  const id_video = getYouTubeVideoId(video.urlVideo);
  idVideoRef.value = id_video;
  //   affectation videoInfo state dans store
  trainingStore.videoInfo = video;
};

const router = useRouter();

const tryQuiz = () => {
  router.push("/try-quiz");
};

onMounted(() => {
  trainingStore.videoInfo = trainings.value.levels[0]?.videos[0]; // initialisation videoInfo state dans store
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- component -->
      <section class="bg-white dark:bg-slate-900/50 rounded-lg drop-shadow-lg">
        <div class="container py-2 mx-auto">
          <!-- component -->
          <!-- This is an example component -->
          <div
            class="flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br"
          >
            <div
              class="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl"
            >
              <div class="max-w-md mx-auto space-y-6">
                <img
                  src="https://tailwindcomponents.com/svg/logo-color.svg"
                  class="h-8"
                />

                <p class="text-gray-600">
                  Open source Tailwind UI components and templates to bootstrap
                  your new apps, projects or landing sites!
                </p>

                <div class="text-base leading-7">
                  <p class="font-medium text-gray-700">
                    Looking For Free premium components?
                  </p>

                  <p>
                    <a
                      target="_blank"
                      href="https://tailwindcomponents.com/awesome"
                      class="text-teal-400 hover:underline"
                      >Check out our awesome components →</a
                    >
                  </p>
                </div>

                <div class="text-base leading-7">
                  <p class="font-medium text-gray-700">
                    Looking for premium themes and landing pages?
                  </p>

                  <p>
                    <a
                      target="_blank"
                      href="https://tailwindcomponents.com/promotes"
                      class="text-teal-400 hover:underline"
                      >Check out our premium page →</a
                    >
                  </p>
                </div>

                <div class="text-base leading-7">
                  <p class="font-medium text-gray-700">
                    Looking for Awesome cheatsheet for Tailwind CSS?
                  </p>

                  <p>
                    <a
                      target="_blank"
                      href="https://tailwindcomponents.com/cheatsheet"
                      class="text-teal-400 hover:underline"
                      >Check out our cheatsheet →</a
                    >
                  </p>
                </div>

                <div class="text-base leading-7">
                  <p class="font-medium text-gray-700">
                    Want to dig deeper into Tailwind CSS?
                  </p>
                  <p>
                    <a
                      target="_blank"
                      href="https://tailwindcss.com/docs"
                      class="text-teal-400 hover:underline"
                      >Read the docs →</a
                    >
                  </p>
                </div>

                <a
                  target="_blank"
                  href="https://tailwindcomponents.com"
                  class="block w-full px-4 py-2 font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                >
                  Go Back to Tailwind Components
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionMain>
  </LayoutAuthenticated>
</template>
