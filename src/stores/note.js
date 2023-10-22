import { defineStore } from "pinia";
import axios from "axios";

export const useNoteStore = defineStore("note", {
  state: () => ({
    note: {
      userId: "",
      trainingId: "",
      note: 0,
    },
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
  }),
  actions: {
    postNote() {
      axios
        .post("https://sh-api-v1.vercel.app/notes", this.note, this.config)
        .then((res) => {
          console.log("notes", res);
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
    async getNote(userId, trainingId) {
      await axios
        .get(
          "https://sh-api-v1.vercel.app/notes/" + userId + "/" + trainingId,
          this.config
        )
        .then((res) => {
          this.note.note = res.data.note;
          console.log("notes", res);
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
  },
});
