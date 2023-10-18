import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("note", {
  state: () => ({
    note: {
      userId: "",
      trainingId: "",
      note: 0,
    },
  }),
  actions: {
    postNote() {
      axios
        .post("https://sh-api-v1.vercel.app/notes", this.note)
        .then((res) => {
          console.log("notes", res);
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
  },
});
