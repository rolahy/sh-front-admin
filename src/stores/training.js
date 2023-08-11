import { defineStore } from "pinia";
import axios from "axios";

export const useTrainingStore = defineStore("training", {
  state: () => ({
    trainings: [],
    quizInfo: {
      questions: [],
    },
    choiceInfo: "",
    questionInfo: {
      question: "",
      choices: [],
      correctChoice: null,
    },
    levelInfoArray: {
      title: "",
      videos: [],
      quiz: {
        questions: [],
      },
    },
    videoArray: {
      title: "",
      description: "",
      duration: "",
      urlVideo: "",
    },
    videoInfo: {
      title: "",
      description: "",
      duration: "",
      urlVideo: "",
    },
    trainingInfo: {
      title: "",
      description: "",
      objective: "",
      levels: [],
    },
    isCreateFormation: false,
    isCreateQuiz: false,
    isLoading: false,
    url: "https://sh-api-v1.up.railway.app/Trainings",
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
  }),
  actions: {
    getAllTraining() {
      this.isLoading = true;
      axios
        .get(this.url, this.config)
        .then((res) => {
          this.trainings = res.data;
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateTraining() {
      axios
        .put(this.url + "/" + this.roleInfo._id, this.roleInfo, this.config)
        .then((res) => {
          this.isModalEdit = false;
          this.isEditingRole = false;
          this.roleInfo = [];
          console.log("updated", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    createTraining() {
      axios
        .post(this.url, this.trainingInfo, this.config)
        .then((res) => {
          this.isModalEdit = false;
          this.getAllTraining();
          console.log("created", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
